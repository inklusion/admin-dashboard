import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'app/shared/services/layout.service';
import { Subscription } from "rxjs";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.template.html',
  styleUrls: ['./admin-layout.scss'],
  encapsulation: ViewEncapsulation.None
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  public isModuleLoading: Boolean = false;
  private moduleLoaderSub: Subscription;
  private layoutConfSub: Subscription;
  private routerEventSub: Subscription;

  public scrollConfig = {}
  public layoutConf: any = {};
  public adminContainerClasses: any = {};

  constructor(
    private router: Router,
    public translate: TranslateService,
    private layout: LayoutService,
    private cdr: ChangeDetectorRef,
  ) {
    // Close sidenav after route change in mobile
    this.routerEventSub = router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((routeChange: NavigationEnd) => {
        this.layout.adjustLayout({ route: routeChange.url });
        this.scrollToTop();
      });
  }

  ngOnInit() {
    this.layoutConfSub = this.layout.layoutConf$.subscribe((layoutConf) => {
      this.layoutConf = layoutConf;

      this.adminContainerClasses = this.updateAdminContainerClasses(this.layoutConf);
      this.cdr.markForCheck();
    });

    // FOR MODULE LOADER FLAG
    this.moduleLoaderSub = this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.isModuleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.isModuleLoading = false;
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.layout.adjustLayout(event);
  }

  ngAfterViewInit() {

  }

  scrollToTop() {
    if (document) {
      setTimeout(() => {
        let element;
        if (this.layoutConf.topbarFixed) {
          element = <HTMLElement>document.querySelector('#rightside-content-hold');
        } else {
          element = <HTMLElement>document.querySelector('#main-content-wrap');
        }
        element.scrollTop = 0;
      })
    }
  }
  ngOnDestroy() {
    if (this.moduleLoaderSub) {
      this.moduleLoaderSub.unsubscribe();
    }
    if (this.layoutConfSub) {
      this.layoutConfSub.unsubscribe();
    }
    if (this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }
  closeSidebar() {
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  sidebarMouseenter(_) {
    if (this.layoutConf.sidebarStyle === 'compact') {
      this.layout.publishLayoutChange({ sidebarStyle: 'full' });
    }
  }

  sidebarMouseleave(_) {
    if (
      this.layoutConf.sidebarStyle === 'full' &&
      this.layoutConf.sidebarCompactToggle
    ) {
      this.layout.publishLayoutChange({ sidebarStyle: 'compact' });
    }
  }

  updateAdminContainerClasses(layoutConf) {
    return {
      'navigation-top': layoutConf.navigationPos === 'top',
      'sidebar-full': layoutConf.sidebarStyle === 'full',
      'sidebar-compact': layoutConf.sidebarStyle === 'compact' && layoutConf.navigationPos === 'side',
      'compact-toggle-active': layoutConf.sidebarCompactToggle,
      'sidebar-compact-big': layoutConf.sidebarStyle === 'compact-big' && layoutConf.navigationPos === 'side',
      'sidebar-opened': layoutConf.sidebarStyle !== 'closed' && layoutConf.navigationPos === 'side',
      'sidebar-closed': layoutConf.sidebarStyle === 'closed',
      'fixed-topbar': layoutConf.topbarFixed && layoutConf.navigationPos === 'side'
    }
  }

}