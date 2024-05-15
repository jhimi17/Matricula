const axios = require("axios");

const getCourses = async () => {
  try {
    const response = await axios.get("http://courses_api:8080/course");
    return response.data;
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    throw error;
  }
};

const addCourse = async (courseData) => {
  try {
    const response = await axios.post("http://courses_api:8080/course", courseData);
    return response.data;
  } catch (error) {
    console.error("Error al agregar curso:", error);
    throw error;
  }
};

module.exports = { getCourses, addCourse };
