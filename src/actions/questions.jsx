import { saveQuestion, saveQuestionAnswer } from "../util/api";
import { addAnswerUser, addQuestionUser } from "./users";

// Action Types
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

/**
 * Action creator to receive questions.
 *
 * @param {Object} questions - The questions to be received.
 * @returns {Object} - The action object.
 */
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

/**
 * Action creator to add a question.
 *
 * @param {Object} question - The question to be added.
 * @returns {Object} - The action object.
 */
function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

/**
 * Action creator to add an answer to a question.
 *
 * @param {string} author - ID of the user answering the question.
 * @param {string} qid - ID of the question being answered.
 * @param {string} answer - The answer provided by the user.
 * @returns {Object} - The action object.
 */
function addAnswerQuestion(author, qid, answer) {
  return {
    type: ADD_ANSWER_QUESTION,
    author,
    qid,
    answer,
  };
}

/**
 * Thunk to handle the addition of a question.
 * Calls the API to save the question and dispatches actions
 * to update the state accordingly.
 *
 * @param {string} firstOption - Text for the first option of the question.
 * @param {string} secondOption - Text for the second option of the question.
 * @returns {Function} - Dispatch function.
 */
export function handleAddQuestion(firstOption, secondOption) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestion(firstOption, secondOption, authedUser).then(
      (question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionUser(question));
      }
    );
  };
}

/**
 * Thunk to handle the addition of an answer to a question.
 * Calls the API to save the answer and dispatches actions
 * to update the state accordingly.
 *
 * @param {string} questionId - ID of the question being answered.
 * @param {string} answer - The answer provided by the user.
 * @returns {Function} - Dispatch function.
 */
export function handleAddAnswer(questionId, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestionAnswer(authedUser.id, questionId, answer).then(() => {
      dispatch(addAnswerQuestion(authedUser.id, questionId, answer));
      dispatch(addAnswerUser(authedUser.id, questionId, answer));
    });
  };
}
