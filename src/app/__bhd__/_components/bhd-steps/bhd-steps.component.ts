import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "bhd-steps",
  templateUrl: "./bhd-steps.component.html",
  styleUrls: ["./bhd-steps.component.scss"],
})
export class BhdStepsComponent implements OnInit {
  @Input() total: number;
  @Input() current: number;

  public stepsArray = [];

  constructor() {}

  ngOnInit() {
    this.setStepItems();
  }

  private setStepItems() {
    let className = "";

    for (let indx = 0; indx < this.total; indx++) {
      if (indx < this.current) {
        className = "active";
      }
      this.stepsArray.push({
        className: className,
      });
      className = "";
    }
  }
}
