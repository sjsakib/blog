---
path: /blog/git-hooks-with-python
type: post

title: Git Hook with Python
subtitle: Creating Git hooks with python to automate stuffs.
date: 2017-10-15
tags: [git, git-hooks, python]
---

Github pages are awesome, I loved them the instance I got to know about them. You put some `.md` files in your project, go to project settings, turn on github pages and voila! You have a shiny website.

So when I started the [psbook](https://github.com/sjsakib/psbook/) project, to store my solutions for the book সমস্যা ও সমাধান বই -১, after pushing a few commits I turned on this feature. But then after solving every problem modifying a readme file and updating index, it all seemed waste of time. Specially for a lazy person like me.

Then yesterday I thought, what if I could just put my notes in comments and let github build the pages? I searched for some kind of [jekyll](https://jekyllrb.com/) (which github uses to build the sites) plugins to for that. Failing I got to know about git hooks.

Git client side hooks are simple scripts that do things when events (like commit, push) happen in a repo. They can be used to accomplish a wide range of tasks like deploying, testing and what not? What I'm trying to accomplish here is pretty simple. So why don't I write a hook of mine?

Git hook scripts are located in `.git/hooks` folder of a repo. Git creates a couple of scripts by default for different events. What I'm trying to accomplish is, whenever I commit a change, the script should collect comments from the changed files and build `.md` files out of them. So it have to be a `pre-commit` hook. I'll put my code in a file named `pre-commit` in the `.git/hooks` directory and git will execute it every time I commit. Note that hooks can't have extensions. Even though I'll write my script in python, it have to be named exactly `pre-commit`, no `.py` extension.

I'll use the `check_output` function from the python package `subprocess` to get info about the repository. Here's the script I wrote.

```python
#!/usr/bin/python3
import os
import datetime
from subprocess import check_output

# for the first time we'd like to build docs for all the files,
# not just the changed files, this line is for that
# changed = check_output(['git', 'ls-files'])

changed = check_output(['git', 'diff', '--cached', '--name-only'])

# check_output return bytes, converting to str
changed = changed.decode('utf-8').split('\n')


def get_target(file):
    """returns target to save doc to for a file and also the file extension"""
    base, ext = os.path.splitext(file)

    # removing the -v1, -v2 postfix of our file cause we want to save
    # docs for all the different versions of a solution in a single file
    base = base.split('-')[0] 
    base = base.lower().replace(' ', '-')  # slugifying path
    file = base + '.md'
    return os.path.join('docs', file), ext


def write_md(code, data, ext):
    """receives code, extracted data and extension, return the
    content to write and the problem name for the link in index"""
    
    txt = ''
    if 'Approach' in data and data['Approach']:
        txt += '### '+data['Approach'].title()+'\n\n'
    
    if 'des' in data:
        txt += data['des'] + '\n\n'
    
    txt += '\n---|---\n'  # creating table with other data found in comment
    for k, v in data.items():
        if k not in ['Approach', 'Problem', 'des', 'Author']:
            txt += (k + ' | ' + v + '\n')
    
    tm = datetime.datetime.now().strftime('%d %b %Y %H:%M')
    txt += 'Commit Time | ' + tm + '\n\n'

    if ext != '.md':
        txt += '```' + ext[1:] + '\n'
        txt += code + '\n'
        txt += '```\n'
    else:
        txt += code

    return data['Problem'], txt


def process_cpp(data, file_name, ext):
    """processes cpp files and return code code and extracted data"""
    lines = data.split('\n')
    i = 1
    data = {}
    data['des'] = ''
    while lines[i].startswith(' *'):
        comment = lines[i][3:]
        if ':' in comment:
            comment = comment.split(':')
            data[comment[0].strip()] = comment[1].strip()
        else:
            data['des'] += comment
        i += 1

    # if no comments are found assume the filename to be problem name
    if not len(data):
        data['Problem'] = os.path.splitext(file_name)[0]

    code = '\n'.join(lines[i+1:])

    return write_md(code, data, ext)


def process_py(data, file_name, ext):
    """for processing py files, same as process_cpp"""
    parts = data.split('"""')
    try:
        comments = parts[1].split('\n')
    except IndexError:
        return write_md(data, {'Problem': os.path.splitext(file_name)[0]}, ext)

    code = '"""'.join(parts[2:])

    data = {}
    data['des'] = ''

    for line in comments:
        if ':' in line:
            line = line.split(':')
            data[line[0].strip()] = line[1].strip()
        else:
            data['des'] += line + '\n'

    return write_md(code, data, ext)


def process_data(data, file_name, ext):
    """process file contents according to extension, only supports .cpp, .py for now"""
    if ext == '.py':
        return process_py(data, file_name, ext)
    elif ext == '.cpp':
        return process_cpp(data, file_name, ext)
    else:
        return write_md(data, {'Problem': os.path.splitext(file_name)[0]}, ext)


cnt = 0
for file in changed:
    try:
        if not os.path.exists(file) or file.startswith('docs'):
            continue

        with open(file, 'r') as f:
            data = f.read()

        target, ext = get_target(file)
        tar_path, tar_file = os.path.split(target)
        name, data = process_data(data, tar_file, ext)

        if not os.path.exists(tar_path):
            os.makedirs(tar_path)

        if os.path.exists(target):
            with open(target, 'a') as f:
                f.write(data)
        else:
            with open(os.path.join(tar_path, 'index.md'), 'a+') as f:
                to_add = "* [{}]({})\n".format(name, tar_file)
                f.write(to_add)
            with open(target, 'w') as f:
                f.write('# '+name+'\n\n')
                f.write(data)
        cnt += 1
    except Exception as e:
        print("While processing -", file)
        raise e

print("Building docs successful...")
print("Number of files modified - ", cnt)

# now adding all the created files
print(check_output(['git', 'add', '*']))

```

That's that. Now I'll add comments in code files like this for C++
```cpp
/**
 * Problem: Problem Name
 * Approach: Solving Approach
 * Some info: value
 * Some notes or hints about solving the problem. Supports markdown.
**/
```

For python
```python
"""
Problem: Problem Name
Approach: Solving Approach
Some info: value
Some notes or hints about solving the problem. Supports markdown.
"""
```

It works pretty fine for me. You can see the site [here.](https://sjsakib.github.io/psbook/)

But there are some problems with the script. Firstly I can't use `:` character in the notes. It'll mess things up. I suppose I can live with that :neutral_face:

Secondly when I modify a file in commit, it will not remove the previous doc, but will only append the new one. I'll call this a feature :wink: and ignore.

You can use it if you want. Should work out of the box on linux (don't know about windows) unless you have java files. In that case, java comments are same as C++ as far as I remember. Just add it in the `process_data` function.

Thanks for reading. Any kind of correction, suggestion, advice will be appreciated.
