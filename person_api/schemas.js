const mongoose = require('mongoose');
const peopleSchema = new mongoose.Schema({
    codeStudent: {
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
    address: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = {peopleSchema}