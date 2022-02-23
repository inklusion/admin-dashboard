import { Inject, Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { IAuthenticationService } from "authentication-inklusion";
import { BehaviorSubject } from "rxjs";
import { UserType } from "../helpers/enum";

interface IMenuItem {
  type: string; // Possible values: link/dropDown/icon/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  iconMenu: IMenuItem[];
  iconTypeMenuTitle: string = "Frequently Accessed";
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>([]);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  constructor(
    @Inject('AuthService') private authenticationService: IAuthenticationService,
    private _translateService: TranslateService,
  ) {
    this.authenticationService.currentUserSubject.subscribe(newUser => {
      this.iconMenu = [
        {
          name: this._translateService.instant("NAVBAR.DASHBOARD"),
          type: "link",
          tooltip: "Dashboard",
          icon: "dashboard",
          state: "dashboard",
          disabled: false
        },
        {
          name: this._translateService.instant("NAVBAR.PLATFORM_USERS"),
          type: "dropDown",
          tooltip: "Platform Users List",
          icon: "supervised_user_circle",
          state: "dashboard/users",
          disabled: newUser?.userType != UserType.ADMIN,
          sub: [
            {
              name: this._translateService.instant("NAVBAR.ADMINS"),
              type: "link",
              state: "admin",
              disabled: newUser?.userType != UserType.ADMIN,
            },
            {
              name: this._translateService.instant("NAVBAR.USERS"),
              type: "link",
              state: "clients",
              disabled: newUser?.userType != UserType.ADMIN,
            },
            {
              name: this._translateService.instant("NAVBAR.MARKETPLACE_USERS"),
              type: "link",
              state: "marketplace",
              disabled: newUser?.userType != UserType.ADMIN,
            },
          ]
        },
        {
          name: this._translateService.instant("NAVBAR.SHOP"),
          type: "dropDown",
          tooltip: "Store",
          icon: "storefront",
          state: "dashboard/shop",
          sub: [
            {
              name: this._translateService.instant("NAVBAR.CATEGORIES"),
              type: "link",
              state: "categories",
              disabled: newUser?.userType != UserType.ADMIN,
            },
            {
              name: this._translateService.instant("NAVBAR.SUBCATEGORIES"),
              type: "link",
              state: "subcategories",
              disabled: newUser?.userType != UserType.ADMIN,
            },
            {
              name: this._translateService.instant("NAVBAR.PRODUCTS"),
              type: "link",
              state: "products",
              disabled: false,
            },
          ]
        },
        {
          name: this._translateService.instant("NAVBAR.PLATFORM"),
          type: "dropDown",
          tooltip: "Platform",
          icon: "settings",
          state: "dashboard/platform",
          disabled: newUser?.userType != UserType.ADMIN,
          sub: [
            {
              name: this._translateService.instant("NAVBAR.SELLS"),
              type: "link",
              state: "sales",
              disabled: newUser?.userType != UserType.ADMIN,
            },
            {
              name: this._translateService.instant("NAVBAR.COUPONS"),
              type: "link",
              state: "coupons",
              disabled: newUser?.userType != UserType.ADMIN,
            },
            {
              name: this._translateService.instant("NAVBAR.SLIDERS"),
              type: "link",
              state: "sliders",
              disabled: newUser?.userType != UserType.ADMIN,
            },
            {
              name: this._translateService.instant("NAVBAR.PAYMENT_METHODS"),
              type: "link",
              state: "payments",
              disabled: newUser?.userType != UserType.ADMIN,
            },
            {
              name: this._translateService.instant("NAVBAR.ENVIOS"),
              type: "link",
              state: "shipping",
              disabled: newUser?.userType != UserType.ADMIN,
            },
          ]
        },
      ];
      this.menuItems.next(this.iconMenu);
    })
  }
}
