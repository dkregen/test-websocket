import { Injectable } from '@angular/core';

import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private url = 'http://localhost:3001';
  private socket;

  connect() {
    this.socket = io(this.url);
  }

  emit(emitName: string, data?) {
    this.socket.emit(emitName, data);
  }

  on(onName: string) {
    let observable = new Observable(observer => {
      this.socket.on(onName, (data) => {
        observer.next(data);
      });

      return () => { this.socket.disconnect(); };
    });
    return observable;
  }
}
