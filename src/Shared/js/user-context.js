import * as React from "react";

const UserContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "login": {
      localStorage.setItem("user", JSON.stringify(action.user));
      return {
        user: action.user,
        loggedIn: true,
        genres: action.user.genres,
      };
    }
    case "logout": {
      localStorage.removeItem("user");
      return { user: {}, loggedIn: false, genres: {} };
    }
    case "genres": {
      return {
        user: { ...state.user, Genres: action.genres },
        loggedIn: true,
        Genres: action.genres,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    user: JSON.parse(localStorage.getItem("user")),
  });
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
