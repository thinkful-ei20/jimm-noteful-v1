'use strict';

const data = require('./db/notes');
const express = require('express');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const app = express();
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  if(req.query.searchTerm !== undefined){
    console.log(req.query.searchTerm);
    const filteredItems = data.filter(item => {
      if(item.title.toLowerCase().includes(req.query.searchTerm.toLowerCase()) || item.content.toLowerCase().includes(req.query.searchTerm.toLowerCase())){
        return true;
      }
    });
    res.json(filteredItems);
  } else {
    res.json(data);
  }
});

// app.get('/api/notes/:id', (req, res) => {
//   const id = Number(req.params.id);
//   for(let note of data){
//     if(note.id === id){
//       res.json(note);
//     }
//   }
// });

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  res.json(data.find(item => item.id === id));
});








app.listen(8080, function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
