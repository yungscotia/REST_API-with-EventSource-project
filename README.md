## Setup for this REST API

Things you'll need to run this project:
* A basic understanding of GitHub commands and of your computer's terminal commands
* The project files from GitHub (https://github.com/launchdarkly/coding-test-Nova-Quaoser.git)
* Node.js
* A browser or API testing application (like Postman)
* The power of friendship and a can-do attitude!


To first get the server up and running, you'll need to get the files from GitHub for the server code. Your next steps for getting the project files depend on if you're on Windows or Mac/Linux. For this README, I'll assume you have Git set up and a basic understanding of your computer's terminal commands.

First, navigate to a directory where you're comfortable saving this project and where GitHub has been initialized. Then type:

        git clone https://github.com/yungscotia/REST_API-with-EventSource-project.git

This should download and create a folder with all the project files needed to set up the REST API. Once that's done, you should default be on the branch named `master`. If not, you'll want to switch over to that by typing:

        git checkout master
        git pull

The server has been built on a Node and Express framework. In order to start up the server you'll first need to install Node.js (found here: https://nodejs.org/en/). Once Node.js has been installed, you'll need to install certain package dependencies to have the files run properly. Do this by typing:

        npm install

This will install several dependencies like Express.js (needed to run the server), EventSource (needed to subscribe to a data stream), and Mocha (to help test certain features of the server) just to name a few. 

Good news! You're pretty much done with the setup for running this server! Now, just run the command:

        npm start

and the start script outlined in package.json will start up the server for you. If you'd like to run some of the automated tests I've built just type:

        npm test

and you should see several tests pass (hopefully) and log some information in your terminal/console. 

**Note:**If you run into an issue where your terminal indicates that `mocha` isn't a valid internal or external command try running:

        npm install -g mocha

This should solve this problem and allow you to run `npm test` successfully. On Windows, I ran into an issue where I had to restart my terminal and then run `npm install -g mocha` a second time to get `npm test` to work. On Mac, I had no issues.

**Note:**Also, if you run into an issue where your terminal indicates that the port 3000 "is already in use", make sure that you've killed the previous process in your terminal before calling `npm start` or `npm test` again. You can do this with the `Ctrl+C` commmand.

## Server Features

Now that you have the server up and running (`npm start`), the server can respond in several ways. Navigate in your browser or any sort of API testing application (like Postman) and type in one of these 4 URLs.

1. `localhost:3000/students` - Send a GET request to this URL if you want a list of all students who have registered at least one test score.
2. `localhost:3000/students/{id}` - You can send a GET request where {id} can be a student ID of your choosing in order to see that student's exam scores and their average score on all exams.
3. `localhost:3000/exams` - Send a GET request to this URL if you want a list of all the exams recorded.
4. `localhost:3000/exams/{number}` - You can send a GET request where {number} can be an exam of your choosing in order to see all the scores of students who took that exam and the exam's average score.

