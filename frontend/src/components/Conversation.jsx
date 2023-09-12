import React, { memo, useCallback, useContext, useEffect } from "react";
// import 'react-virtualized/styles.css';
import PropTypes from "prop-types";
import { useState } from "react";
import UsersConnected from "./UsersConnected";
import ConversationLeftSide from "./ConversationLeftSide";
import ConversationMessage from "./ConversationMessage";
import ConversationConfirmInvate from "./ConversationConfirmInvate";
import { useSelector } from "react-redux";
import socketContext from "../contexts/socketContext";

function Conversation() {
  const { users, rooms } = useSelector((state) => state.main);
  const user = useSelector((state) => state.user);

  const socket = useContext(socketContext);

  const [isShowUsers, setShowUsers] = useState(false);
  const [isShowConfirm, setShowConfirm] = useState(false);
  const [userInvite, setUserInvite] = useState([]);

  const getUserById = (id) => {
    console.log(users, rooms);
    return users.find((_user) => _user.id === id) ?? {};
  };

  useEffect(() => {
    socket.on("invite-room", ({ roomId, userId }) => {
      const _user = getUserById(userId);
      console.log({ roomId, userId }, _user);
      setUserInvite((_userInvite) => {
        if (
          _userInvite.filter(
            (item) => item.user.id === userId && roomId === item.room,
          ).length === 0
        ) {
          return [
            ..._userInvite,
            {
              room: roomId,
              user: _user,
            },
          ];
        }
        return _userInvite;
      });
      setShowConfirm(true);
    });
    return () => {
      socket.off("invite-room");
    };
  }, [users]);

  const handleJoinRoom = (room) => {
    return () => {
      setUserInvite(userInvite.filter(_userInvite => _userInvite.room !== room))
      socket.emit("join-room", room);
    };
  };

  const handleShowUsers = () => {
    setShowUsers(true);
  };

  const handleCloseUsers = () => {
    setShowUsers(false);
  };

  const handleCloseConfirmInvite = () => {
    setShowConfirm(false);
  };

  return (
    <>
      {isShowUsers && (
        <UsersConnected
          users={users}
          user={user}
          handleCloseUsers={handleCloseUsers}
          handleJoinRoom={handleJoinRoom}
        />
      )}
      {isShowConfirm && (
        <ConversationConfirmInvate
          invites={userInvite}
          handleCloseConfirmInvite={handleCloseConfirmInvite}
          handleJoinRoom={handleJoinRoom}
        />
      )}
      <div className="max-w-7xl w-full h-full py-10 px-3">
        <div className="flex h-full border-2 border-solid border-gray-300 rounded-lg shadow overflow-hidden">
          <ConversationLeftSide
            handleShowUsers={handleShowUsers}
          />
          <ConversationMessage
          />
        </div>
      </div>
    </>
  );
}

Conversation.propTypes = {};

export default Conversation;
