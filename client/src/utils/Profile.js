const serverURL = "https://facebawk.herokuapp.com";

export function getAllProfile() {
  return fetch(`${serverURL}/api/profile/allProfiles`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getProfile(user_id) {
  return fetch(`${serverURL}/api/profile/get/${user_id}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getSearch(query) {
  return fetch(`${serverURL}/api/profile/search/${query}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getFriends(user_id) {
  return fetch(`${serverURL}/api/profile/getFriends/${user_id}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function createProfile(user_id, login, first, last, birthdate, gender) {
  let body = {
    user_id: user_id,
    login: login,
    first: first,
    last: last,
    birthdate: birthdate,
    gender: gender,
  };

  return fetch(`${serverURL}/api/profile/signup`, {
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

export function updateIntro(
  user_id,
  bio,
  work,
  education,
  city,
  hometown,
  relationship
) {
  let body = {
    user_id: user_id,
    bio: bio,
    work: work,
    education: education,
    city: city,
    hometown: hometown,
    relationship: relationship,
  };

  return fetch(`${serverURL}/api/profile/update/intro`, {
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

export function addFriend(user_id, friend_id) {
  let body = {
    user_id: user_id,
    new_friend: friend_id,
  };

  return fetch(`${serverURL}/api/profile/update/add_friend`, {
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

export function removeFriend(user_id, friend_id) {
  let body = {
    user_id: user_id,
    new_friend: friend_id,
  };

  return fetch(`${serverURL}/api/profile/update/remove_friend`, {
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

export function makeFriendRequest(user_id, friend_id) {
  let body = {
    user_id: user_id,
    new_friend: friend_id,
  };

  return fetch(`${serverURL}/api/profile/update/add_friend_request`, {
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

export function declineFriendRequest(user_id, friend_id) {
  let body = {
    user_id: user_id,
    new_friend: friend_id,
  };

  return fetch(`${serverURL}/api/profile/update/remove_friend_request`, {
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

export function updatePfp(user_id, pfp) {
  let body = {
    user_id: user_id,
    new_pfp: pfp,
  };

  return fetch(`${serverURL}/api/profile/update/pfp`, {
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

export function updateBanner(user_id, banner) {
  let body = {
    user_id: user_id,
    new_banner: banner,
  };

  return fetch(`${serverURL}/api/profile/update/banner`, {
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

export function updateBio(user_id, bio) {
  let body = {
    user_id: user_id,
    new_bio: bio,
  };

  return fetch(`${serverURL}/api/profile/update/bio`, {
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

export function addPhoto(user_id, photo) {
  let body = {
    user_id: user_id,
    new_photo: photo,
  };

  return fetch(`${serverURL}/api/profile/update/add_photo`, {
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

export function deleteProfile(user_id) {
  let body = {
    user_id: user_id,
  };

  return fetch(`${serverURL}/api/profile/delete`, {
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
