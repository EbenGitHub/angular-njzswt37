import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-username',
  imports: [NgIf, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parentForm">
      <label for="username">Username:</label>
      <input id="username" formControlName="username" />
      <div class="error-input-display" *ngIf="parentForm.get('username')?.touched && parentForm.get('username')?.invalid">
        <small *ngIf="parentForm.get('username')?.errors?.['required']">Username is required.</small>
        <small *ngIf="parentForm.get('username')?.errors?.['minlength']">Username must be at least 3 characters.</small>
        <small *ngIf="parentForm.get('username')?.errors?.['maxlength']">Username cannot exceed 24 characters.</small>
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
export class UsernameComponent {
  /**
   * Parent form
   */
  @Input() parentForm: FormGroup;
}
