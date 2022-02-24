import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeFormatPipe } from 'app/shared/pipes/time-format.pipe';


const pipes = [
  TimeFormatPipe,
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule { }