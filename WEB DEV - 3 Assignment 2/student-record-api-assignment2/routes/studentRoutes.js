const express = require('express');
const router = express.Router();
const students = require('../data/students');

function validStudentInput(body) {
  const { name, age, course } = body;
  return Boolean(name && course && age !== undefined && Number(age) > 0);
}

// GET /students - all students
router.get('/', (req, res) => {
  res.json({ success: true, total: students.length, students });
});

// GET /students/:id - one student
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ success: false, message: 'ID must be a number' });
  }

  const student = students.find(item => item.id === id);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  res.json({ success: true, student });
});

// POST /students - add student
router.post('/', (req, res) => {
  if (!validStudentInput(req.body)) {
    return res.status(400).json({
      success: false,
      message: 'Name, positive age and course are required'
    });
  }

  const nextId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
  const student = {
    id: nextId,
    name: req.body.name,
    age: Number(req.body.age),
    course: req.body.course
  };

  students.push(student);
  res.status(201).json({ success: true, message: 'Student added', student });
});

// PUT /students/:id - replace student details
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(item => item.id === id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ success: false, message: 'ID must be a number' });
  }
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }
  if (!validStudentInput(req.body)) {
    return res.status(400).json({ success: false, message: 'Valid name, age and course are required' });
  }

  students[index] = {
    id,
    name: req.body.name,
    age: Number(req.body.age),
    course: req.body.course
  };

  res.json({ success: true, message: 'Student updated', student: students[index] });
});

// DELETE /students/:id - remove student
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(item => item.id === id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ success: false, message: 'ID must be a number' });
  }
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  const [removed] = students.splice(index, 1);
  res.json({ success: true, message: 'Student deleted', student: removed });
});

module.exports = router;
