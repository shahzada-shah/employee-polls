import { LOGOUT_AUTHED_USER, SET_AUTHED_USER } from "../actions/authedUser";

// Reducer for authenticated users
export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.authedUser; // Set the authenticated user
    case LOGOUT_AUTHED_USER:
      return null; // Logout the user
    default:
      return state; // Default state
  }
}