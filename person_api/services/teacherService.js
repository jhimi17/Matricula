const axios = require("axios");

const getTeachers = async () => {
  try {
    const response = await axios.get("http://teacher_api:8080/teacher");
    return response.data;
  } catch (error) {
    console.error("Error al obtener docentes:", error);
    throw error;
  }
};

const addTeacher = async (teacherData) => {
  try {
    const response = await axios.post("http://teacher_api:8080/teacher", teacherData);
    return response.data;
  } catch (error) {
    console.error("Error al agregar docente:", error);
    throw error;
  }
};

module.exports = { getTeachers, addTeacher };
