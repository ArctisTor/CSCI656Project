var socket;

exports.sockets = function(socketConnection) {
  socket = socketConnection;
};

exports.get = function () {
  return socket;
};