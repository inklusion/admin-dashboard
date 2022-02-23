import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackdropService } from './backdrop.service';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent implements OnInit {
  showBackdrop$: Observable<boolean>;

  constructor(
    private backdropService: BackdropService,
  ) { }

  ngOnInit(): void {
    this.showBackdrop$ = this.backdropService.backdropStatus.pipe(map(x => x));
    // this.backdropSub = this.backdropService.backdropStatus.subscribe(state => {
    //   this.showBackdrop = state;
    //   if (!state) {
    //     this.searchBarVisible = false;
    //   }
    // });
  }

  clickOnBackdrop() {
    this.backdropService.hideBackdrop();
  }

}
