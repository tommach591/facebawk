const serverURL = "http://localhost:3001";

export function getAllPost() {
  return fetch(`${serverURL}/api/post/allPosts`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getPost(post_id) {
  return fetch(`${serverURL}/api/post/get/${post_id}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getPostByUser(user_id) {
  return fetch(`${serverURL}/api/post/getPostByUser/${user_id}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function getNewsFeed(user_id, friends) {
  return fetch(`${serverURL}/api/post/newsfeed/${user_id}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}

export function createNewPost(user_id, content) {
  let body = {
    user_id: user_id,
    content: content,
    date_created: new Date(Date.now()),
  };

  return fetch(`${serverURL}/api/post/post`, {
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

export function deleteAllPost() {
  return fetch(`${serverURL}/api/post/deleteAll`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      else return;
    })
    .catch((err) => console.error(err));
}
