# Angular Application Overview

This Angular application showcases advanced features and best practices, including global error handling, decorator-based error management, comprehensive type safety, and performance optimizations using the OnPush change detection strategy and Angular Signals.

## Features

- **Global Error Handling**: Implements a centralized mechanism to manage and display errors consistently across the application.
- **Decorator-Based Error Management**: Utilizes custom decorators to handle errors within components, promoting cleaner and more maintainable code.
- **Type Safety**: Employs TypeScript interfaces, enums, and the `unknown` type to ensure robust type checking, avoiding the use of the `any` type.
- **Angular Signals**: Incorporates Angular Signals to manage reactive state changes efficiently.
- **OnPush Change Detection**: Applies the OnPush change detection strategy to optimize performance by reducing unnecessary checks.
- **Loading and Disabled States**: Manages loading indicators and disables form inputs during asynchronous operations to enhance user experience.

## Running the Application locally

- Install the dependencies using `npm install`.
- Run the application using `ng serve` or `npm start`.

## Running the Application using Docker

- Build docker image `docker build -t angular-challenge .`
- Run docker container `docker run -p 80:80 angular-challenge`

## Global Error Handling

The application leverages Angular's `ErrorHandler` class to implement a global error handling strategy. This approach ensures that all uncaught errors are captured and processed uniformly.

### Implementation Steps:

1.  **Create a Global Error Handler Service**:

```typescript
import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Log the error or display a notification
    console.error("An unexpected error occurred:", error);
  }
}
```

2.  **Provide the Error Handler in the App Module**:

```typescript
import { NgModule, ErrorHandler } from "@angular/core";
import { GlobalErrorHandler } from "./global-error-handler.service";

@NgModule({
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
})
export class AppModule {}
```

This setup captures all errors that propagate beyond the component level, allowing for centralized error management.

## Decorator-Based Error Handling

To streamline error handling within components, the application uses custom decorators. These decorators wrap component methods, automatically managing errors and reducing boilerplate code.

### Example:

1.  **Define the Error Handling Decorator**:

```typescript
function HandleError() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      try {
        return originalMethod.apply(this, args);
      } catch (error) {
        // Handle the error, e.g., log it or display a notification
        console.error("Error in method", propertyKey, ":", error);
      }
    };
  };
}
```

2.  **Apply the Decorator to Component Methods**:

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
})
export class ExampleComponent {
  @HandleError()
  riskyOperation() {
    // Method logic that might throw an error
  }
}
```

This pattern ensures that errors within decorated methods are handled consistently, enhancing code readability and maintainability.

## Type Safety

The application emphasizes strict type safety by utilizing TypeScript's features:

- **Interfaces and Enums**: Define clear contracts and limit possible values, reducing runtime errors.

```typescript
interface User {
  username: string;
  email: string;
  role: UserRole;
}

enum UserRole {
  Admin = "admin",
  User = "user",
}
```

- **Avoiding `any` Type**: Replaces the `any` type with specific types or `unknown` to ensure type checking.

```typescript
function processData(data: unknown) {
  if (typeof data === "string") {
    // Process the string data
  } else {
    // Handle other types or throw an error
  }
}
```

This approach minimizes bugs and enhances code reliability.

## Angular Signals

Angular Signals are employed to manage reactive state changes efficiently. Signals provide a way to define reactive values that automatically update when their dependencies change, simplifying state management and improving performance.

### Example:

```typescript
import { signal, computed } from "@angular/core";

const count = signal(0);
const doubleCount = computed(() => count() * 2);

count.set(1);
console.log(doubleCount()); // Outputs: 2
```

In this example, `doubleCount` automatically updates when `count` changes, ensuring that the UI remains in sync with the application state.

## OnPush Change Detection

The application utilizes Angular's OnPush change detection strategy to optimize performance. This strategy instructs Angular to check a component's view only when its inputs change or when an event originates from the component or its children.

### Usage:

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-on-push-component",
  templateUrl: "./on-push-component.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushComponent {
  // Component logic
}
```

By adopting this strategy, the application reduces unnecessary checks and enhances performance, especially in complex components.
