import { Socket } from 'socket.io';
import { io } from '../app';

export function setupSocketIO() {
  io.on('connection', (socket: Socket) => {
    console.log('[Socket] Client connecté:', socket.id);

    socket.on('auth', (userId: string) => {
      socket.join(userId);
      console.log(`[Socket] ${userId} a rejoint sa room.`);
    });

    socket.on('disconnect', () => {
      console.log('[Socket] Client déconnecté:', socket.id);
    });
  });
}
