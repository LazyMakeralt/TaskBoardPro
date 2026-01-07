import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Notification {
  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();

  show(msg: string) {
    this.messageSubject.next(msg);
    setTimeout(() => this.messageSubject.next(null), 3000);
  }
}