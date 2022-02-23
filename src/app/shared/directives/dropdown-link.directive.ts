import {
  Directive, HostBinding, Input
} from '@angular/core';


@Directive({
  selector: '[appDropdownLink]'
})
export class DropdownLinkDirective {

  @Input() public group: any;

  @HostBinding('class.open')
  @Input()
  get open(): boolean {
    return this._open;
  }

  set open(value: boolean) {
    this._open = value;
    if (value) {
      // this.nav.closeOtherLinks(this);
    }
  }

  protected _open: boolean;
  // protected nav: AppDropdownDirective;

  // public constructor(@Inject(AppDropdownDirective) nav: AppDropdownDirective) {
  public constructor() {
    // this.nav = nav;
    this._open = true;
  }

  public ngOnInit(): any {
    // this.nav.addLink(this);
  }

  public ngOnDestroy(): any {
    // this.nav.removeGroup(this);
  }

  public toggle(): any {
    this.open = !this.open;
  }

}
