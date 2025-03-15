import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import { MessageService } from '../services/message.service';
import { NgClass, NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { INotification, NotificationType } from '../models/notification.model';

@Component({
  selector: 'global-notification',
  imports: [NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="message()" [ngClass]="{
      'error-box': message().type == NotificationType.ERROR, 
      'success-box': message().type == NotificationType.SUCCESS, 
      'info-box': message().type == NotificationType.INFO
    }" class="box">
      {{ message().message }}
      <button (click)="clearError()">X</button>
    </div>
  `,
  styles: [
    `
    .box {
      position: fixed;
      top: 10px;
      right: 10px;
      color: white;
      padding: 10px;
      border-radius: 5px;
    }

    .error-box {
      background: red;
    }

    .info-box {
      background: blue;
    }

    .success-box {
      background: green;
    }
  `,
  ],
})
export class GlobalNotificationComponent implements OnDestroy {
  /**
   * notification message
   */
  message: WritableSignal<INotification | undefined> = signal(undefined);
  /**
   * to handle automatics unsubscription
   */
  destroy$: Subject<boolean> = new Subject<boolean>();

  NotificationType = NotificationType;

  constructor(private messageService: MessageService) {
    this.messageService.message$
      .pipe(takeUntil(this.destroy$))
      .subscribe((msg) => this.message.set(msg));
  }

  /**
   * clears messages
   */
  clearError() {
    this.messageService.clearMessage();
  }

  /**
   * clean up subscriptions
   */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
