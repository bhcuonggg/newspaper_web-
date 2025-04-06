const setUserSession = (userData) => {
  sessionStorage.setItem("user", JSON.stringify(userData));
};

const getUserSession = () => {
  const userStr = sessionStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

const removeUserSession = () => {
  sessionStorage.removeItem("user");
};

export { setUserSession, getUserSession, removeUserSession };
