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
  expirationHours = 5
) => {
  try {
    const serializedState = encodeURIComponent(JSON.stringify(state));
 
    // Calculate expiration date (5 hours from now)
    const expirationDate = new Date();
    expirationDate.setTime(
      expirationDate.getTime() + expirationHours * 60 * 60 * 1000
    );
 
    // Set cookie with path and expiration
    document.cookie = `state=${serializedState}; expires=${expirationDate.toUTCString()}; path=/`;
  } catch {
    return undefined;
  }
};


export const loadUserDetails =()=>{
  try {
    const serializedState = localStorage.getItem("user");
    if(serializedState===null){
      return undefined;
    }
    return JSON.parse(serializedState);
    
  } catch  {

    return undefined

    
  }

}

export const savedUserState =(state={id:"", userName:"", email:""})=>{

  try {
    const serializedState = localStorage.setItem("user", JSON.stringify(state))
    return serializedState
    
  } catch  {

    return undefined
    
  }

}