export default {
  login: (user) => {
    return fetch("http://192.168.126.1:4000/user/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else
        return {
          isAuthenticated: false,
          user: { username: "" },
          message: {
            msgBody: "Username or Password is incorrect, Please try again",
            msgError: true,
          },
        };
    });
  },
  logout: () => {
    return fetch("http://192.168.126.1:4000/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch("http://192.168.126.1:4000/user/authenticated").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { username: "" } };
    });
  },
};
