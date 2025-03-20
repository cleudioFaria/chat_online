const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir o arquivo HTML
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("Usuário conectado");

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg); // Envia a mensagem para todos os usuários
    });

    socket.on("disconnect", () => {
        console.log("Usuário desconectado");
    });
});

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000 - Acesse http://localhost:3000");
});
