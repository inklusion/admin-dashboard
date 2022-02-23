import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { SharedMaterialModule } from '../shared-material.module';
import { HeaderSideComponent } from './admin-header/header-side.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SidebarSideComponent } from './admin-side/sidebar-side.component';
import { SidenavComponent } from './admin-sidenav/sidenav.component';
import { AppComfirmComponent } from './app-confirm/app-confirm.component';
import { AppLoaderComponent } from './app-loader/app-loader.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

const components = [
    BackdropComponent,
    AppLoaderComponent,
    AdminLayoutComponent,
    BreadcrumbComponent,
    HeaderSideComponent,
    SidebarSideComponent,
    SidenavComponent,
    AppComfirmComponent,
    SearchBarComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        TranslateModule,
        RouterModule,
        SharedDirectivesModule,
        ReactiveFormsModule,
    ],
    declarations: components,
    exports: components,
})
export class SharedComponentsModule { }
