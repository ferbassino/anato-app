import client from "../api/client";

export const getUser = async (credentials) => {
  const { email, password } = credentials;
  const { res } = await client.post("/api/anato-user/sign-in", {
    email,
    password,
  });
  if (!res.data.success) throw new Error("response success false");
  const { user } = res.data;
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};
