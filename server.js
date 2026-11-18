
const express = require('express');
const fs = require('fs');
const app = express();


let courses = require('./courses.json'); 

app.use(express.json()); 

const save = () => fs.writeFileSync('./courses.json', JSON.stringify(courses, null, 2));

app.get('/courses', (req, res) => res.json(courses));

app.get('/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  course ? res.json(course) : res.status(404).send('Not found');
});

app.post('/courses', (req, res) => {
  courses.push(req.body); 
  save();
  res.send('Course added');
});

app.put('/courses/:id', (req, res) => {
  const index = courses.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).send('Not found');
  
  courses[index] = { ...courses[index], ...req.body, id: req.params.id };
  save();
  res.json(courses[index]);
});

app.delete('/courses/:id', (req, res) => {
  courses = courses.filter(c => c.id !== req.params.id); 
  save();
  res.send('Course deleted');
});

app.listen(3000, () => console.log('Server running on port 3000'));
































