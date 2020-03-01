import React, {createContext, useReducer} from 'react';

const initialState = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : { 
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
        const newLoginState = {}
        newLoginState.loggedIn = action.newState.loggedIn
        newLoginState.Authentication = action.newState.Authentication
        newLoginState.firstName = action.newState.firstName
        newLoginState.lastName = action.newState.lastName
        newLoginState.email = action.newState.email
        newLoginState.redirectUrl = state.redirectUrl
        window.localStorage.setItem('user', JSON.stringify(newLoginState));
        return newLoginState;
      case "logout":
        const newLogoutState = {}
        newLogoutState.loggedIn = false
        newLogoutState.Authentication = ""
        newLogoutState.firstName = ""
        newLogoutState.lastName = ""
        newLogoutState.email = ""
        newLogoutState.redirectUrl = ""
        window.localStorage.clear();
        return newLogoutState;
      case "setRedirectUrl":
        state.redirectUrl = action.newState.redirectUrl
        return state;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }