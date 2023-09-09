const express = require('express');
const uniqid = require('uniqid');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

const initialData = {
    rooms: [],
    users: []
};

function handleUserConnected(userId) {
    let tempUsers = initialData.users;
    let index = tempUsers.findIndex(_user => _user.id === userId);
    if (index === -1) {
        tempUsers.push({
            id: userId,
            name: null,
            room: null
        });
        index = tempUsers.findIndex(_user => _user.id === userId);
        initialData.users = tempUsers;
    }
    return index;
}

function handleUserDisconnected(user) {
    let tempUsers = initialData.users;
    const index = tempUsers.findIndex(_user => _user.id === user.id);
    if (index > -1) {
        initialData.users = tempUsers.filter(_user => _user.id !== user.id)
    }
}

function getCurrentUser(currentId) {
    if(initialData.users[currentId]) {
        return initialData.users[currentId];
    } else {
        return null;
    }
}

function handleSetUsername(io, socket, user, username) {
    user.name = username;
    let tempUsers = initialData.users;
    const index = tempUsers.findIndex(_user => _user.id === user.id);
    if (index > -1) {
        tempUsers[index] = user;
        initialData.users = tempUsers;
        io.emit('status-users', initialData.users);
        io.to(user.id).emit('status-user', user);
    }

    console.log("has set username");
    console.log(initialData.users);
}

function handleCreateRoom(io, socket, user) {
    const id = uniqid();

    const baseRoom = {
        id: id,
        users: [user.id],
        messages: []
    };

    let tempRoom = initialData.rooms;
    tempRoom.push(baseRoom);
    initialData.rooms = tempRoom;

    io.emit('status-rooms', initialData.rooms);
    user.room = id;
    socket.join(id);
    io.emit('status-users', initialData.users);
    io.to(user.id).emit('status-user', user);

    console.log('a room created');
    // console.log(initialData.rooms);
    console.log(initialData.users);
}

function handleJoinRoom(io, socket, user, roomId) {
    let tempRoom = initialData.rooms;
    const index = tempRoom.findIndex(item => item.id === roomId);
    if (index > -1) {
        if (tempRoom[index].users.findIndex(userId => userId === user.id) === -1) {
            tempRoom[index].users.push(user.id);
            initialData.rooms = tempRoom;
            io.emit('status-rooms', initialData.rooms);
        }

        user.room = roomId;
        socket.join(roomId);
        io.emit('status-users', initialData.users);
        io.to(user.id).emit('status-user', user);

        console.log('user join room');
        console.log(initialData.rooms);
    }
}

function handleLeaveRoom(io, socket, user) {
    let tempRoom = initialData.rooms;
    const index = tempRoom.findIndex(room => room.id === user.room);
    if (index !== -1) {
        tempRoom[index].users = tempRoom[index].users.filter(userId => userId !== user.id);
        if (tempRoom[index].users.length === 0) {
            handleStoreRoom();
            tempRoom = tempRoom.filter(room => room.users.length !== 0);
        }
        initialData.rooms = tempRoom;
        io.emit('status-rooms', initialData.rooms);
        console.log('user leave room');
        console.log(initialData.rooms);
    }

    user.room = null;
    socket.leave(user.room);
    io.to(user.id).emit('status-user', user);
}

function handleStoreRoom() {

}

app.get('/', (req, res) => {
    res.send('Service startup complete');
});

io.on('connection', (socket) => {
    const currentId = handleUserConnected(socket.id);
    const user = getCurrentUser(currentId);
    io.emit('status-users', initialData.users);
    io.emit('status-rooms', initialData.rooms);
    io.to(user.id).emit('status-user', user);
    console.log('a user connected');

    socket.on('set-username', (username) => {
        handleSetUsername(io, socket, user, username);
    })

    socket.on('create-room', () => {
        if (user.room) {
            handleLeaveRoom(io, socket, user);
        }
        handleCreateRoom(io, socket, user)
        console.log(user);
    })

    socket.on('join-room', (roomId) => {
        if (roomId !== user.room) {
            if (user.room) {
                handleLeaveRoom(io, socket, user);
            }
            handleJoinRoom(io, socket, user, roomId);
        }
    })

    socket.on("disconnect", () => {
        handleLeaveRoom(io, socket, user);
        handleUserDisconnected(user);
        io.emit('status-users', initialData.users);
        console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});