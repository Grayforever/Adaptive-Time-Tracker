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