import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import RenderAvatarConversation from "./RenderAvatarConversation";
import UsersInvite from "./UsersInvite";

function ConversationMessage({
  rooms = [],
  users = [],
  user = {},
  handleInvateJoinRoom = () => {},
}) {
  const [isShowUsers, setShowUsers] = useState(false);

  const handleShowUsers = () => {
    setShowUsers(true);
  };

  const handleCloseUsers = () => {
    setShowUsers(false);
  };

  const room = useMemo(() => {
    if (user.room)
      return rooms.filter((room) => room.id === user.room)[0] ?? {};
    return {};
  }, [rooms, user]);

  const isJoined = useMemo(() => user.room, [user]);

  useEffect(() => {
    console.log(room);
  }, [room]);

  const getUsers = useCallback(
    (list) => {
      if (list)
        return list.map((userId) => {
          return users.find((user) => user.id === userId).name ?? "";
        });
      return [];
    },
    [rooms, users]
  );

  return (
    <>
      {isShowUsers && (
        <UsersInvite
          users={users}
          user={user}
          room={room}
          handleCloseUsers={handleCloseUsers}
          handleInviteJoinRoom={handleInvateJoinRoom}
        />
      )}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex flex-col">
          {isJoined && (
            <div className="border-b border-solid border-gray-300">
              <div className="flex px-3 py-2 gap-2 justify-between">
                <div className="flex gap-2 flex-1">
                  <div>
                    <div className="w-12 h-12">
                      <RenderAvatarConversation list={getUsers(room.users)} />
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute inset-0 flex flex-col justify-around">
                      <div className="font-normal truncate">{room.users}</div>
                      <div className="flex">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
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
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>
                          <div className="leading-3 pt-1">
                            {room.users?.length} member
                            {room.users?.length > 1 ? "s" : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className="p-1 hover:bg-gray-300 rounded-lg cursor-pointer"
                    onClick={handleShowUsers}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

ConversationMessage.propTypes = {};

export default ConversationMessage;
