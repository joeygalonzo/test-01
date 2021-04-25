import { AbstractControl, FormGroup } from "@angular/forms";

/*this custom validator will return exceedLength error 
 if sub text length exceeded length of main text
 otherwise null or no error 
*/
export function checkLengthValidator(controlName: string, matchControlName: string) {
    return (formGroup: FormGroup) => {
      
      let targetControl: AbstractControl  = formGroup.controls[controlName];
      let sourceControl: AbstractControl = formGroup.controls[matchControlName];
    
      //if there is error other than exceedLength then ignore it.
      if ((targetControl.errors && !targetControl.errors.exceedLength) || (sourceControl.errors && !sourceControl.errors.exceedLength)) {
        return;
      }      
      
      let targetControlStr: string = targetControl.value;
      let sourceControlStr: string = sourceControl.value;      
      
      //set exceedLength error if target length exceeded source length
      if (targetControlStr.length > sourceControlStr.length) 
         targetControl.setErrors({ exceedLength: true });
      else
         targetControl.setErrors(null)
    };
  }


