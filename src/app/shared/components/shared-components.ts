import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BackdropComponent } from "./backdrop/backdrop.component";

const components = [
    BackdropComponent,
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
    ],
    declarations: components,
    exports: components,
})
export class SharedComponentsModule { }