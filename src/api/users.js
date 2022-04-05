import { makeFakeAPI } from "../utils/utils"

const users = {
  admin: {
    username: "admin",
    password: "admin"
  }
};

export const login = makeFakeAPI((username, password) => {
  if (!users[username]) throw new Error("Incorrect username");
  if (users[username].password !== password) throw new Error("Incorrect password");
  return true;
})