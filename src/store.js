import { configureStore } from '@reduxjs/toolkit';
import authedUser from './reducers/authedUser';
import users from './reducers/users';
import questions from './reducers/questions';

/**
 * Configures and creates a Redux store using Redux Toolkit.
 *
 * The store integrates reducers for authenticated users, general users, and questions.
 *
 * @module store
 * @exports {Object} - The configured Redux store.
 */
export const store = configureStore({
  reducer: {
    authedUser,   // Reducer managing the state of authenticated users.
    users,       // Reducer managing the state of users.
    questions,   // Reducer managing the state of questions.
  },
});
