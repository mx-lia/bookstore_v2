import serverCall from "./serverCall";

export const getAuthors = async (addAlert) => {
  try {
    const res = await serverCall("https://localhost:44341/api/authors");
    return res;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    })
  }
};

export const createAuthor = async (value, addAlert) => {
  try {
    const values = value.split(" ", 2);
    const res = await serverCall("https://localhost:44341/api/authors", {
      body: { firstName: values[0], lastName: values[1] },
    });
    return res;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    })
  }
};
