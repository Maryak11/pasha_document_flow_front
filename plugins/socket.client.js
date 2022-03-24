import { io } from 'socket.io-client';

export default (_, inject) => {
  inject('socket', () => io('https://socket-dengi--server.herokuapp.com'));
};
