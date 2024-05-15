const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const uri = 'mongodb+srv://admin:marcelo17@cluster1.sxvp7ge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
mongoose.connect(uri);

const port = 8080;
const { peopleModel } = require('./models');

const { getCourses, addCourse } = require('./services/coursesService');
const { getTeachers, addTeacher } = require('./services/teacherService');

app.get('/', (req, res) => { res.send("I am alive People"); });

app.get('/people', async(req, res) => {
  try {
    const people = await peopleModel.find({});
    res.json(people);
  } catch (error) {
    console.error("Error al obtener personas:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/people/:codeStudent', async(req, res) => {
  try {
    const person = await peopleModel.find({codeStudent: req.params.codeStudent});
    res.json(person);
  } catch (error) {
    console.error("Error al obtener persona por código de estudiante:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/people', async(req, res) => {
  try {
    const codeStudent = req.body.codeStudent;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const address = req.body.address;

    const person = new peopleModel({ codeStudent, name, lastname, address });
    const data = await person.save();
    
    // Agregar curso y docente también al ingresar una persona
    await addCourse(req.body);
    await addTeacher(req.body);

    return res.status(201).json(data);
  } catch (error) {
    console.error('Error al agregar persona:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Ruta para obtener todos los cursos
app.get('/courses', async (req, res) => {
  try {
    const courses = await getCourses();
    res.json(courses);
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Ruta para obtener todos los docentes
app.get('/teachers', async (req, res) => {
  try {
    const teachers = await getTeachers();
    res.json(teachers);
  } catch (error) {
    console.error("Error al obtener docentes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rutas para agregar un curso y un docente
app.post('/courses', async (req, res) => {
  try {
    const courseData = req.body;
    // Lógica para agregar el curso a la base de datos o realizar cualquier otra operación necesaria
    await addCourse(courseData); // Esta función se encarga de agregar el curso en courses_api
    res.status(201).json({ message: "Curso agregado exitosamente" });
  } catch (error) {
    console.error("Error al agregar curso:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/teachers', async (req, res) => {
  try {
    const teacherData = req.body;
    // Lógica para agregar el docente a la base de datos o realizar cualquier otra operación necesaria
    await addTeacher(teacherData); // Esta función se encarga de agregar el docente en teacher_api
    res.status(201).json({ message: "Docente agregado exitosamente" });
  } catch (error) {
    console.error("Error al agregar docente:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
