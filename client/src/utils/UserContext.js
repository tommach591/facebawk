import { useContext, createContext, useState, useEffect } from "react";
import { getProfile } from "./Profile";

const UserContext = createContext();
const UserUpdateContext = createContext();
const UserDataContext = createContext();
const UserDataUpdateContext = createContext();
const RefreshContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserUpdateContext);
}

export function useUserData() {
  return useContext(UserDataContext);
}

export function useUserDataUpdate() {
  return useContext(UserDataUpdateContext);
}

export function useRefresh() {
  return useContext(RefreshContext);
}

export function UserProvider({ children }) {
  if (!sessionStorage.getItem("id")) sessionStorage.setItem("id", "");

  const [user, setUser] = useState(sessionStorage.getItem("id"));
  const [userData, setUserData] = useState({});

  function changeUser(newUser) {
    setUser(newUser);
    setUserData({});
    sessionStorage.setItem("id", newUser);
  }

  function updateUserData(newUserData) {
    setUserData(JSON.parse(JSON.stringify(newUserData)));
  }

  function refreshUserData() {
    if (user !== "")
      getProfile(user).then((res) => {
        res ? setUserData(res) : setUserData({});
      });
  }

  useEffect(() => {
    if (user !== "")
      getProfile(user).then((res) => {
        res ? setUserData(res) : setUserData({});
      });
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={changeUser}>
        <UserDataContext.Provider value={userData}>
          <UserDataUpdateContext.Provider value={updateUserData}>
            <RefreshContext.Provider value={refreshUserData}>
              {children}
            </RefreshContext.Provider>
          </UserDataUpdateContext.Provider>
        </UserDataContext.Provider>
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
