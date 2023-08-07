---
path: /blog/scraping-light-oj-part-ii/
type: post
title: 'Scraping Light OJ: Part II'
date: 2017-10-11
subtitle: Builing a scrapper to scrape the submitted solutions from LightOJ
tags: [scraping, python, cp, lightoj, english]
---

Previously we just yielded all our data to scrapy and scrapy saved them in a json file. Now we'll process our data in our own way. For that we have to write a `pipeline`.

A pipeline is already created by scrapy when we started our project. We need to add this to our `settings.py` file to activate that.

```python
ITEM_PIPELINES = {
    'lightoj.pipelines.LightojPipeline': 300,
}
```

What is the number 300? Well, when we have multiple pipelines, the pipeline with smaller number gets to precess data first. For now we have only one pipeline, we could put any number.

Now let's open the `pipelines.py` file and add our stuffs in there. First we have to implement a method `process_item`. Whenever our spider yields a item, the item will pass to this method so that it can be process as we like.

If the item is a submission information we'll append it to the `data.json` file. And if it is a tag information we'll add it to a `dict` property of our pipeline to use later when saving files. We'll also add a `open_spider` method to add that dict property to our spider

```python
def open_spider(self, spider):
    self.tags = {}

def process_item(self, item, spider):
    if 'tags' in item:  # it's tag information
        self.tags[item['pid']] = item['tags']
    else:
        # one json object per line
        data = json.dumps(item)+'\n'
        with open('data.json', 'a') as f:
            f.write(data)
    return item
```

Now the last part. We'll implement a method `close_spider` in our pipeline. This method will be called when our spider closes. We'll write code to save our codes there. Here's the code

```python
def close_spider(self, spider):
    self.all_tags = set()
    for p in self.tags:
        for tag in self.tags[p]:
            self.all_tags.add(tag)

    with open('data.json', 'r+') as f:
        if not os.path.exists('codes'):
            os.mkdir('codes')
        os.chdir('codes')
        spider.logger.info("Saving files to codes folder...")
        for line in f:
            sub = json.loads(line)
            self.save_code(sub, spider)
        f.seek(0)
        f.truncate()  # clear the data file after writing all the codes
    os.chdir('..')

def save_code(self, sub, spider):
    code = "/**\n"
    code += " * Author    : {}\n".format(settings.USER.split('@')[0])
    code += " * Lang      : {}\n".format(sub['lang'])
    code += " * Date      : {}\n".format(sub['date'])
    code += " * Problem   : {}\n".format(sub['name'])
    code += " * CPU       : {}\n".format(sub['cpu'])
    code += " * Memory    : {}\n".format(sub['mem'])
    code += "**/\n"
    code += sub['code']
    for tag in self.all_tags:
        if tag in self.tags[sub['pid']]:
            self.save_to_folder(tag, sub['lang'], sub['name'], code, sub['subid'], spider)

def save_to_folder(self, tag, lang, name, code, subid, spider):
    if not os.path.exists(tag):
        os.mkdir(tag)
    os.chdir(tag)

    if lang == 'C++':
        ext = '.cpp'
    elif lang == 'JAVA':
        ext = '.java'
    elif lang == 'C':
        ext = '.c'
    else:
        ext = 'unknown'
    filebase = 'LightOJ ' + name
    filename = filebase + ext
    v = 1
    while os.path.exists(filename):
        v += 1
        filename = filebase + ' v' + str(v) + ext
    with open(filename, 'w') as f:
        f.write(code)
        spider.done.append(subid)  # will be explained later
    os.chdir('..')

```

Now our spider should save all the codes properly. But before finishing, we'll do one more thing. What happens when we run our spider again? It'll scrape all the submissions again. Instead we could make it scrape only the new submissions. To do that, we have to save to a file which submissions have been already scraped.

We'll add a list property `done` in our spider when it's created. We'll add the `subid` to this when we scrape a submission. And when our spider closes we'll save them to a file. We have to add a `__init__` method to our spider.

```python
def __init__(self, *args, **kwargs):
    super(LojSpider, self).__init__(*args, **kwargs)
    with open('done.json', 'r') as f:
        text = f.read()
    if text:
        self.done = json.loads(text)
    else:
        self.done = []
```

Now we need to save it to a file when the spider is done with scraping. Scrapy provides a way to do things when a spider closes. We need to implement a method `closed`. It will be called when the spider closes.

