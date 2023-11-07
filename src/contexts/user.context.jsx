import { createContext, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
// as the actual value you want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducder = (state, action) => {
  const { type, payload} = action

  switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER :
      return {
        ...state,
        currentUser: payload
      }
    default: 
    throw new Error(`Unhandled type ${type } in the userReducer`)
  }
}

const INITIAL_STATE = {
  currentUser: null
}

//the provider component wraps around any children you want to render
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [ {currentUser}, dispatch] = useReducer(userReducder, INITIAL_STATE)

  const setCurrentUser = (user) =>{
    dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
  }

  
  const value = { currentUser, setCurrentUser };

  useEffect(()=>{
    const unsubscribe = onAuthStateChangedListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user)
        }
        setCurrentUser(user)
    })
    return unsubscribe
  },[])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};