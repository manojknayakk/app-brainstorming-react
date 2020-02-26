import React, {createContext, useReducer} from 'react';

const initialState = { 
  loggedIn: false, 
  Authentication: "",
  firstName: "",
  lastName: "",
  email: "",
  redirectUrl: ""
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case "login":
        console.log ("################################################")
        state.loggedIn = action.newState.loggedIn
        state.Authentication = action.newState.Authentication
        state.firstName = action.newState.firstName
        state.lastName = action.newState.lastName
        state.email = action.newState.email
        return state;
      case "setRedirectUrl":
        console.log ("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        state.redirectUrl = action.newState.redirectUrl
        return state;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }