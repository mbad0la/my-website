## What is React?

[React](https://facebook.github.io/react/) is one of the best front-end frameworks in the industry at the moment. A minor proof of fact may be that it has more stars on GitHub than Angular, a massively appreciated MVC by Google.

It celebrates modularity and interactivity in user interfaces through declarative views that use one-way data binding (from parent to child), resulting in seamless view updations.

## The Struggle is Real!

Although, to start building projects in React, there is a substantial development overhead. One needs to setup a development environment i.e. provision dependencies.

It was quite confusing to me when I started out, still tweaking around with jQuery and Angular a bit, all but oblivious to what modules, bundlers, transpilers and dependencies (Ah! Those naive days) are. All I had ever done was include jQuery or Angular from a CDN in the browser and structure some pretty spaghetti of a code.

But it was all worth it. Such an experience let's you gain perspective on the fact that no matter how much you already know, there is still a plenty more to absorb.

Let's see some action!

## Prerequisites

* [Node](https://nodejs.org/en/) on your system
* [npm](https://www.npmjs.com/) cli-tool

## Fun Time

Open a terminal (`ctrl+alt+t` on Ubuntu) and create a directory for our project and navigate inside it
```bash
mkdir react-dev-env
cd react-dev-env
```
Declare this project a [package](https://docs.npmjs.com/how-npm-works/packages) by running the command
```bash
npm init
```
The command will initiate an utility that helps you fill in some meta-data about your project. What this utility does is create a `package.json` file in this directory, storing the meta-data in it. You may choose the default options in the utility prompts or put in better meta-data by learning more about [package.json](https://docs.npmjs.com/files/package.json). For the purpose of demonstration, I'll be sticking with the defaults.

This is how things might look like after all this.

![react-101-npm-init](/media/react-101-npm-init.png)

Now that our `package.json` is in place, let's start by adding dependencies to our project, so that we are able to build something using React.

NPM lets us have two types of dependencies, for the sake of verbosity. They are
* Dependencies

  Core dependencies needed to build the project
* Development Dependencies

  Dependencies that will only be used while development of the project

Let's install our core dependencies
```bash
npm i --save react react-dom
```
The `--save` option writes the dependency requirements in our `package.json` as well.

All these dependencies are basically modules that are included into our project so that we may use them. By using node's file system we can although easily include files in our project, but the browser doesn't have a notion about these 'modules' and how to include them.

Therefore, we need a tool that converts these modules into static assets, which the community knows as module bundling.

We will be using [webpack](https://webpack.github.io/docs/what-is-webpack.html) for our module bundling needs.

There is also a disparity between the lastest ECMAScript Standards and the browser support for it.

React for instance is widely coded in ES2015 standard.

Although, browsers have been able to almost service ES2015 now, we still need to transform ES2015 imports and [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) syntactic sugar into IIFE js (or browser compatible js).

This process is called transpiling, which will be implemented here by the development dependency called [babel](https://babeljs.io/).

Adding to our meta-data requirements
```bash
npm i --D webpack babel-core babel-loader babel-preset-es2015 babel-preset-react
```
The `--D` option writes down these packages as development dependencies in our `package.json`.

Congrats! We have succesfully installed all the dependencies in our project. Now we just need to provision a `webpack.config.js` file which is a configuration file for webpack, directing it which files to process and how.

Create a `webpack.config.js` file in the project root and add the following to it
```js
module.exports = {
  entry: './index.js',
  output: {
    path: './',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
```
This config file tells webpack to pick up an `index.js` file in the project root and process it through es2015 and react transpiling provided by babel and then bundle it into a file named `bundle.js` in our project root.

We need to be able to run webpack to do all this. As webpack is a local dependency i.e. not installed globally, it won't be available as `webpack` in the command line. We'll setup something called a [npm script](https://docs.npmjs.com/misc/scripts) for us to be able to execute this build process.

Open up the `package.json` add the following key-value entry in the object corresponding to the "scripts" key.
```vim
"build": "webpack"
```
Your `package.json` should be looking like this
```json
{
  "name": "react-dev-env",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^15.3.2",
    "react-dom": "^15.3.2"
  },
  "devDependencies": {
    "babel-core": "^6.18.2",
    "babel-loader": "^6.2.7",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "webpack": "^1.13.3"
  }
}
```

Whenever you need to build (transpile and bundle) your react project, just run `npm run build` on the terminal and it will get you your browser ready code in the `bundle.js` file.

Congrats! Your development environment is ready!
