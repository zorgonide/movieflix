import * as React from "react";

const UserContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "login": {
      return { user: action.user, loggedIn: true, location: {} };
    }
    case "logout": {
      return { user: {}, loggedIn: false, location: {} };
    }
    case "location": {
      return { user: state.user, loggedIn: true, location: action.location };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, { user: false });
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
export { UserProvider, useUser };
