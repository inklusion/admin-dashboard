import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html',
  styleUrls: ['./sidenav.template.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {
  @Input('items') public menuItems: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;

  constructor() { }
  ngOnInit() { }
}