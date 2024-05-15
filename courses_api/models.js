const mongoose = require('mongoose');
const { courseSchema } = require('./schemas');

const courseModel = mongoose.model('Course', courseSchema);

module.exports = {courseModel };