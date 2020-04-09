module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('text', async (data) => {
            let response = await dialogflow.sendTextMessageToDialogFlow(data.text);
            socket.emit('response-to-user', response);
        });
        socket.on('disconnect', function () {
            console.log('A user disconnected');
        });
    });

};
