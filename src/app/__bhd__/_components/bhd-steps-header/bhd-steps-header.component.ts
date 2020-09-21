import { Component, Input } from "@angular/core";

@Component({
  selector: "bhd-steps-header",
  template: `
    <header class="offers-steps-header ion-text-center">
      <bhd-steps
        [total]="totalSteps"
        [current]="currentStep"
        *ngIf="showSteps"
      ></bhd-steps>
    </header>
  `,
  styles: [
    `
      .offers-steps-header {
        background-color: #6666;
        padding: 1.5rem 1rem;
      }
    `,
  ],
})
export class BhdStepsHeaderComponent {
  @Input() showSteps = true;
  @Input() totalSteps: number;
  @Input() currentStep: number;
}
