// Required Redux and React dependencies
import { connect } from "react-redux";

// Component imports
import DashboardHeader from "./DashboardHeader";
import QuestionSection from "./QuestionSection";
import Footer from "../../components/Footer";

/**
 * Dashboard component that displays the main poll interface.
 *
 * This component fetches and displays unanswered and answered questions
 * based on the authenticated user's interactions. The list of questions
 * and user details are passed as props from the Redux store.
 *
 * @param {Object} authedUser - The authenticated user object from the Redux store.
 * @param {Array} questions - The list of question objects from the Redux store.
 * @param {Object} users - The list of user objects from the Redux store.
 */
const Dashboard = ({ authedUser, questions, users }) => {
  // Helper function to filter unanswered questions for the authenticated user
  const unanswered = (question) =>
    !question.optionOne.votes.includes(authedUser.id) &&
    !question.optionTwo.votes.includes(authedUser.id);

  // Helper function to filter answered questions for the authenticated user
  const answered = (question) =>
    question.optionOne.votes.includes(authedUser.id) ||
    question.optionTwo.votes.includes(authedUser.id);

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl text-center py-[100px] px-12 ">
          <DashboardHeader />
          <QuestionSection
            title="Dive into Open Discussions [ Unanswered ]"
            subtitle="Explore unanswered polls and share your thoughts..."
            questions={questions}
            users={users}
            filterFunction={unanswered}
            isAnswered={false}
          />
          <QuestionSection
            title="Insights from Past Discussions [ Answered ]"
            subtitle="Browse through answered polls and gain insights..."
            questions={questions}
            users={users}
            filterFunction={answered}
            isAnswered={true}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

/**
 * Redux mapStateToProps function to extract the required data from the state.
 *
 * This function maps the state's authedUser, questions, and users to the
 * component's props for easy access. The list of questions is sorted
 * by their timestamp to maintain a consistent order.
 *
 * @param {Object} state - The Redux store/state.
 * @returns {Object} Props derived from the state.
 */
const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

// Connecting the Dashboard component to the Redux store using connect() from 'react-redux'
export default connect(mapStateToProps)(Dashboard);