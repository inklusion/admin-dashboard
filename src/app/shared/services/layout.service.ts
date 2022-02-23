import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { getQueryParam } from "../helpers/url.helper";

export interface ILayoutConf {
  navigationPos?: string; // side, top
  sidebarStyle?: string; // full, compact, closed
  sidebarCompactToggle?: boolean; // sidebar expandable on hover
  sidebarColor?: string; // Sidebar background color http://demos.ui-lib.com/egret-doc/#egret-colors
  dir?: string; // ltr, rtl
  isMobile?: boolean; // updated automatically
  useBreadcrumb?: boolean; // Breadcrumb enabled/disabled
  breadcrumb?: string; // simple, title
  topbarFixed?: boolean; // Fixed header
  footerFixed?: boolean; // Fixed Footer
  topbarColor?: string; // Header background color http://demos.ui-lib.com/egret-doc/#egret-colors
  footerColor?: string // Header background color http://demos.ui-lib.com/egret-doc/#egret-colors
  matTheme?: string; // material theme. egret-blue, egret-navy, egret-dark-purple, egret-dark-pink
  perfectScrollbar?: boolean;
}
export interface ILayoutChangeOptions {
  duration?: number;
  transitionClass?: boolean;
}
interface IAdjustScreenOptions {
  browserEvent?: any;
  route?: string;
}

@Injectable({
  providedIn: "root"
})
export class LayoutService {
  public layoutConf: ILayoutConf = null;
  layoutConfSubject = new BehaviorSubject<ILayoutConf>(this.layoutConf);
  layoutConf$ = this.layoutConfSubject.asObservable();
  public isMobile: boolean;
  public currentRoute: string;
  public fullWidthRoutes = [];

  constructor() {
    this.setAppLayout(
      //******** SET YOUR LAYOUT OPTIONS HERE *********
      {
        navigationPos: "side", // side, top
        sidebarStyle: "full", // full, compact, closed
        sidebarColor: "black", // http://demos.ui-lib.com/egret-doc/#egret-colors
        sidebarCompactToggle: false, // applied when "sidebarStyle" is "compact"
        dir: "ltr", // ltr, rtl
        useBreadcrumb: true,
        topbarFixed: true,
        footerFixed: false,
        topbarColor: "black", // http://demos.ui-lib.com/egret-doc/#egret-colors
        footerColor: "black", // http://demos.ui-lib.com/egret-doc/#egret-colors
        matTheme: "egret-dark-red", // egret-blue, egret-navy, egret-light-purple, egret-dark-purple, egret-dark-pink
        breadcrumb: "simple", // simple, title
        perfectScrollbar: true
      }
    );
  }

  setAppLayout(layoutConf: ILayoutConf) {
    this.layoutConf = { ...this.layoutConf, ...layoutConf };

    //******* Only for demo purpose ***
    this.setLayoutFromQuery();
    //**********************
  }

  publishLayoutChange(lc: ILayoutConf) {
    this.layoutConf = Object.assign(this.layoutConf, lc);
    this.layoutConfSubject.next(this.layoutConf);
  }

  setLayoutFromQuery() {
    let layoutConfString = getQueryParam("layout");
    try {
      this.layoutConf = JSON.parse(layoutConfString);
    } catch (e) { }
  }

  adjustLayout(options: IAdjustScreenOptions = {}) {
    let sidebarStyle: string;
    this.isMobile = this.isSm();
    this.currentRoute = options.route || this.currentRoute;
    sidebarStyle = this.isMobile ? "closed" : "full";

    if (this.currentRoute) {
      this.fullWidthRoutes.forEach(route => {
        if (this.currentRoute.indexOf(route) !== -1) {
          sidebarStyle = "closed";
        }
      });
    }

    this.publishLayoutChange({
      isMobile: this.isMobile,
      sidebarStyle: sidebarStyle
    });
  }
  isSm() {
    return window.matchMedia(`(max-width: 959px)`).matches;
  }
}
