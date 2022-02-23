import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { ServiceLocator } from 'app/service-locator';

export class InklusionDialogExtendComponent {
  public dialog: MatDialog;

  constructor() {
    this.dialog = ServiceLocator.dialog;
  }

  /**
 * Shows given component into popup modal
 *
 * @protected
 * @param {*} data
 * @memberof ModalComponent
 */
  protected OpenDialog<T>(data: OpenDialogData<T>): void {
    this.dialog.open(data.modelComponent, {
      width: '800px',
      maxHeight: '80vh',
      backdropClass: 'modal-backdrop',
      disableClose: true,
      data: { title: data.title, payload: data.payload, otherData: data.otherData, onSaveButton: (dataRes, closeModalFunc) => data.onSaveButton(dataRes, closeModalFunc) },
    });
  }
}

export interface OpenDialogData<T> extends DialogData<T> {
  modelComponent: ComponentType<any>;
}

export interface DialogData<T> {
  title: string,
  payload: T,
  otherData?: any;
  onSaveButton: (dataRes, closeModalFunc) => void;
}
