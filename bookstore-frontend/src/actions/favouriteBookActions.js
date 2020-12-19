import serverCall from "./serverCall";

export const getFavourites = async (addAlert) => {
  try {
    const res = await serverCall(`https://localhost:44341/api/favourites`);
    return res;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    })
  }
};

export const createFavourite = async (isbn, addAlert) => {
  try {
    const res = await serverCall(`https://localhost:44341/api/favourites`, { body: { isbn: isbn } });
    return res;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    })
  }
};

export const deleteFavourite = async (isbn, addAlert) => {
  try {
    const res = await serverCall(`https://localhost:44341/api/favourites/${isbn}`, { method: "DELETE" });
    return res;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    })
  }
};
