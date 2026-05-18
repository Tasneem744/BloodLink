export const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  if (!user) return false;
  try {
    const parsed = JSON.parse(user);
    return !!parsed && parsed.isLoggedIn === true;
  } catch {
    return false;
  }
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};