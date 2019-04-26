const axios = require('axios');
const fs = require('fs');
const path = require('path');

const handle = 'sjsakib';
const rootPath = path.join('.', 'posts', 'projects');

const ignored = [];

async function getRepos(page) {
  const res = await axios.get(
    `https://api.github.com/users/${handle}/repos?page=${page}`
  );
  if (res.data.length) {
    return res.data
      .filter(r => !r.fork)
      .map(r => ({
        name: r.name,
        date: r.created_at,
        description: r.description,
        url: r.html_url,
        homepage: r.homepage,
      }))
      .concat(await getRepos(page + 1));
  } else {
    return [];
  }
}

getRepos(1).then(repos => {
  console.log(repos);
  repos.forEach(({ name, date, url, description, homepage }) => {
    const filePath = path.join(rootPath, name + '.mdx');
    if (fs.existsSync(filePath)) {
      console.log('Already exists: ', filePath);
      return;
    } else if (ignored.includes(name)) {
      console.log('Ignored: ', name);
      return;
    }
    axios
      .get(
        `https://raw.githubusercontent.com/${handle}/${name}/master/README.md`
      )
      .then(async res => {
        const content = res.data;
        fs.writeFile(
          filePath,
          `---
path: /projects/${name}
type: project
date: ${date}

title: ${name}
subtitle: ${description}
---
${content}

---
Homepage : [${homepage}](${homepage})

Source: [${name}](${url})
`,
          () => console.log('Wrote: ', filePath)
        );
      })
      .catch(e => {
        console.log(e.message, 'while processing: ', name);
      });
  });
});
