import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStateJoining, setStateUsername } from "../store/reducers/main";
import toast from "react-hot-toast";

function SetupUsername() {
  const {
    state: { username },
  } = useSelector((state) => state.main);

  const dispatch = useDispatch();

  const handleClickEnter = (event) => {
    event.preventDefault();
    handleClickEnterJoin();
  };

  function checkingUsernameValid(username) {
    if (username === "") {
      return "Please enter a username";
    } else if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }
    return "";
  }

  const handleClickEnterJoin = (event) => {
    const validate = checkingUsernameValid(username);
    if (validate) {
      toast(validate, {
        type: "error",
        position: "top-center",
        duration: 3000,
      });
    } else {
      dispatch(setStateJoining(true));
      toast("Choose username success", {
        type: "success",
        position: "top-center",
        duration: 3000,
      });
    }
  };

  const handleSetStateUsername = (e) => {
    dispatch(setStateUsername(e.target.value));
  };

  return (
    <div className="max-w-3xl w-full px-3">
      <h1 className="text-3xl font-normal mb-2">Welcome to conversation!</h1>
      <div className="mb-5">Set your username to get started</div>
      <form onSubmit={handleClickEnter}>
        <div className="max-w-sm w-full border-2 border-solid border-gray-300 bg-gray-100 rounded-xl mb-5">
          <input
            type="text"
            className="outline-none px-3 py-2 rounded-xl w-full bg-transparent font-light"
            placeholder="Username"
            spellCheck={false}
            value={username}
            onChange={handleSetStateUsername}
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

SetupUsername.propTypes = {};

export default SetupUsername;
