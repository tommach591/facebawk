import { getAllAccount } from "./Account";
import { getAllProfile } from "./Profile";
import { getAllPost } from "./Post";

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function printDatabase() {
  getAllAccount().then((res) => console.log("Account", res));
  getAllProfile().then((res) => console.log("Profile", res));
  getAllPost().then((res) => console.log("Post", res));
}
