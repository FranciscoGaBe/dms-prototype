import { makeFakeAPI, randomID } from "../utils/utils"

const files = {}

export const _addFile = (file, parent, metadata = []) => {
  const newFile = {
    id: randomID(),
    name: file.name,
    parent,
    size: file.size,
    version: 1,
    created: new Date().getTime(),
    modified: new Date().getTime(),
    favorite: false,
    file,
    versions: [
      {
        version: 1,
        status: "active",
        modifiedBy: "Admin",
        date: new Date().getTime(),
        file
      }
    ],
    metadata
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

export const addVersion = makeFakeAPI((id, file) => {
  if (!files[id]) throw new Error("File not found");
  files[id].versions[0].status = "expiring";
  files[id].version += 1;
  files[id].versions.unshift({
    version: files[id].version,
    status: "active",
    modifiedBy: "Admin",
    date: new Date().getTime(),
    file
  });
  return files[id];
});

export const downloadVersion = makeFakeAPI((id, version) => {
  if (!files[id]) throw new Error("File not found");
  const len = files[id].versions.length;
  return files[id].versions[len - version].file;
});

export const _searchFiles = query => {
  return Object.values(files).filter(file => {
    return file.metadata.some(({ name, value }) => {
      const metadata = query[name];
      if (!metadata) return false;
      return value.toLowerCase().includes(metadata.toLowerCase());
    });
  });
};

export const setMetadata = makeFakeAPI((id, name, value) => {
  if (!files[id]) throw new Error("File not found");
  const metadata = files[id].metadata.find(m => m.name === name);
  if (!metadata) throw new Error("Data not found");
  metadata.value = value;
  return metadata;
})

export const getFileInfo = getFile;

export const getFileVersions = getFile;

export const getFileMetadata = getFile;