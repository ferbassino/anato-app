import client from "../src/api/client";

const getStudentByDni = (dni) => {
  if (dni.length !== 8) {
    alert("el DNI debe tener 8 números");
    return;
  }
  const arrayDni = [];
  let student;
  try {
    const getAllStudents = async () => {
      const response = await client.get("/api/student");
      if (response.data.success) {
        const students = response.data.students;
        students.map((student) => {
          if (student.dni === dni) {
            arrayDni.push(student);
          }
        });

        student = arrayDni[0];
      }
      if (arrayDni.length < 1) {
        alert("El DNI no se encontró entre los alumnos");
        return;
      }

      return student;
    };
    getAllStudents();
  } catch (error) {
    console.log(error);
  }
};
export default getStudentByDni;
