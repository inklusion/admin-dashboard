import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  template: `<h1 matDialogTitle class="mb-05" [innerHTML]="data.title"></h1>
    <div mat-dialog-content class="mb-1" [innerHTML]="data.message"></div>
    <div mat-dialog-actions>
      <button type="button" mat-raised-button color="primary" (click)="dialogRef.close(true)">
        {{'ACTIONS.OK' | translate}}
      </button>
      <span fxFlex></span>
      <button type="button" color="warn" mat-button (click)="dialogRef.close(false)">
        {{'ACTIONS.CANCEL' | translate}}
      </button>
    </div>`,
})
export class AppComfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<AppComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}