const { Server } = require("socket.io");
const DatabaseExecute = require("./database-execute");
const { format } = require("date-fns");

class AppChat extends DatabaseExecute {

    constructor({ server, db }) {
        super({ db: new db() });

        const io = new Server(server, {
            cors: {
                origin: "*",
            },
        });

        this.io = io;
        this.startup();
    }

    startup() {
        const io = this.io;
        const _this = this;

        io.on("connection", (socket) => {
            _this.clientConnected(socket);

            socket.on("set-username", (username) => {
                _this.editProfile(socket, { username })
            });

            socket.on("disconnect", () => {
                _this.clientDisconnected(socket);
            });
        });
    }

    async clientConnected(socket) {
        const result = await this.execute("SELECT * FROM `clients` WHERE `session` = ?", [socket.id]);
        const ip = socket.handshake.address;
        if (result.length === 0) {
            const insert = await this.execute("INSERT INTO `clients`(`session`, `ip`, `created_date`) VALUES (?, ?, ?)",
                [
                    socket.id,
                    ip,
                    format(new Date(), 'yyyy/MM/dd HH:mm:ss')
                ]);
            await this.execute("INSERT INTO `profile`(`id`, `username`) VALUES (?, ?)",
                [
                    insert.insertId,
                    null
                ]);
        }
    }

    async clientDisconnected(socket) {
        const client = await this.execute("SELECT * FROM `clients` WHERE `session` = ?", [socket.id]);
        if (client.length > 0) {
            await this.execute("DELETE FROM `clients` WHERE `id` = ?", [client[0].id]);
            await this.execute("DELETE FROM `profile` WHERE `id` = ?", [client[0].id]);
        }
    }

    async editProfile(socket, { username }) {
        const client = await this.execute("SELECT * FROM `clients` WHERE `session` = ?", [socket.id]);
        console.log("jere", socket.id, username);
        if (client.length > 0) {
            const profile = await this.execute("SELECT * FROM `profile` WHERE `id` = ?", [client[0].id]);
            if (profile.length > 0) {
                await this.execute("UPDATE `profile` SET `username` = ? WHERE `id` = ?", [username, profile[0].id]);
            }
        }
    }
}

module.exports = AppChat;