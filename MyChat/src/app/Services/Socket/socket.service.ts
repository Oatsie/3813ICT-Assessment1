import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { Message } from 'src/app/models/message';

const socket = io('http://localhost:3000');
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor() {}

  initSocket() {
    return () => {
      socket.disconnect();
    };
  }

  send(message: string) {
    socket.emit('message', message);
  }

  getMessage(): Observable<string> {
    return new Observable((observer) => {
      socket.on('message', (data: string) => {
        observer.next(data);
      });
    });
  }
}
