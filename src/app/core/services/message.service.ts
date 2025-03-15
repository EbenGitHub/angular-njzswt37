import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INotification } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService implements OnDestroy {
  private messageSubject = new BehaviorSubject<INotification | null>(null);
  message$ = this.messageSubject.asObservable();

  /**
   * set messages
   */
  setMessage(message: INotification) {
    this.messageSubject.next(message);
  }

  /**
   * clears message
   */
  clearMessage() {
    this.messageSubject.next(null);
  }

  /**
   * properly closes and destroys subscriptions
   */
  ngOnDestroy() {
    this.messageSubject.complete();
  }
}
