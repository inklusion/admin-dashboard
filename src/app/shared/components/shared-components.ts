import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { SharedMaterialModule } from "../shared-material.module";
import { HeaderSideComponent } from "./admin-header/header-side.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { SidebarSideComponent } from "./admin-side/sidebar-side.component";
import { SidenavComponent } from "./admin-sidenav/sidenav.component";
import { AppLoaderComponent } from "./app-loader/app-loader.component";
import { BackdropComponent } from "./backdrop/backdrop.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";

const components = [
    BackdropComponent,
    AppLoaderComponent,
    AdminLayoutComponent,
    BreadcrumbComponent,
    HeaderSideComponent,
    SidebarSideComponent,
    SidenavComponent
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        TranslateModule,
        RouterModule,
        ReactiveFormsModule,
    ],
    declarations: components,
    exports: components,
})
export class SharedComponentsModule { }