import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'app/shared/components/inklusionMatDialog/inklusion-mat-dialog';
import { I18nLanguage } from 'app/shared/helpers/enum';
import { FormValidators } from 'app/shared/helpers/formValidators';
import { User } from 'app/shared/models/user';

@Component({
  selector: 'app-admin-popup',
  templateUrl: './admin-popup.component.html'
})
export class AdminPopupComponent implements OnInit {
  public form: FormGroup;

  get I18nLanguage() { return I18nLanguage; }
  get I18nLanguageKeys() {
    var keys = Object.keys(I18nLanguage);
    keys = keys.slice(keys.length / 2)
    return keys.slice(1, keys.length);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData<User>,
    public dialogRef: MatDialogRef<AdminPopupComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm(this.data.payload);
  }
  buildForm(item: User) {
    this.form = this.fb.group({
      name: [item?.name || '', [Validators.required, Validators.minLength(6)]],
      email: [item?.email || '', [Validators.required, FormValidators.emailValidator]],
      language: [item?.language || '', [Validators.required]],
    })

  }

  submit() {
    this.data.onSaveButton(this.form.getRawValue(), () => this.dialogRef.close());
  }
}
