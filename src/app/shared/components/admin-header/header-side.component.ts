import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserType } from 'app/shared/helpers/enum';
import { indexToLanguage, languageToIndex } from 'app/shared/helpers/language';
import { User } from 'app/shared/models/user';
import { IAuthenticationService } from 'authentication-inklusion';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  public availableLangs = [{
    name: 'EN',
    code: 'en',
    flag: 'flag-icon-us'
  }, {
    name: 'PT',
    code: 'pt',
    flag: 'flag-icon-pt'
  }]
  currentLang;

  public themes;
  public layoutConf: any;
  public currentUser: User;

  get UserType() { return UserType; }

  constructor(
    @Inject('AuthService') private authenticationService: IAuthenticationService,
    private layout: LayoutService,
    public translate: TranslateService,
    private router: Router,
  ) {
    this.currentUser = this.authenticationService.currentUserValue as User;
    let lang;
    if (this.currentUser != null) {
      lang = indexToLanguage(this.currentUser.language);
    } else {
      if (this.translate.currentLang === undefined) {
        const language = localStorage.getItem('user-language');
        if (language == null) {
          lang = 'en';
        } else {
          lang = language;
        }
      } else {
        lang = this.translate.currentLang;
      }
    }

    const findLang = this.availableLangs.find(item => item.code.toUpperCase() == lang.toUpperCase());
    this.currentLang = findLang;
  }

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang.code);
  }
  setLang(lng) {
    this.currentLang = lng;
    this.translate.use(lng.code);
    localStorage.setItem("user-language", lng.code)
    this.authenticationService.updateLanguage(languageToIndex(lng.code));
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      })
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    })

  }

  logout() {
    this.authenticationService.currentUserValue;
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}