export const addAlert = (dispatch) => ({ type: type, message: message }) => {
    dispatch({ type: "ADD", payload: { type: type, message: message, } });
};

export const removeAlert = (dispatch) => (id) => {
    dispatch({ type: "REMOVE", payload: { id: id } });
};