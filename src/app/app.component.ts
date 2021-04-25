import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchTextService } from './shared/services/search-text.service';
import { checkLengthValidator } from './shared/helpers/custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Word Position Finder'; 
  
  searchTextForm: FormGroup;
  textPositionsDisplay: string = null;   

  constructor(
    private fb : FormBuilder,
    private searchTextService: SearchTextService    
  ) { }

  ngOnInit(): void {
    this.buildSearchTextForm();
   }

   buildSearchTextForm(){
    this.searchTextForm = this.fb.group({
      main_text: [null, Validators.required],
      sub_text: [null, Validators.required]
    }, {validator: checkLengthValidator("sub_text", "main_text")}); 
  }
  
  //this method is called in template to display the corresponding 
  //error message to user.
  getErrorMessage(fieldName: string) {
    if (this.searchTextForm.get(fieldName).hasError('required')) 
       return 'This field is required.'; 
    if (this.searchTextForm.get(fieldName).hasError('exceedLength')) 
       return 'Length of word to be searched must not exceed main text.';    
  }

  onClickSubmit(){
    this.textPositionsDisplay = this.searchTextService.getAllPositionsOfText(this.searchTextForm.get('main_text').value, this.searchTextForm.get('sub_text').value);    
  }
}