```python
def closed(self, reason):
    with open('done.json', 'w') as f:
        json.dump(self.done, f)
```

We have to add this to `parse_all_sub` method of our spider, so that we our spider doesn't scrape already scraped submissions

```python
subid = a.css('::text').extract_first().strip()
if subid in self.done:
    continue
```

We already added `spider.done.append(subid)` in `save_to_folder` method of our pipeline. It adds the `subid` to to `done` property of our spider after saving the code successfully.

And now we're done. Let's run our spider. This time we don't need the `-o data.json` option, as we are saving the data manually.

```
$ scrapy crawl loj
```

After the process finishes, head to the `codes` folder and check out the codes! Now these can be uploaded and showed off :stuck_out_tongue_winking_eye:

I got mine like this...

```
├── Basic Data Structures
│   ├── LightOJ 1113 - Discover the Web.java
│   ├── LightOJ 1212 - Double Ended Queue.java
│   └── LightOJ 1303 - Ferris Wheel.java
├── Basic Geometry
│   ├── LightOJ 1022 - Circle in Square.java
│   ├── LightOJ 1043 - Triangle Partitioning.cpp
│   ├── LightOJ 1072 - Calm Down.java
│   ├── LightOJ 1107 - How Cow.java
│   ├── LightOJ 1211 - Intersection of Cubes.java
│   ├── LightOJ 1216 - Juice in the Glass.java
│   ├── LightOJ 1305 - Area of a Parallelogram.java
│   ├── LightOJ 1331 - Agent J.java
│   └── LightOJ 1433 - Minimum Arc Distance.java
├── Basic Math
│   ├── LightOJ 1008 - Fibsieve`s Fantabulous Birthday.java
│   ├── LightOJ 1010 - Knights in Chessboard.java
│   ├── LightOJ 1020 - A Childhood Game.java
│   ├── LightOJ 1078 - Integer Divisibility.cpp
│   ├── LightOJ 1116 - Ekka Dokka.java
│   ├── LightOJ 1148 - Mad Counting.cpp
│   ├── LightOJ 1214 - Large Division.java
│   ├── LightOJ 1294 - Positive Negative Sign.java
│   ├── LightOJ 1311 - Unlucky Bird.java
│   ├── LightOJ 1354 - IP Checking.java
│   └── LightOJ 1414 - February 29.java
├── Basic Recursion
│   └── LightOJ 1023 - Discovering Permutations.cpp
├── Beginners Problems
│   ├── LightOJ 1000 - Greetings from LightOJ.java
│   ├── LightOJ 1001 - Opposite Task.java
│   ├── LightOJ 1006 - Hex-a-bonacci.cpp
│   ├── LightOJ 1006 - Hex-a-bonacci.java
│   ├── LightOJ 1006 - Hex-a-bonacci v2.cpp
│   ├── LightOJ 1008 - Fibsieve`s Fantabulous Birthday.java
│   ├── LightOJ 1010 - Knights in Chessboard.java
│   ├── LightOJ 1015 - Brush (I).c
│   ├── LightOJ 1015 - Brush (I).java
│   ├── LightOJ 1022 - Circle in Square.java
│   ├── LightOJ 1042 - Secret Origins.java
│   ├── LightOJ 1045 - Digits of Factorial.java
│   ├── LightOJ 1053 - Higher Math.java
│   ├── LightOJ 1053 - Higher Math v2.java
│   ├── LightOJ 1069 - Lift.java
│   ├── LightOJ 1072 - Calm Down.java
│   ├── LightOJ 1107 - How Cow.java
│   ├── LightOJ 1109 - False Ordering.java
│   ├── LightOJ 1113 - Discover the Web.java
│   ├── LightOJ 1116 - Ekka Dokka.java
│   ├── LightOJ 1133 - Array Simulation.java
│   ├── LightOJ 1136 - Division by 3.java
│   ├── LightOJ 1182 - Parity.java
│   ├── LightOJ 1189 - Sum of Factorials.java
│   ├── LightOJ 1202 - Bishops.java
│   ├── LightOJ 1211 - Intersection of Cubes.java
│   ├── LightOJ 1212 - Double Ended Queue.java
│   ├── LightOJ 1214 - Large Division.java
│   ├── LightOJ 1216 - Juice in the Glass.java
│   ├── LightOJ 1225 - Palindromic Numbers (II).java
│   ├── LightOJ 1227 - Boiled Eggs.java
│   ├── LightOJ 1241 - Pinocchio.java
│   ├── LightOJ 1249 - Chocolate Thief.java
│   ├── LightOJ 1261 - K-SAT Problem.java
│   ├── LightOJ 1294 - Positive Negative Sign.java
│   ├── LightOJ 1305 - Area of a Parallelogram.java
│   ├── LightOJ 1311 - Unlucky Bird.java
│   ├── LightOJ 1331 - Agent J.java
│   ├── LightOJ 1338 - Hidden Secret!.java
│   ├── LightOJ 1354 - IP Checking.java
│   ├── LightOJ 1387 - Setu.java
│   ├── LightOJ 1414 - February 29.java
│   └── LightOJ 1433 - Minimum Arc Distance.java
├── Big Integer Arithmetic
│   └── LightOJ 1024 - Eid.java
├── Binary Indexed Tree
│   ├── LightOJ 1080 - Binary Simulation.cpp
│   ├── LightOJ 1085 - All Possible Increasing Subsequences.cpp
│   ├── LightOJ 1112 - Curious Robin Hood.cpp
│   └── LightOJ 1266 - Points in Rectangle.cpp
├── Binary Search, Bisection
│   ├── LightOJ 1043 - Triangle Partitioning.cpp
│   ├── LightOJ 1048 - Conquering Keokradong.cpp
│   ├── LightOJ 1072 - Calm Down.java
│   ├── LightOJ 1076 - Get the Containers.cpp
│   ├── LightOJ 1088 - Points in Segments.cpp
│   └── LightOJ 1196 - Inhabitants.cpp
├── Binary Search Tree
│   ├── LightOJ 1087 - Diablo.cpp
│   ├── LightOJ 1097 - Lucky Number.cpp
│   └── LightOJ 1293 - Document Analyzer.cpp
├── Breadth First Search, Depth First Search
│   ├── LightOJ 1009 - Back to Underworld.java
│   ├── LightOJ 1012 - Guilty Prince.java
│   ├── LightOJ 1039 - A Toy Company.java
│   └── LightOJ 1046 - Rider.cpp
├── Chinese Remainder Theorem
│   └── LightOJ 1319 - Monkey Tradition.cpp
├── Counting
│   └── LightOJ 1005 - Rooks.cpp
├── Dynamic Programming
│   ├── LightOJ 1004 - Monkey Banana Problem.cpp
│   ├── LightOJ 1005 - Rooks.cpp
│   ├── LightOJ 1047 - Neighbor House.cpp
│   └── LightOJ 1231 - Coin Change (I).cpp
├── Greedy
│   ├── LightOJ 1016 - Brush (II).cpp
│   ├── LightOJ 1048 - Conquering Keokradong.cpp
│   ├── LightOJ 1076 - Get the Containers.cpp
│   ├── LightOJ 1166 - Old Sorting.cpp
│   ├── LightOJ 1198 - Karate Competition.cpp
│   ├── LightOJ 1219 - Mafia.cpp
│   ├── LightOJ 1301 - Monitoring Processes.cpp
│   └── LightOJ 1425 - The Monkey and the Oiled Bamboo.cpp
├── Number Theory
│   ├── LightOJ 1024 - Eid.java
│   ├── LightOJ 1045 - Digits of Factorial.java
│   ├── LightOJ 1109 - False Ordering.java
│   └── LightOJ 1214 - Large Division.java
├── Segment Tree, Interval Tree
│   ├── LightOJ 1080 - Binary Simulation.cpp
│   ├── LightOJ 1085 - All Possible Increasing Subsequences.cpp
│   ├── LightOJ 1087 - Diablo.cpp
│   ├── LightOJ 1097 - Lucky Number.cpp
│   └── LightOJ 1112 - Curious Robin Hood.cpp
└── Weighted Bipartite Matching, Hungarian Algorithm
    └── LightOJ 1198 - Karate Competition.cpp
```

(This kind of cool trees can be generated using [tree.](https://linux.die.net/man/1/tree))

The full code along with my LightOJ solutions are available [here.](https://github.com/sjsakib/lightoj-solutions) If you want to use it

1. Install `scrapy` and `bs4`
2. Delete the `codes` folder
3. Delete everything from the `done.json` file
4. Add your userid and password in the `settings.py` file
5. Run the spider

Only tested on linux, but is supposed to work on windows as well.

Thanks for reading. Any kind of correction, suggestion, advice will be appreciated.
