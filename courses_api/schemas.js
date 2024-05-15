const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
      },
    name: {
      type: String,
      required: true
    },
    tpeCourse: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = {courseSchema}