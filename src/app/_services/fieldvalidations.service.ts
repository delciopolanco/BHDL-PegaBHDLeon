import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FieldValidatorsService {
  constructor() {}

  getValidationError(label, fieldControl, formGroup) {
    let errMessage: string = "";
    if (!fieldControl.valid) {
      const error: AllValidationErrors = this.getFormValidationErrors(
        label,
        formGroup.controls
      ).shift();
      debugger;
      if (error) {
        console.log({ error });
        let text;
        switch (error.error_name) {
          case "required":
            text = `El dato ingresado es requerido!`;
            break;
          case "pattern":
            text = `El dato ingresado no posee un patrón correcto!`;
            break;
          case "email":
            text = `El dato ingresado tiene un formato de correo electrónico equivocado!`;
            break;
          case "min":
            text = `El dato ingresado debe ser mayor que ${error.error_value.min}`;
            break;
          case "max":
            text = `El dato ingresado debe ser menor que ${error.error_value.max}`;
            break;
          case "minlength":
            text = `El dato ingresado debe tener al menos : ${error.error_value.requiredLength} caracteres de largo`;
            break;
          case "maxlength":
            text = `El dato ingresado es muy largo ( maximo: ${error.error_value.requiredLength} caracteres)`;
            break;
          case "areEqual":
            text = `El dato ingresado debe de ser igual!`;
            break;
          default:
            text = `${error.control_name}: ${error.error_name}: ${error.error_value}`;
        }
        errMessage = text;
      }
      return errMessage;
    }
  }

  getFieldValidations(fieldComp) {
    const validationJson = this.getValidationFromJson(fieldComp);
    return this.getFieldValidators(validationJson);
  }

  private getFormValidationErrors(
    label,
    controls: FormGroupControls
  ): AllValidationErrors[] {
    let errors: AllValidationErrors[] = [];
    Object.keys(controls).forEach((key) => {
      const control = controls[key];
      if (control instanceof FormGroup) {
        errors = errors.concat(
          this.getFormValidationErrors(label, control.controls)
        );
      }
      const controlErrors: ValidationErrors = controls[key].errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach((keyError) => {
          errors.push({
            control_name: label,
            error_name: keyError,
            error_value: controlErrors[keyError],
          });
        });
      }
    });
    return errors;
  }

  private getFieldValidators(validations) {
    return validations
      .map((validation) => {
        switch (validation.name) {
          case "maxChars": {
            return validation.value > 0
              ? Validators.maxLength(validation.value)
              : null;
          }
          case "minChars": {
            return validation.value > 0
              ? Validators.minLength(validation.value)
              : null;
          }
          case "required": {
            return validation.value ? Validators.required : null;
          }
          case "min": {
            return validation.value >= 0
              ? Validators.min(validation.value)
              : null;
          }
          case "formatType": {
            return validation.value === "email" ? Validators.email : null;
          }
          case "max": {
            return validation.value > 0
              ? Validators.max(validation.value)
              : null;
          }
          default:
            return null;
        }
      })
      .filter((val) => val !== null);
  }

  private getValidationFromJson(fieldComp) {
    const validation_catalog = [
      "required",
      "maxChars",
      "minChars",
      "min",
      "NoSpecialChars",
      "max",
      "formatType", // can be number, email, date ...
    ];
    let fieldProps = { ...fieldComp };

    if (fieldComp && fieldComp.control && fieldComp.control.modes) {
      const editableModes = fieldComp.control.modes[0];
      fieldProps = { ...fieldProps, ...editableModes };
      if (editableModes.formatType === "number") {
        fieldProps.min = editableModes.minChars;
        fieldProps.max = editableModes.maxChars;
        fieldProps.minChars = 0;
        fieldProps.maxChars = 0;
      }
    }

    const fieldValidationsArray = Object.entries(fieldProps).map((e) => ({
      name: e[0],
      value: e[1],
    }));
    return fieldValidationsArray.filter((fieldObj) =>
      validation_catalog.includes(fieldObj.name)
    );
  }
}

interface AllValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
}

interface FormGroupControls {
  [key: string]: AbstractControl;
}
