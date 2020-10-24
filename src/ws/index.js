const Constants = require('../constants');

module.exports = (io) => {
    io.on(Constants.CONNECTION, (socket) => {
        socket.on(Constants.TEXT, async (data) => {
            let response = await dialogflow.sendTextMessageToDialogFlow(data.text);
            socket.emit('response-to-user', response);
        });
        socket.on(Constants.DISCONNECT, function () {
            console.log('A user disconnected');
        });
    });

};
