import { NotificationType } from '../models/notification.model';
import { MessageService } from '../services/message.service';

/**
 * Error handler decorator
 */
export function HandleError(
  errorMessage: string = 'An unexpected error occurred!'
) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        console.error(`Error in ${propertyKey}:`, error);
        const errorService = this.messageService as MessageService;
        if (errorService) {
          errorService.setMessage({
            message: `${errorMessage}: ${error.message || error}`,
            type: NotificationType.ERROR,
          });
        } else {
          console.log('no error service found to propagate the error message');
        }
      }
    };

    return descriptor;
  };
}
