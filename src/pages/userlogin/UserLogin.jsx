import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";

import { handleLogin } from "../../actions/authedUser";

// Individual input component for the login form
const LoginInput = ({ id, type, value, onChange, placeholder }) => (

  <>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {id && id.charAt(0).toUpperCase() + id.slice(1)}
    </label>
    <input
      value={value}
      onChange={onChange}
      type={type}
      name={id}
      id={id}
      placeholder={placeholder}
      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      required
    />
  </>
);

// Main login component
const UserLogin = ({ dispatch, loggedIn }) => {
  // State for username and password
  const [username, setUsername] = useState("sarahedo");
  const [password, setPassword] = useState("password123");

  // If user is logged in, redirect them
  if (loggedIn) {
    const redirectUrl = new URLSearchParams(window.location.search).get(
      "redirectTo"
    );
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white"
        >
          Employee Polls
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <LoginInput
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="name@company.com"
              />
              <LoginInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(({ authedUser }) => ({ loggedIn: !!authedUser }))(
  UserLogin
);