import { Component, ViewEncapsulation } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { configuration } from 'configuration/configuration';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: egretAnimations,
  encapsulation: ViewEncapsulation.None
})
export class DefaultDashboardComponent {
  configuration = configuration;

}
