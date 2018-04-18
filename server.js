'use strict';

// const data = require('./db/notes');
// const simDB = require('./db/simDB'); 
// const notes = simDB.initialize(data);

const express = require('express');
const { PORT } = require('./config');
const morgan = require('morgan');
const notesRouter = require('./router/notes.router.js');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

app.use('/api', notesRouter);

app.listen(PORT, function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
