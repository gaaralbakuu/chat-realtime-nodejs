const initialData = {
    rooms: [],
    users: [],
  };
  
  function handleUserConnected(userId) {
    let tempUsers = initialData.users;
    let index = tempUsers.findIndex((_user) => _user.id === userId);
    if (index === -1) {
      tempUsers.push({
        id: userId,
        name: null,
        room: null,
      });
      index = tempUsers.findIndex((_user) => _user.id === userId);
      initialData.users = tempUsers;
    }
    return index;
  }
  
  function handleUserDisconnected(user) {
    let tempUsers = initialData.users;
    const index = tempUsers.findIndex((_user) => _user.id === user.id);
    if (index > -1) {
      initialData.users = tempUsers.filter((_user) => _user.id !== user.id);
    }
  }
  
  function getCurrentUser(currentId) {
    if (initialData.users[currentId]) {
      return initialData.users[currentId];
    } else {
      return null;
    }
  }
  
  function handleSetUsername(io, socket, user, username) {
    user.name = username;
    let tempUsers = initialData.users;
    const index = tempUsers.findIndex((_user) => _user.id === user.id);
    if (index > -1) {
      tempUsers[index] = user;
      initialData.users = tempUsers;
      io.emit("status-users", initialData.users);
      io.to(user.id).emit("status-user", user);
    }
  
    console.log(`\x1b[35m[${user.name}]\x1b[0m has set username: \x1b[33m${username}\x1b[0m`);
  }
  
  function handleCreateRoom(io, socket, user) {
    const id = uniqid();
  
    const baseRoom = {
      id: id,
      users: [user.id],
      messages: [],
    };
  
    let tempRoom = initialData.rooms;
    tempRoom.push(baseRoom);
    initialData.rooms = tempRoom;
  
    io.emit("status-rooms", initialData.rooms);
    user.room = id;
    socket.join(id);
    io.emit("status-users", initialData.users);
    io.to(user.id).emit("status-user", user);
  
    console.log(`\x1b[35m[${user.name}]\x1b[0m create a new room with id: \x1b[33m${id}\x1b[0m`);
  }
  
  function handleJoinRoom(io, socket, user, roomId) {
    let tempRoom = initialData.rooms;
    const index = tempRoom.findIndex((item) => item.id === roomId);
    if (index > -1) {
      if (
        tempRoom[index].users.findIndex((userId) => userId === user.id) === -1
      ) {
        tempRoom[index].users.push(user.id);
        initialData.rooms = tempRoom;
        io.emit("status-rooms", initialData.rooms);
      }
  
      user.room = roomId;
      socket.join(roomId);
      io.emit("status-users", initialData.users);
  
      console.log(`\x1b[35m[${user.name}]\x1b[0m user join room: \x1b[33m${roomId}\x1b[0m`);
  
      handleSendMessage(io, socket, roomId, user, "join", "system");
    }
  }
  
  function handleLeaveRoom(io, socket, user) {
    let tempRoom = initialData.rooms;
    const index = tempRoom.findIndex((room) => room.id === user.room);
    if (index !== -1) {
      tempRoom[index].users = tempRoom[index].users.filter(
        (userId) => userId !== user.id
      );
      if (tempRoom[index].users.length === 0) {
        handleStoreRoom();
        tempRoom = tempRoom.filter((room) => room.users.length !== 0);
      }
      initialData.rooms = tempRoom;
      io.emit("status-rooms", initialData.rooms);
      console.log(`\x1b[35m[${user.name}]\x1b[0m user leave room`);
    }
  
    user.room = null;
    socket.leave(user.room);
  }
  
  function handleStoreRoom() { }
  
  function handleSendMessage(io, socket, roomId, user, message, type = "message") {
    const indexRoom = initialData.rooms.findIndex((room) => room.id === roomId);
    if (indexRoom > -1) {
      const baseMessage = {
        type,
        message,
        userId: user.id,
        time: Date.now()
      };
  
      io.in(roomId).emit("message", baseMessage)
    }
  }
  
  app.get("/", (req, res) => {
    res.send("Service startup complete");
  });
  
  io.on("connection", (socket) => {
    const currentId = handleUserConnected(socket.id);
    const user = getCurrentUser(currentId);
    io.emit("status-users", initialData.users);
    io.emit("status-rooms", initialData.rooms);
    io.to(user.id).emit("status-user", user);
    console.log(`\x1b[35m[server]\x1b[0m a user connected with id \x1b[33m${user.id}\x1b[0m`);
    db.connection.query("SELECT * FROM users", (err, rows, fields) => {
      if (err) throw err
  
      console.log('The solution is: ', rows[0])
    })
  
    socket.on("set-username", (username) => {
      handleSetUsername(io, socket, user, username);
    });
  
    socket.on("create-room", () => {
      if (user.room) {
        handleLeaveRoom(io, socket, user);
      }
      handleCreateRoom(io, socket, user);
    });
  
    socket.on("join-room", (roomId) => {
      if (initialData.rooms.findIndex(_room => _room.id === roomId) > -1) {
  
        if (roomId !== user.room) {
          if (user.room) {
            handleLeaveRoom(io, socket, user);
          }
          handleJoinRoom(io, socket, user, roomId);
        }
  
        io.to(user.id).emit("status-user", user);
      } else {
        io.to(user.id).emit("response", { type: "error", message: "Couldn't join room, because room not found" });
        console.log(`\x1b[35m[${user.name}]\x1b Couldn't join room`);
      }
    });
  
    socket.on("invite-room", ({ userId, roomId }) => {
      io.to(userId).emit("invite-room", { userId: user.id, roomId });
      io.to(user.id).emit("response", { type: "success", message: "Send invite success" });
      console.log(`\x1b[35m[${user.name}]\x1b[0m Send invite \x1b[33m${roomId}\x1b[0m to \x1b[33m${userId}\x1b[0m`);
    });
  
    socket.on("disconnect", () => {
      handleLeaveRoom(io, socket, user);
      handleUserDisconnected(user);
      io.emit("status-users", initialData.users);
      io.to(user.id).emit("status-user", user);
      console.log("\x1b[35m[server]\x1b[0m Client disconnected"); // Khi client disconnect thì log ra terminal.
    });
  });
  
  server.listen(3000, () => {
    console.log("listening on *:3000");
  });
  