import { makeFakeAPI } from "../utils/utils";

const templates = {
  "Supplier": {
    name: "Supplier",
    metadata: ["Client", "Address", "Phone Number", "Expedition", "Total"]
  },
  "Image": {
    name: "Image",
    metadata: []
  },
  "Copyright": {
    name: "Copyright",
    metadata: ["Copyright by", "Github", "LinkedIn"]
  }
};

export const getTemplates = makeFakeAPI(() => Object.values(templates));

export const getMetadata = makeFakeAPI(() => {
  const set = new Set();
  Object.values(templates).forEach(({ metadata }) => {
    metadata.forEach((name) => { set.add(name) });
  });
  return Array.from(set.values()).sort((a, b) => a > b ? 1 : -1);
});