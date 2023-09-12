import React from "react";
import PropTypes from "prop-types";

function ConversationConfirmInvate({
  invites = [],
  handleCloseConfirmInvite = () => {},
  handleJoinRoom = () => {},
}) {
  return (
    <div className="absolute inset-0 bg-black/5 z-[1000] backdrop-blur-[1px] flex justify-center items-center p-10">
      <div className="max-w-md w-full bg-white rounded-xl shadow border border-solid border-gray-200 flex flex-col max-h-full">
        <div className="flex justify-between border-b border-solid border-gray-200">
          <div className="font-medium px-3 pb-4 py-5 text-2xl leading-3">
            Confirm Invite Join Room ({invites.length})
          </div>
          <div>
            <div className="px-2 flex items-center justify-center h-full">
              <div
                className="cursor-pointer hover:bg-gray-300 rounded-lg p-1 text-gray-600"
                onClick={handleCloseConfirmInvite}
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
            {invites.length ? (
              invites.map((item, index) => {
                return (
                  <div key={index} className={`flex gap-3 p-3`}>
                    <div>
                      <div className="w-12 h-12">
                        <div className="w-full h-full rounded-full bg-red-400 text-white flex justify-center items-center">
                          {item.user.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-around">
                      <div className="font-normal">
                        {item.user.name} invite you join room
                      </div>
                      <div className="flex">ID Room: {item.room}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <div className="p-1 rounded-lg hover:bg-green-500 hover:text-white cursor-pointer text-green-500" onClick={handleJoinRoom(item.room)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-2 text-center">
                There are no users to invite
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ConversationConfirmInvate.propTypes = {};

export default ConversationConfirmInvate;
