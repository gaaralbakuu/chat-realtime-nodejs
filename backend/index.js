const express = require("express");
const http = require("http");
const server = http.createServer(express());
const db = require("./database");
const appChat = require("./app-chat");

new appChat({ server, db });

server.listen(3000, () => {
  console.log("listening on *:3000");
});