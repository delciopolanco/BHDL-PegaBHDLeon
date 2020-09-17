import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
} from "@angular/core";
import { FormGroup, Validators, ValidatorFn } from "@angular/forms";
import { GetChangesService } from "../../_messages/getchanges.service";
import { ChangeDetectorRef } from "@angular/core";
import { FieldValidatorsService } from "src/app/_services/fieldvalidations.service";

@Component({
  selector: "app-field",
  templateUrl: "./field.component.html",
  styleUrls: ["./field.component.scss"],
})
export class FieldComponent implements OnInit {
  @Input() fieldComp: any;
  @Input() formGroup: FormGroup;
  @Input() noLabel: boolean;
  @Input() CaseID: string;
  @Input() RefType$: string;

  validations: ValidatorFn[] = [];

  constructor(
    private gcservice: GetChangesService,
    private cdRef: ChangeDetectorRef,
    private fieldValidation: FieldValidatorsService
  ) {}

  ngOnInit() {
    this.validations = this.fieldValidation.getFieldValidations(this.fieldComp);
  }
}
