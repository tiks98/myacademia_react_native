export default {
  login: (user) => {
    return fetch("https://myacademiabe.herokuapp.com/user/login", {
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
    return fetch("https://myacademiabe.herokuapp.com/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch("https://myacademiabe.herokuapp.com/user/authenticated").then(
      (res) => {
        if (res.status !== 401) return res.json().then((data) => data);
        else return { isAuthenticated: false, user: { username: "" } };
      }
    );
  },
};
