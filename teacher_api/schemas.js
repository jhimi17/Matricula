const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    codeTeacher: {
        type: String,
        required: true
      },
    name: {
      type: String,
      required: true
    },
    lastname: {
        type: String,
        required: true
    },
    status: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = {teacherSchema}