import { makeFakeAPI } from "../utils/utils";

const templates = {
  "Supplier": {
    name: "Supplier",
    metadata: ["Client", "Address", "Phone Number", "Expedition", "Total"]
  },
  "Image": {
    name: "Image",
    metadata: []
  }
};

export const getTemplates = makeFakeAPI(() => Object.values(templates));