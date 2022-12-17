export function getAllAccount() {
  return fetch("http://localhost:3001/api/account/allAccounts")
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function loginAccount(loginEmail) {
  return fetch(`http://localhost:3001/api/account/login/${loginEmail}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function createAccount(email, password) {
  let body = {
    email: email,
    password: password,
  };

  return fetch(`http://localhost:3001/api/account/signup`, {
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

export function deleteAccount(loginEmail, loginPassword) {
  let body = {
    email: loginEmail,
    password: loginPassword,
  };

  return fetch(`http://localhost:3001/api/account/delete`, {
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
