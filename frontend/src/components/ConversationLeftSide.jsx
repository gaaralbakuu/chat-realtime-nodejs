import React, { useCallback, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "react-virtualized/styles.css";
import RenderAvatarConversation from "./RenderAvatarConversation";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import Scrollbars from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import socketContext from "../contexts/socketContext";

function ConversationLeftSide({ handleShowUsers = () => {} }) {
  const socket = useContext(socketContext);
  const { users, rooms } = useSelector((state) => state.main);
  const user = useSelector((state) => state.user);

  const listRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    if (listRef.current)
      listRef.current.Grid._scrollingContainer = scrollRef.current.view;
  }, []);

  const handleScroll = (e) => {
    if (listRef.current) listRef.current.Grid._onScroll(e);
  };

  const getUsersByRoom = useCallback(
    (index) => {
      return rooms[index].users.map(
        (userId) => users.find((user) => user.id === userId).name ?? "",
      );
    },
    [rooms, users],
  );

  const handleCreateRoom = () => {
    socket.emit("create-room");
  };

  const handleJoinRoom = (room) => {
    return () => {
      socket.emit("join-room", room);
    };
  };

  const rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => (
    <div
      className={`flex p-3 gap-3 mb-2 select-none ${
        rooms[index].id === user.room ? "bg-blue-500/10" : ""
      }`}
      key={key}
      style={style}
      onClick={handleJoinRoom(rooms[index].id)}
    >
      <div>
        <div className="w-12 h-12 rounded-full">
          <RenderAvatarConversation list={getUsersByRoom(index)} />
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex flex-col justify-between">
          <div className="flex justify-between items-center gap-2">
            <div className="truncate overflow-hidden flex-1 text-lg">
              {getUsersByRoom(index).join(", ")}
            </div>
            <div className="text-gray-400 text-sm">5min ago</div>
          </div>
          <div className="text-sm text-gray-400">Last message</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-[400px] flex flex-col border-r border-solid border-gray-300">
      <div className="flex flex-col border-b border-solid border-gray-200 pb-2">
        <div className="flex justify-between items-center">
          <div className="pl-3 pt-3">
            <h1 className="text-2xl font-medium">Conversation</h1>
            <div
              className="flex gap-2 items-center cursor-pointer text-gray-600 hover:text-blue-500"
              onClick={handleShowUsers}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <div className="flex items-center font-normal">
                {users.length} users connected
              </div>
            </div>
          </div>
          <div className="pr-3">
            <div
              onClick={handleCreateRoom}
              className="cursor-pointer hover:bg-gray-300 p-1 rounded-lg"
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="absolute inset-0 space-y-2">
          <AutoSizer className="!w-full !h-full">
            {({ height, width }) => (
              <Scrollbars
                ref={scrollRef}
                onScroll={handleScroll}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                renderThumbVertical={({ style, ...props }) => (
                  <div
                    {...props}
                    style={{
                      ...style,
                      backgroundColor: "rgb(131 131 131 / 50%)",
                      borderRadius: 3,
                    }}
                  />
                )}
                renderTrackVertical={({ style, ...props }) => (
                  <div
                    {...props}
                    style={{
                      ...style,
                      right: 2,
                      bottom: 2,
                      top: 2,
                      zIndex: 99,
                      width: 4,
                    }}
                  />
                )}
              >
                {rooms.length ? (
                  <List
                    style={{ overflowX: "visible", overflowY: "visible" }}
                    width={width}
                    height={height}
                    rowCount={rooms.length}
                    rowHeight={80}
                    rowRenderer={rowRenderer}
                    ref={listRef}
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center text-gray-400">
                    Empty room
                  </div>
                )}
              </Scrollbars>
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
}

ConversationLeftSide.propTypes = {};

export default ConversationLeftSide;
