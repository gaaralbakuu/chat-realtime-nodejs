import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";

function UsersConnected({
  handleCloseUsers = () => {},
  handleJoinRoom = () => {},
}) {
  const { users } = useSelector((state) => state.main);
  const user = useSelector((state) => state.user);

  return (
    <div className="absolute inset-0 bg-black/5 z-[999] backdrop-blur-[1px] flex justify-center items-center p-10">
      <div className="max-w-md w-full bg-white rounded-xl shadow border border-solid border-gray-200 flex flex-col max-h-full">
        <div className="flex justify-between border-b border-solid border-gray-200">
          <div className="font-medium px-3 pb-4 py-5 text-2xl leading-3">
            Users conneceted ({users.length})
          </div>
          <div>
            <div className="px-2 flex items-center justify-center h-full">
              <div
                className="cursor-pointer hover:bg-gray-300 rounded-lg p-1 text-gray-600"
                onClick={handleCloseUsers}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 py-2 flex-1 relative overflow-auto">
          <div className="inset-0">
            {users.map((item, index) => {
              const isYou = item.id === user.id;

              return (
                <div
                  key={index}
                  className={`flex gap-3 p-3 ${
                    isYou ? "bg-blue-400/20 rounded-lg" : ""
                  }`}
                >
                  <div>
                    <div className="w-12 h-12">
                      <div className="w-full h-full rounded-full bg-red-400 text-white flex justify-center items-center">
                        {isYou ? "You" : item.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-around">
                    <div className="font-normal">
                      {isYou ? "You" : item.name}
                    </div>
                    <div className="flex">
                      {item.room ? (
                        <div className="bg-orange-500 rounded text-sm px-1 leading-3 pt-1 pb-0.5 text-white">
                          Joined Room
                        </div>
                      ) : (
                        <div className="bg-gray-500 rounded text-sm px-1 leading-3 pt-1 pb-0.5 text-white">
                          Idle
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {item.room && user.room !== item.room && (
                      <button
                        onClick={handleJoinRoom(item.room)}
                        className="bg-sky-500 hover:bg-sky-600 text-white px-2 rounded-lg text-sm flex items-center gap-1 py-0.5"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <div className="pt-0.5">
                          Join room {user.room !== item.room}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

UsersConnected.propTypes = {};

export default UsersConnected;
