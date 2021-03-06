import { makeFakeAPI, randomID } from "../utils/utils";
import { _addFile, _getFiles, _searchFiles } from "./files";

const folders = {};

export const _addFolder = (name, parent, id = randomID()) => {
  if (!name) throw new Error("Name cannot be empty");
  if (parent && !folders[parent]) throw new Error("Parent folder not found");
  const folder = {
    id,
    name,
    parent,
    modified: new Date().getTime(),
    favorite: false,
  };
  folders[id] = folder;
  return folder;
};

export const addFolder = makeFakeAPI(_addFolder);

export const _getFolder = (id, query = {}) => {
  if (id === '@Search') {
    return {
      id: "@Search",
      name: "Search",
      parent: null,
      folders: [],
      files: _searchFiles(query)
    };
  };
  if (!folders[id]) throw new Error("Folder not found");
  return folders[id];
};

export const getFolder = makeFakeAPI((id, query) => {
  const folder = { ..._getFolder(id, query) };
  return {
    folder: folder.name,
    folders: Object.values(folders).filter(folder => folder.parent === id),
    files: _getFiles(folder.id),
    parentName: folder.parent ? folders[folder.parent].name : null,
    ...folder
  };
})

export const deleteFolder = makeFakeAPI((id) => {
  if (!folders[id]) throw new Error("Folder not found");
  delete folders[id];
  return true;
})

export const _getFavoriteFolders = () => Object.values(folders).filter(folder => folder.favorite);

const setup = () => {
  const mainFolder = _addFolder("Home", null, "@Home");
  mainFolder.modified = new Date(2022, 3, 5, 19, 54).getTime();
  const subFolder = _addFolder("Child folder", mainFolder.id);
  subFolder.modified = new Date(2022, 3, 5, 19, 56).getTime();
  subFolder.favorite = true;
  const file = _addFile(new File(["© Francisco Garrido Bear"], "Copyright.txt", {
    type: "text/plain",
  }), mainFolder.id);
  file.favorite = true;
  file.versions[0].modifiedBy = "Francisco Garrido";
  file.versions[0].date = new Date(2022, 3, 5, 19, 58).getTime();
  file.metadata = [
    { name: "Copyright by", value: "Francisco Garrido" },
    { name: "Github", value: "https://github.com/FranciscoGaBe/dms-prototype", link: true },
    { name: "LinkedIn", value: "https://www.linkedin.com/in/francisco-garrido-679084198/", link: true }
  ]
};

setup();