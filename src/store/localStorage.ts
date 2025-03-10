export const LocalState = () => {
  try {
    const SerializedState = localStorage.getItem("state");
    if (SerializedState === null) {
      return undefined;
    }
    return JSON.parse(SerializedState);
  } catch {
    return undefined;
  }
};
export const saveState = (state = { access: "", refresh: "" }) => {
  try {
    const SerializedState = JSON.stringify(state);

    localStorage.setItem("state", SerializedState);
  } catch {
    return undefined;
  }
};
