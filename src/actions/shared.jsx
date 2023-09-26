import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { getInitialData } from "../util/api";

/**
 * Thunk action creator to handle the initial data load.
 * Fetches users and questions from the API and dispatches actions 
 * to store them in the redux state.
 * 
 * @returns {Function} - Dispatch function.
 */
export function handleInitialData() {
    return (dispatch) => {
        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
        });
    };
}
