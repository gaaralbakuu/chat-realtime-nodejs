import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";

function SetupUsername({ username, setUsername, onConfirm, error }) {
  const [isShowError, setShowError] = useState(false);

  const handleClickEnter = (event) => {
    event.preventDefault();
    setShowError(true);
    onConfirm();
  };

  return (
    <div className="max-w-3xl w-full px-3">
      <h1 className="text-3xl font-normal mb-2">Welcome to conversation!</h1>
      <div className="mb-5">Set your username to get started</div>
      {isShowError && error && (
        <div className="mb-5 bg-red-100 border-2 border-solid border-red-100 text-red-700 max-w-sm w-full rounded-lg px-3 py-2 font-normal">
          {error}
        </div>
      )}
      <form onSubmit={handleClickEnter}>
        <div className="max-w-sm w-full border-2 border-solid border-gray-300 bg-gray-100 rounded-xl mb-5">
          <input
            type="text"
            className="outline-none px-3 py-2 rounded-xl w-full bg-transparent font-light"
            placeholder="Username"
            spellCheck={false}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <button
          className="max-w-sm w-full outline-none rounded-xl px-3 py-2 relative bg-[#1cb0f6] text-white font-medium shadow-[0_4px_0_#1899d6] active:shadow-[0_0_0] active:top-1"
          onClick={handleClickEnter}
        >
          Enter
        </button>
      </form>
    </div>
  );
}

SetupUsername.propTypes = {
  username: PropTypes.string,
  setUsername: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default SetupUsername;
