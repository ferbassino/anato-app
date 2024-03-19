import client from "../api/client";

const login = async (credentials) => {
  try {
    const { email, password } = credentials;
    const { data } = await client.post("/api/anato-user/sign-in", {
      email,
      password,
    });

    if (data.success) {
      const { user } = data;
      localStorage.setItem("user", JSON.stringify(user));
    }

    return data.user;
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    console.log(`signIn method error: ${error}`);
    return { success: false, error: error.message };
  }
};

export default login;
