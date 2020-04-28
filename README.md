## Coding test


At `http://live-test-scores.herokuapp.com/scores` you'll find a service that follows the [Server-Sent Events](https://www.w3.org/TR/2015/REC-eventsource-20150203/) protocol. You can connect to the service using cURL:

        curl http://live-test-scores.herokuapp.com/scores

Periodically, you'll receive a JSON payload that represents a student's test score (a JavaScript number between 0 and 1), the exam number, and a student ID that uniquely identifies a student. For example:


        event: score
        data: {"exam": 3, "studentId": "foo", score: .991}

This represents that student foo received a score of `.991` on exam #3. 

Your job is to build an application that consumes this data, processes it, and provides a simple REST API that exposes the processed results. 

You may build this application in any language or stack that you prefer. You may also use any open-source libraries or resources that you find helpful. **As part of the exercise, please replace this README file with instructions for building and running your project.**

Here's the REST API we want you to build:

1. A REST API `/students` that lists all users that have received at least one test score
2. A REST API `/students/{id}` that lists the test results for the specified student, and provides the student's average score across all exams
3. A REST API `/exams` that lists all the exams that have been recorded
4. A REST API `/exams/{number}` that lists all the results for the specified exam, and provides the average score across all students

Coding tests are often contrived, and this exercise is no exception. To the best of your ability, make your solution reflect the kind of code you'd want shipped to production. A few things to try and pay attention to:


* Well-structured, well-written, idiomatic, safe, performant code.
* Tests, reflecting the level of testing you'd expect in a production service.
* Good RESTful API design. Whatever that means to you, make sure your implementation reflects it, and be able to defend your design.
* Ecosystem understanding. Your code should demonstrate that you understand whatever ecosystem you're coding against— including project layout and organization, use of third party libraries, and build tools.
* Store the results in memory instead of a persistent store. In production code, you'd never do this, of course.
* Since you're storing results in memory, you don't need to worry about the “ops” aspects of deploying your service— load balancing, high availability, deploying to a cloud provider, etc. won't be necessary.



## Setup for this REST API

Things you'll need to run this project:
* A basic understanding of GitHub commands and of your computer's terminal commands
* The project files from GitHub (https://github.com/launchdarkly/coding-test-Nova-Quaoser.git)
* Node.js
* A browser or API testing application (like Postman)
* The power of friendship and a can-do attitude!


To first get the server up and running, you'll need to get the files from GitHub for the server code. Your next steps for getting the project files depend on if you're on Windows or Mac/Linux. For this README, I'll assume you have Git set up and a basic understanding of your computer's terminal commands.

First, navigate to a directory where you're comfortable saving this project and where GitHub has been initialized. Then type:

        `git clone https://github.com/launchdarkly/coding-test-Nova-Quaoser.git`

This should download and create a folder with all the project files needed to set up the REST API. Once that's done, you should default be on the branch named `master`. You'll want to switch over to the branch named `nova-quaoser-work` by typing:

        `git checkout nova-quaoser-work`

The server has been built on a Node and Express framework. In order to start up the server you'll first need to install Node.js (found here: https://nodejs.org/en/). Once Node.js has been installed, you'll need to install certain package dependencies to have the files run properly. Do this by typing:

        `npm install`

This will install several dependencies like Express.js (needed to run the server), EventSource (needed to subscribe to a data stream), and Mocha (to help test certain features of the server) just to name a few. 

Good news! You're pretty much done with the setup for running this server! Now, just run the command:

        `npm start`

and the start script outlined in package.json will start up the server for you. If you'd like to run some of the automated tests I've built just type:

        `npm test`

and you should see several tests pass (hopefully) and log some information in your terminal/console. 

**Note:**If you run into an issue where your terminal indicates that `mocha` isn't a valid internal or external command try running:

        `npm install -g mocha`

This should solve this problem and allow you to run `npm test` successfully. On Windows, I ran into an issue where I had to restart my terminal and then run `npm install -g mocha` a second time to get `npm test` to work. On Mac, I had no issues.


## Server Features

Now that you have the server up and running (`npm start`), the server can respond in several ways. Navigate in your browser or any sort of API testing application (like Postman) and type in one of these 4 URLs.

1. `localhost:3000/students` - Send a GET request to this URL if you want a list of all students who have registered at least one test score.
2. `localhost:3000/students/{id}` - You can send a GET request where {id} can be a student ID of your choosing in order to see that student's exam scores and their average score on all exams.
3. `localhost:3000/exams` - Send a GET request to this URL if you want a list of all the exams recorded.
4. `localhost:3000/exams/{number}` - You can send a GET request where {number} can be an exam of your choosing in order to see all the scores of students who took that exam and the exam's average score.
5. `localhost:3000` - Sending a GET request here will display all the raw data logged in memory from the EventSource data stream

