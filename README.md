# PROJECT NAME

## Description

_Duration: Weekend Challenge_

This to-do list is my first attempt at creating a functional and attractive full-stack app from scratch.

## Screen Shot



### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- Postico

## Installation

How do you get your application up and running? This is a step by step list for how another developer could get this project up and running. The good target audience in terms of knowledge, would be a fellow Primer from another cohort being able to spin up this project. Note that you do not need a paragraph here to intro Installation. It should be step-by-step.

If your application has secret keys (for example --  Twilio), make sure you tell them how to set that up, both in getting the key and then what to call it in the `.env` file.

1. Create a SQL database named `todo_list`
2. The queries in the `database.sql` file are set up to create all the necessary tables. The INSERT statement will populate the table with dummy data if you'd like to see how the todo-list looks with data already inserted. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries.
3. Open up your editor of choice and run an `npm install` in the terminal
4. Run `npm install pg`
5. Run `npm start` and visit localhost:5000 in your browser

## Usage

- Type a task into the input field and click submit or hit enter to add it to the list.
- When a task is completed, click anywhere on the row where it resides to check it off
- Click on corrosponding trash can icon in order to delete a task

## Built With

Node.js, Express, jQuery, SQL, and Bootstrap.

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.

## Support
If you have suggestions or issues, please email me at connor.detviler@gmail.com