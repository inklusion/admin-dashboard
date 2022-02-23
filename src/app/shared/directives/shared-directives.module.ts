import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownAnchorDirective } from './dropdown-anchor.directive';
import { DropdownLinkDirective } from './dropdown-link.directive';
import { AppDropdownDirective } from './dropdown.directive';



const directives = [
  AppDropdownDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective,
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: directives,
  exports: directives
})
export class SharedDirectivesModule { }