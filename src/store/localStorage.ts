/**
 * Gets a cookie by name
 */
export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

/**
 * Retrieves state from cookies
 */
export const LocalState = () => {
  try {
    const serializedState = getCookie("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(decodeURIComponent(serializedState));
  } catch {
    return undefined;
  }
};

/**
 * Saves state to cookies with a default expiration of 7 days
 */
export const saveState = (
  state = { access: "", refresh: "" },
  expirationDays = 7
) => {
  try {
    const serializedState = encodeURIComponent(JSON.stringify(state));

    // Calculate expiration date
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    // Set cookie with path and expiration
    document.cookie = `state=${serializedState}; expires=${expirationDate.toUTCString()}; path=/`;
    console.log("hi");
  } catch {
    return undefined;
  }
};
