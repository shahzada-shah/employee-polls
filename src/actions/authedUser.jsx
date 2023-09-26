// Action Types
export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT_AUTHED_USER = "LOGOUT_AUTHED_USER";

// Set the authenticated user
export const setAuthedUser = (authedUser) => ({
  type: SET_AUTHED_USER,
  authedUser,
});

// Logout the current user
export const logoutAuthedUser = () => ({ type: LOGOUT_AUTHED_USER });

// Authenticate and login a user based on provided username and password
export const handleLogin = (username, password) => (dispatch, getState) => {
  const matchingUser = Object.values(getState().users).find(
    (user) => user.id === username && user.password === password
  );

  if (matchingUser) {
    dispatch(setAuthedUser(matchingUser));
  }
};

// Handle the logout process
export const handleLogout = () => (dispatch) => dispatch(logoutAuthedUser());
