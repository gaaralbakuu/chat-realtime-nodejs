import React, { useCallback, useEffect } from "react";
// import 'react-virtualized/styles.css';
import PropTypes from "prop-types";
import { useState } from "react";
import UsersConnected from "./UsersConnected";
import ConversationLeftSide from "./ConversationLeftSide";
import ConversationMessage from "./ConversationMessage";
import ConversationConfirmInvate from "./ConversationConfirmInvate";

function Conversation({ user = {}, users = [], rooms = [], socketRef = null }) {
  const [isShowUsers, setShowUsers] = useState(false);
  const [isShowConfirm, setShowConfirm] = useState(false);
  const [userInvite, setUserInvite] = useState([]);

  const getUserById = useCallback(
    (id) => {
      console.log(id, users)
      return users.find((user) => user.id === id) ?? {};
    },
    [users]
  );

  useEffect(() => {
    socketRef.current.on("invite-room", ({ roomId, userId }) => {
      const user = getUserById(userId);
      setUserInvite((_userInvite) => {
        console.log(_userInvite);
        if (
          _userInvite.filter(
            (item) => item.user.id === userId && roomId === item.room
          ).length === 0
        ) {
          return [
            ..._userInvite,
            {
              room: roomId,
              user: user,
            },
          ];
        }
        return _userInvite;
      });
      setShowConfirm(true);
    });
  }, []);

  const handleCreateRoom = () => {
    socketRef.current.emit("create-room");
  };

  const handleJoinRoom = (room) => {
    return () => {
      socketRef.current.emit("join-room", room);
    };
  };

  const handleInvateJoinRoom = (userId, roomId) => {
    return () => {
      socketRef.current.emit("invite-room", { userId, roomId });
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
            rooms={rooms}
            users={users}
            user={user}
            handleCreateRoom={handleCreateRoom}
            handleShowUsers={handleShowUsers}
            handleJoinRoom={handleJoinRoom}
          />
          <ConversationMessage
            rooms={rooms}
            users={users}
            user={user}
            handleInvateJoinRoom={handleInvateJoinRoom}
          />
        </div>
      </div>
    </>
  );
}

Conversation.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  rooms: PropTypes.array.isRequired,
  socketRef: PropTypes.object.isRequired,
};

export default Conversation;
