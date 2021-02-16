# Title: Note-Taker

## Descriton

The aim of this project is to create an application called Note Taker that can be used to write and save notes. This application will use an Express.js back end and will save and retrieve note data from a JSON file.
## Deployed link
Github: https://github.com/Herve8/Note-Taker

Heroku: https://notetakerjs.herokuapp.com/

## Getting started

The application should have a db.json file on the back end that will be used to store and retrieve notes using the fs module.
The following HTML routes should be created:

GET /notes should return the notes.html file.

GET * should return the index.html file.

The following API routes should be created:

GET /api/notes should read the db.json file and return all saved notes as JSON.

POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

Additionally, add the DELETE route to the application using the following guideline:

DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

## Installing

The following apps and dependencies were installed:

* Node.js
* $ npm init
* $ npm install express --save
* $ npm install --save path
* $ npm install file-system --save
## Acceptance Criteria

* Users should be able to create and save notes.

* Users should be able to view previously saved notes.

* Users should be able to delete previously saved notes.
## Video demonstration
Please view a demonstration video showing how the app works. Thanks.

![notetaker](https://user-images.githubusercontent.com/16859648/108037276-55076f80-7074-11eb-985d-b167799c73a3.gif)




