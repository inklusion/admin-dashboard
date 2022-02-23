import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { AdminPopupComponent } from './admin/admin-popup/admin-popup.component';
import { AdminsComponent } from './admin/admin.component';
import { DashboardRoutes } from './dashboard.routing';
import { DefaultDashboardComponent } from './home/dashboard.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        NgxDatatableModule,
        TranslateModule,
        SharedModule,
        NgScrollbarModule,
        RouterModule.forChild(DashboardRoutes)
    ],
    declarations: [
        DefaultDashboardComponent,
        AdminsComponent,
        AdminPopupComponent,
    ],
    exports: []
})
export class DashboardModule {

}