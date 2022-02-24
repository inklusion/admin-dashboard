import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppConfirmService } from 'app/shared/components/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/components/app-loader/app-loader.service';
import { InklusionDialogExtendComponent } from 'app/shared/components/inklusionMatDialog/inklusion-mat-dialog';
import { filterRowsbyText } from 'app/shared/helpers/tablefilter.helper';
import { Admin } from 'app/shared/models/admin';
import { User } from 'app/shared/models/user';
import { UserService } from 'app/shared/services/user.service';
import { IAuthenticationService } from 'authentication-inklusion';
import { Subscription } from 'rxjs';
import { AdminPopupComponent } from './admin-popup/admin-popup.component';

@Component({
  selector: 'app-admins',
  templateUrl: './admin.component.html',
  animations: egretAnimations,
})
export class AdminsComponent extends InklusionDialogExtendComponent implements OnInit, OnDestroy {
  public items: User[] = [];
  public allItems: User[] = [];
  public searchByFields = ['name', 'email'];
  public translationPrefix = 'USER_FORM';

  public getItemSub: Subscription;
  public currentUser: User;

  constructor(
    @Inject('AuthService') private authenticationService: IAuthenticationService,
    private snack: MatSnackBar,
    private userService: UserService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private _translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue as User;
    this.getItems();
  }

  ngOnDestroy() {
    this.getItemSub?.unsubscribe();
  }

  getItems() {
    this.loader.open(this._translateService.instant('LOADING'));
    this.getItemSub = this.userService.getAllAdmins()
      .subscribe({
        next: (data) => {
          this.items = data;
          this.allItems = data;
          console.log(data);
        },
      });

    this.getItemSub.add(() => {
      this.loader.close();
    });
  }


  updateFilter(event) {
    this.items = filterRowsbyText(event.text, this.allItems, this.searchByFields);
  }

  openPopUp(editData: any = {}) {
    this.OpenDialog({
      modelComponent: AdminPopupComponent,
      title: editData == null ? this._translateService.instant('ADMIN_ACTIONS.ADD_ADMIN') : this._translateService.instant('ADMIN_ACTIONS.UPDATE_ADMIN'),
      payload: editData,
      onSaveButton: (res, closeModal) => this.saveData(editData?.id, res, closeModal),
    });
  }

  saveData(originalDataId: string, modalData: any, closeModal) {
    if (!modalData) {
      // If user press cancel
      return;
    }
    this.loader.open();
    if (originalDataId == null) {
      // this.authenticationService.invite({ ...modalData, userType: UserType.ADMIN })
      //   .subscribe({
      //     next: (data) => {
      //       this.items = [...this.items, data];
      //       this.snack.open(this._translateService.instant('ADMIN_ACTIONS.ADMIN_ADDED'), 'OK', { duration: 4000 });
      //       closeModal();
      //     },
      //   }).add(() => {
      //     this.loader.close();
      //   });
      // return;
    }
    this.userService.update(originalDataId, modalData)
      .subscribe({
        next: (data) => {
          this.items = this.items.map((el) => el.id == data.id ? data : el);
          this.snack.open(this._translateService.instant('ADMIN_ACTIONS.ADMIN_UPDATED'), 'OK', { duration: 4000 });
          closeModal();
        },
      }).add(() => {
        this.loader.close();
      });
  }


  deleteItem(row: Admin) {
    this.confirmService.confirm({
      message: this._translateService.instant('ADMIN_ACTIONS.DELETE_ADMIN', {
        userName: row.name,
      }),
    })
      .subscribe((res) => {
        if (res) {
          this.loader.open();
          this.userService.delete(row.id)
            .subscribe({
              next: () => {
                this.items = this.items.filter((item) => item.id != row.id);
                this.snack.open(this._translateService.instant('ADMIN_ACTIONS.ADMIN_DELETED'), 'OK', { duration: 4000 });
              },
            }).add(() => {
              this.loader.close();
            });
        }
      });
  }
}
