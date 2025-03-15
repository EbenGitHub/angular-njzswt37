import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-email',
  imports: [NgIf, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div [formGroup]="parentForm">
    <label for="email">Email:</label>
    <input id="email" formControlName="email" />
    <div class="error-input-display" *ngIf="parentForm.get('email')?.touched && parentForm.get('email')?.invalid">
      <small *ngIf="parentForm.get('email')?.errors?.['required']">Email is required.</small>
      <small *ngIf="parentForm.get('email')?.errors?.['email']">Enter a valid email address.</small>
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
export class EmailComponent {
  /**
   * Parent form
   */
  @Input() parentForm: FormGroup;
}
