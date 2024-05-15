const express = require("express")
const uri = 'mongodb+srv://admin:marcelo17@cluster1.sxvp7ge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { courseModel } = require('./models');
app.get('/', (req, res) => { res.send("I am alive Courses"); })

app.get('/course', async(req, res)=>{
  const course = await courseModel.find({});
  res.json( course );
});
app.get('/course/:code', async(req, res)=>{
  const course = await courseModel.find({code:req.params.code});
  res.json( course );
});
app.post('/course', async(req, res)=>{
  try {
    const code = req.body.code;
    const name = req.body.name;
    const typeCourse = req.body.typeCourse;

    const course = new courseModel({ code,name,typeCourse});

    const data = await course.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})