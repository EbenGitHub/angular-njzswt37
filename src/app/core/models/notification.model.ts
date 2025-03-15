/**
 * Notification type (success, info, error)
 */
export enum NotificationType {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
}

/**
 * notification interface
 */
export interface INotification {
  message: string;
  type: NotificationType;
}
