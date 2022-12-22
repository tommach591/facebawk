const serverURL = "http://localhost:3001";

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

export function createProfile(user_id, email, first, last, birthdate, gender) {
  let body = {
    user_id: user_id,
    email: email,
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

  return fetch(`${serverURL}/api/profile/update/friends`, {
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

export function updateWork(user_id, work) {
  let body = {
    user_id: user_id,
    new_work: work,
  };

  return fetch(`${serverURL}/api/profile/update/work`, {
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

export function updateEducation(user_id, education) {
  let body = {
    user_id: user_id,
    new_education: education,
  };

  return fetch(`${serverURL}/api/profile/update/education`, {
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

export function updateCity(user_id, city) {
  let body = {
    user_id: user_id,
    new_city: city,
  };

  return fetch(`${serverURL}/api/profile/update/city`, {
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

export function updateHometown(user_id, hometown) {
  let body = {
    user_id: user_id,
    new_hometown: hometown,
  };

  return fetch(`${serverURL}/api/profile/update/hometown`, {
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

export function updateRelationship(user_id, relationship) {
  let body = {
    user_id: user_id,
    new_relationship: relationship,
  };

  return fetch(`${serverURL}/api/profile/update/relationship`, {
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

export function updateNamePronunciation(user_id, name_pronunciation) {
  let body = {
    user_id: user_id,
    new_name_pronunciation: name_pronunciation,
  };

  return fetch(`${serverURL}/api/profile/update/name_pronunciation`, {
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

  return fetch(`${serverURL}/api/profile/update/photos`, {
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

export function addNewPost(user_id, post) {
  let body = {
    user_id: user_id,
    new_post: post,
  };

  return fetch(`${serverURL}/api/profile/update/posts_made`, {
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

export function addPostLiked(user_id, post_liked) {
  let body = {
    user_id: user_id,
    new_post_liked: post_liked,
  };

  return fetch(`${serverURL}/api/profile/update/posts_liked`, {
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

export function addPostShared(user_id, post_shared) {
  let body = {
    user_id: user_id,
    new_post_shared: post_shared,
  };

  return fetch(`${serverURL}/api/profile/update/posts_shared`, {
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
