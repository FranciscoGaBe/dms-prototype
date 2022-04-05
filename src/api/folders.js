import { makeFakeAPI, randomID } from "../utils/utils";

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

export const _getFolder = (id) => {
  if (!folders[id]) throw new Error("Folder not found");
  return folders[id];
};

export const getFolder = makeFakeAPI((id) => {
  const folder = { ..._getFolder(id) };
  return {
    ...folder,
    folder: folder.name,
    folders: Object.values(folders).filter(folder => folder.parent === id),
    files: []
  };
})

export const deleteFolder = makeFakeAPI((id) => {
  if (!folders[id]) throw new Error("Folder not found");
  delete folders[id];
  return true;
})

const setup = () => {
  const mainFolder = _addFolder("Explorer", null, "Explorer");
  mainFolder.modified = new Date(2022, 3, 5, 19, 54).getTime();
  const subFolder = _addFolder("Child folder", mainFolder.id);
  subFolder.modified = new Date(2022, 3, 5, 19, 56).getTime();
  subFolder.favorite = true;
};

setup();