import serverCall from "./serverCall";

export const getGenres = async (addAlert) => {
  try {
    const res = await serverCall("https://localhost:44341/api/genres");
    return res;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    })
  }
};

export const createGenre = async (name, addAlert) => {
  try {
    const res = await serverCall("https://localhost:44341/api/genres", { body: { name: name } });
    return res;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    })
  }
};
