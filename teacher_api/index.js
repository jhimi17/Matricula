const express = require("express")
const uri = 'mongodb+srv://admin:marcelo17@cluster1.sxvp7ge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { teacherModel } = require('./models');
app.get('/', (req, res) => { res.send("I am alive Teacher"); })

app.get('/teacher', async(req, res)=>{
  const teacher = await teacherModel.find({});
  res.json( teacher );
});
app.get('/teacher/:codeTeacher', async(req, res)=>{
  const teacher = await teacherModel.find({codeTeacher:req.params.codeTeacher});
  res.json( teacher );
});
app.post('/teacher', async(req, res)=>{
  try {
    const codeTeacher = req.body.codeTeacher;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const status = req.body.status;

    const teacher = new teacherModel({ codeTeacher,name,lastname,status});

    const data = await teacher.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})