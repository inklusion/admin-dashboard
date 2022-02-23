import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutes } from './dashboard.routing';
import { DefaultDashboardComponent } from './home/dashboard.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatCardModule,
        MatListModule,
        MatGridListModule,
        MatProgressBarModule,
        MatIconModule,
        MatMenuModule,
        MatChipsModule,
        MatButtonModule,
        NgxDatatableModule,
        TranslateModule,
        SharedModule,
        NgScrollbarModule,
        RouterModule.forChild(DashboardRoutes)
    ],
    declarations: [
        DefaultDashboardComponent,
    ],
    exports: []
})
export class DashboardModule {

}