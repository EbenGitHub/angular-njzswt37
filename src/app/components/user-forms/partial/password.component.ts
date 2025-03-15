import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password',
  imports: [NgIf, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parentForm">
      <label for="password">Password:</label>
      <input id="password" type="password" formControlName="password" />
      <div class="error-input-display" *ngIf="parentForm.get('password')?.touched && parentForm.get('password')?.invalid">
        <small *ngIf="parentForm.get('password')?.errors?.['required']">Password is required.</small>
        <small *ngIf="parentForm.get('password')?.errors?.['minlength']">Password must be at least 5 characters.</small>
        <small *ngIf="parentForm.get('password')?.errors?.['maxlength']">Password cannot exceed 24 characters.</small>
        <small *ngIf="parentForm.get('password')?.errors?.['specialCharactersRequired']">Password must contain at least one special character.</small>
        <small *ngIf="parentForm.get('password')?.errors?.['lowerCaseLetterRequired']">Password must contain at least one lowercase letter.</small>
        <small *ngIf="parentForm.get('password')?.errors?.['upperCaseLetterRequired']">Password must contain at least one uppercase letter.</small>
      </div>
    </div>
  `,
  styles: [
    `
    div {
      margin-bottom: 15px;
    }
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }
    .error-input-display {
      color: red;
      margin-top: 5px;
    }
    .error-input-display small {
      display: block;
    }
  `,
  ],
})
export class PasswordComponent {
  /**
   * Parent form
   */
  @Input() parentForm: FormGroup;
}
