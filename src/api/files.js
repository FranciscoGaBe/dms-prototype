import { makeFakeAPI, randomID } from "../utils/utils"

const files = {}

export const _addFile = (file, parent) => {
  const newFile = {
    id: randomID(),
    name: file.name,
    parent,
    size: file.size,
    version: 1,
    created: new Date().getTime(),
    modified: new Date().getTime(),
    favorite: false,
    file
  };
  files[newFile.id] = newFile;
  return newFile;
};

export const addFile = makeFakeAPI(_addFile);

export const getFile = makeFakeAPI((id) => {
  if (!files[id]) throw new Error("File not found");
  return {
    ...files[id],
    tabs: ["info", "data", "version", "metadata"]
  };
});

export const _getFiles = (parent) => Object.values(files).filter(file => file.parent === parent);