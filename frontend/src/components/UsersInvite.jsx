import React, { useMemo } from "react";

function UsersInvite({
  users = [],
  user = {},
  room = {},
  handleCloseUsers = () => {},
  handleInviteJoinRoom = () => {},
}) {
  const list = useMemo(
    () => users.filter((_user) => _user.room !== room.id),
    [room, users]
  );

  return (
    <div className="absolute inset-0 bg-black/5 z-[999] backdrop-blur-[1px] flex justify-center items-center py-10">
      <div className="max-w-md w-full bg-white rounded-xl shadow border border-solid border-gray-200 flex flex-col max-h-full">
        <div className="flex justify-between border-b border-solid border-gray-200">
          <div className="font-medium px-3 pb-4 py-5 text-2xl leading-3">
            Invite Users
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
            {list.map((item, index) => {
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
                    {user.room !== item.room && (
                      <button
                        onClick={handleInviteJoinRoom(item.id, room.id)}
                        className="bg-sky-500 hover:bg-sky-600 text-white px-2 rounded-lg text-sm flex items-center gap-1 py-0.5"
                      >
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
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                          />
                        </svg>

                        <div className="pt-0.5">
                          Invite {user.room !== item.room}
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

export default UsersInvite;
