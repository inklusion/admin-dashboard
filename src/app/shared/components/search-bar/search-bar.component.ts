import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() allItems = [];
  @Input() itemType: string;
  @Input() disableButton: boolean;
  @Input() filterOptions: string[];
  @Input() fieldsToSearchBy: string[];
  @Input() translationPrefix: string;
  @Input() isAddAction: boolean;
  @Output() addAction = new EventEmitter();
  @Output() onFilterUpdate = new EventEmitter();

  public currentText: string = "";
  private currentSelect: number = -1;

  constructor() { }

  ngOnInit(): void {
    if (this.filterOptions == null || this.filterOptions == undefined) {
      this.filterOptions = [];
    }

    if (this.isAddAction == null || this.isAddAction == undefined) {
      this.isAddAction = true;
    }

    if (this.fieldsToSearchBy) {
      this.fieldsToSearchBy = this.fieldsToSearchBy.map(x => x.toUpperCase());
    }
  }

  filterByType(event) {
    const filterValue = event.value;
    this.currentSelect = parseInt(filterValue, 10);

    this.filterData();
  }


  filterByText(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentText = filterValue.toLowerCase().trim();

    this.filterData();
  }


  filterData() {
    if (this.allItems.length == 0) {
      this.onFilterUpdate.emit({ text: this.currentText });
      return;
    }

    let data = this.allItems;
    if (this.currentSelect != -1) {
      data = [...this.allItems].filter(item => {
        return item.shippingStatus == this.currentSelect; //TODO: Este campo aqui não pode ser sempre o "shipping Status!!"
      });
    }
    this.onFilterUpdate.emit({ data, text: this.currentText });
  }

  onAddButtonClick(): void {
    this.addAction.emit(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allItems'] && changes['allItems'].currentValue != changes['allItems'].previousValue) {
      this.allItems = changes['allItems'].currentValue;
    }
  }
}
