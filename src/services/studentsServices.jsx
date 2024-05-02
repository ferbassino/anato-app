import client from "../api/client";

export const getAllStudents = async () => {
  const res = await client.get("/api/student");
  if (!res.data.success) throw new Error("response success false");
  const students = res.data.students;
  return students;
};
