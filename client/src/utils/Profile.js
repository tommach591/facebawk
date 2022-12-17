export function getAllProfile() {
  return fetch("http://localhost:3001/api/profile/allProfiles")
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function createProfile(user_id, email, first, last, birthdate, gender) {
  let body = {
    user_id: user_id,
    email: email,
    first: first,
    last: last,
    birthdate: birthdate,
    gender: gender,
  };

  return fetch(`http://localhost:3001/api/profile/signup`, {
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

export function deleteProfile(loginEmail) {
  let body = {
    email: loginEmail,
  };

  return fetch(`http://localhost:3001/api/profile/delete`, {
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
