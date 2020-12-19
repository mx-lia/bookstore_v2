import serverCall from "./serverCall";

async function modifyData(values) {
  for (let key in values) {
    switch (key) {
      case "authors":
        for (let i in values[key]) {
          values.authors[i] = values[key][i].value;
        }
        break;
      case "publishers":
        for (let i in values[key]) {
          values.publishers[i] = values[key][i].value;
        }
        break;
      case "genres": {
        for (let i in values[key]) {
          values.genres[i] = values[key][i].value;
        }
        break;
      }
      case "cover":
        break;
      default:
        break;
    }
  }
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  if (values.cover) {
    values.cover = await toBase64(values.cover);
  }
}

export const getBooks = async (params, addAlert) => {
  try {
    let url = "https://localhost:44341/api/books?";
    for (let key in params) {
      if (params[key]) url += `${key}=${params[key]}&`;
    }
    const res = await serverCall(url);
    const books = res.books?.map((element) => ({
      ...element,
      src: element.bookCover
        ? "data:image/jpg;base64," + element.bookCover.image
        : null,
    }));
    let pages = [];
    for (let i = 1; i <= res.pages; i++) {
      pages.push(i);
    }
    return { ...res, pages, books };
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};

export const getCount = async (addAlert) => {
  try {
    const res = await serverCall(`https://localhost:44341/api/books/count`);
    return res;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};

export const getBook = async (isbn, addAlert) => {
  try {
    const res = await serverCall(`https://localhost:44341/api/books/${isbn}`);
    return {
      ...res,
      src: res.bookCover
        ? "data:image/jpg;base64," + res.bookCover.image
        : null,
    };
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};

export const createBook = async (values, addAlert) => {
  try {
    await modifyData(values);
    const res = await serverCall("https://localhost:44341/api/books", {
      body: values,
    });
    return res;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};

export const updateBook = async (values, addAlert) => {
  try {
    await modifyData(values);
    const res = await serverCall(`https://localhost:44341/api/books/${values.isbn}`, {
      method: "PUT",
      body: values,
    });
    return res;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};

export const deleteBook = async (isbn, addAlert) => {
  try {
    const res = await serverCall(`https://localhost:44341/api/books/${isbn}`, { method: "DELETE" });
    return res;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};
