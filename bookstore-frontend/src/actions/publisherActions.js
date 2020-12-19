import serverCall from "./serverCall";

export const getPublishers = async (addAlert) => {
  try {
    const res = await serverCall("https://localhost:44341/api/publishers");
    return res;
  } catch (err) {
    addAlert({ type: "danger", 
 message: err.message});
  }
};

export const createPublisher = async (name, addAlert) => {
  try {
    const res = await serverCall("https://localhost:44341/api/publishers", { body: { name: name } });
    return res;
  } catch (err) {
    addAlert({ type: "danger", 
 message: err.message});
  }
};
