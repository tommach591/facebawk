const serverURL = "https://facebawk.herokuapp.com";

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

export function getPostChildren(post_id) {
  return fetch(`${serverURL}/api/post/getChildren/${post_id}`)
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

export function createNewChild(parent_id, user_id, content) {
  let body = {
    parent_id: parent_id,
    user_id: user_id,
    content: content,
    date_created: new Date(Date.now()),
  };

  return fetch(`${serverURL}/api/post/child`, {
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

export function likePost(post_id, user_id) {
  let body = {
    post_id: post_id,
    user_id: user_id,
  };

  return fetch(`${serverURL}/api/post/like`, {
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

export function unlikePost(post_id, user_id) {
  let body = {
    post_id: post_id,
    user_id: user_id,
  };

  return fetch(`${serverURL}/api/post/unlike`, {
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

export function deletePost(post_id) {
  let body = {
    post_id: post_id,
  };

  return fetch(`${serverURL}/api/post/delete`, {
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

export function deletePostsByUser(user_id) {
  let body = {
    user_id: user_id,
  };

  return fetch(`${serverURL}/api/post/deleteByUser`, {
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
