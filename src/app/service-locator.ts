import { Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

export class ServiceLocator {
    static injector: Injector;
    static dialog: MatDialog;
}
