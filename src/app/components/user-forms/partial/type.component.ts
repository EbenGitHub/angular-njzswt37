import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-type',
  imports: [NgIf, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div [formGroup]="parentForm">
    <label for="type">Type:</label>
    <select id="type" formControlName="type">
      <option value="">Select Type</option>
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
    <div class="error-input-display" *ngIf="parentForm.get('type')?.touched && parentForm.get('type')?.invalid">
      <small *ngIf="parentForm.get('type')?.errors?.['required']">Type is required.</small>
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
  select {
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
export class TypeComponent {
  /**
   * Parent form
   */
  @Input() parentForm: FormGroup;
}
