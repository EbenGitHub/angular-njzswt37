import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  of,
  delay,
  switchMap,
  throwError,
  finalize,
  firstValueFrom,
} from 'rxjs';
import { HandleError } from '../../core/decorators/error.decorator';
import { NotificationType } from '../../core/models/notification.model';
import { IUser } from '../../core/models/user.model';
import { MessageService } from '../../core/services/message.service';
import { EmailComponent } from './partial/email.component';
import { UsernameComponent } from './partial/username.component';
import { PasswordComponent } from './partial/password.component';
import { TypeComponent } from './partial/type.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'user-form',
  imports: [
    ReactiveFormsModule,
    UsernameComponent,
    EmailComponent,
    PasswordComponent,
    TypeComponent,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-form.component.html',
  styles: [
    `
  button {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.button-text {
  visibility: visible;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`,
  ],
})
export class UserFormComponent {
  /**
   * User Form Group
   * @type {FormGroup}
   */
  userForm: FormGroup;

  /**
   * Loading indicator
   * @type {WritableSignal<boolean>}
   */
  loading: WritableSignal<boolean> = signal(false);

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.userForm = this.fb.group({
      username: [
        { value: '', disabled: false },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(24),
        ],
      ],
      email: [
        { value: '', disabled: false },
        [Validators.required, Validators.email],
      ],
      type: [{ value: '', disabled: false }, Validators.required],
      password: [
        { value: '', disabled: false },
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(24),
          this.passwordValidator,
        ],
      ],
    });
  }

  /**
   * Password validator
   * @param {AbstractControl} control password form control
   * @returns {boolean} weather the password is valid or not
   */
  passwordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const value = control.value;
    if (!/[a-z]/.test(value)) {
      return { lowerCaseLetterRequired: true };
    } else if (!/[A-Z]/.test(value)) {
      return { upperCaseLetterRequired: true };
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return { specialCharactersRequired: true };
    }
    return null;
  }

  toggleFormControls(state: boolean): void {
    if (state) {
      this.userForm.disable();
    } else {
      this.userForm.enable();
    }
  }

  @HandleError()
  async submit() {
    if (this.userForm.valid) {
      console.log('Form Submitted', this.userForm.value);
      await firstValueFrom(this.createUser(this.userForm.value));
      this.messageService.setMessage({
        message: 'Form submitted successfully!',
        type: NotificationType.SUCCESS,
      });
      this.userForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * Create user
   */
  private createUser(user: IUser) {
    this.loading.set(true);
    this.toggleFormControls(true);
    return of(user).pipe(
      delay(2500), // Simulates a network delay
      switchMap((userData) => {
        if (Math.random() < 0.5) {
          return throwError(() => new Error('Network timeout!'));
        }
        // Simulate a successful backend response
        return of({
          username: userData.username,
          email: userData.email,
          type: userData.type,
        });
      }),
      finalize(() => {
        this.loading.set(false);
        this.toggleFormControls(false);
      })
    );
  }
}
