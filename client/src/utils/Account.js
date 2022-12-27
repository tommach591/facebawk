const serverURL = "https://facebawk.herokuapp.com";

export function getAllAccount() {
  return fetch(`${serverURL}/api/account/allAccounts`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function loginAccount(loginLogin) {
  return fetch(`${serverURL}/api/account/login/${loginLogin}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function createAccount(login, password) {
  let body = {
    login: login,
    password: password,
  };

  return fetch(`${serverURL}/api/account/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function deleteAccount(loginLogin, loginPassword) {
  let body = {
    login: loginLogin,
    password: loginPassword,
  };

  return fetch(`${serverURL}/api/account/delete`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}
