import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bhd-header',
  templateUrl: './bhd-header.component.html',
  styleUrls: ['./bhd-header.component.css']
})
export class BhdHeaderComponent {
  @Input() title;
  @Output() cancelButton: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  cancelButtonClick() {
    this.cancelButton.emit();
  }

}
