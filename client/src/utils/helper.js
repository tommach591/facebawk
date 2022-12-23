import { getAllAccount } from "./Account";
import { getAllProfile } from "./Profile";
import { getAllPost } from "./Post";

export function printDatabase() {
  getAllAccount().then((res) => console.log("Account", res));
  getAllProfile().then((res) => console.log("Profile", res));
  getAllPost().then((res) => console.log("Post", res));
}
