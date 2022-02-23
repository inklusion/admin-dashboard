import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { User } from "app/shared/models/user";
import { ILayoutConf, LayoutService } from "app/shared/services/layout.service";
import { NavigationService } from "app/shared/services/navigation.service";
import { IAuthenticationService } from "authentication-inklusion";
import { configuration } from "configuration/configuration";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sidebar-side",
  templateUrl: "./sidebar-side.component.html"
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;

  public currentUser: User;
  configuration = configuration;

  constructor(
    @Inject('AuthService') private authenticationService: IAuthenticationService,
    private navService: NavigationService,
    private layout: LayoutService,
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue as User;

    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === "icon"
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;
  }
  ngAfterViewInit() { }
  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }
  toggleCollapse() {
    if (
      this.layoutConf.sidebarCompactToggle
    ) {
      this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
      this.layout.publishLayoutChange({
        // sidebarStyle: "compact",
        sidebarCompactToggle: true
      });
    }
  }

  logout() {
    this.authenticationService.logout();
  }
}
