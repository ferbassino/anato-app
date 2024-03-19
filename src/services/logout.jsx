const logout = () => {
  try {
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
};

export default logout;
