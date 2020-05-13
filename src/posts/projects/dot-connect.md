---
path: /projects/dot-connect
type: project
date: 2018-04-07

order: 1

title: DotConnect - The Game
subtitle: A turn based two player game built on MERN stack technologies.
  This was my first project with react.

tags:
  - react
  - node
  - express
  - mongo
  - socket.io

image: ../../images/dotconnect/cover.png

gallery:
  - ../../images/dotconnect/home.png
  - ../../images/dotconnect/create.png
  - ../../images/dotconnect/waiting.png
  - ../../images/dotconnect/playing.png
  - ../../images/dotconnect/topchart.png

allowComments: true
---

A turn based two player game built on MERN stack technologies. This was my first project with react. Since it was my first serious JavaScript project, I tried to use as less packages as possible so that I could learn and understand things deeply. But this was obviously a bad idea. I didn't even use basic packages like _body-parser_. This project seems very crude now. Maybe I'll update it someday.

## Features

- Play online against a friend in real time. Create a game and send the link to a friend.
- Play with strangers from lobby.
- Watch games being played by others. Well, that was an unintended feature 😛
- Sign in with facebook to save progress and scores.
- Compete in the _Top chart_

## Rules of the game

The game starts with a grid of dots. Each player in turn connects two dots vertically or horizontally. If this connection makes a box, he gets a point and another move. No move can be passed. When the grid is complete, the player with most points wins.

[Live Demo](https://dot-connect.sakib.dev)

## Key Technologies

In the fronted-

- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reduxjs/react-redux)
- [React Router](https://github.com/ReactTraining/react-router)
- [Socket.IO Client](https://github.com/socketio/socket.io-client)

In the backend-

- [Express](https://github.com/expressjs/express)
- Mongo
- [Mongoose](https://github.com/Automattic/mongoose)
- [Socket.IO](https://github.com/socketio/)

[Read the medium story](https://medium.com/@sjsakib/how-i-built-my-first-react-app-dot-connect-364f39ca0db7)

## Run this on your own machine

You will need to have node, npm and yarn installed.

```bash
# First clone the repository with git
git clone https://github.com/sjsakib/dot-connect.git

# Then move inside the project, install the client side dependencies and run the front-end
cd dot-connect
yarn install
yarn start

# Now open a new shell window and move to the server directory
# install the server side dependencies and run the server
cd server
yarn install
yarn start
```

An internet connection is required for the app to work. Because it uses a sandbox database instance from [mlab](https://mlab.com/) instead of local installation of Mongo.
