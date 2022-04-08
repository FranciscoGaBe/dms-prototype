import { makeFakeAPI } from "../utils/utils"
import { _getFavoriteFiles } from "./files";
import { _getFavoriteFolders } from "./folders";

const users = {
  admin: {
    username: "admin",
    password: "admin",
    initials: "A",
    name: "Admin",
    favorites: [
      ..._getFavoriteFolders().map(folder => ({
        ...folder,
        type: 'folder'
      })),
      ..._getFavoriteFiles().map(file => ({
        ...file,
        type: 'file'
      }))
    ]
  }
};

export const login = makeFakeAPI((username, password) => {
  if (!users[username]) throw new Error("Incorrect username");
  if (users[username].password !== password) throw new Error("Incorrect password");
  return true;
})

export const getUser = makeFakeAPI((username) => users[username])