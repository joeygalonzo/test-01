import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../app/shared/shared.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    app.buildSearchTextForm();
    fixture.detectChanges();
  });

  //creation of app component
  it('should create the app', () => {   
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Word Position Finder'`, () => {
    expect(app.title).toEqual('Word Position Finder');
  });

  it('should render title', () => {
    let formTitle = fixture.nativeElement;
    expect(formTitle.querySelector('h1').textContent).toContain('Word Position Finder');
  });  

  it('should render Result label', () => {
    let resLabel = fixture.nativeElement;
    expect(resLabel.querySelector('#resultLabel').textContent).toContain('Result:');    
  });

  it('should render Submit button', () => {
    let compiled = fixture.nativeElement;
    expect(compiled.querySelector('#btnSubmit').textContent).toContain('SUBMIT');    
  });

  it('should disable Submit button when Form is not valid.', () => {
    app.searchTextForm.get('main_text').setValue(null);
    app.searchTextForm.get('sub_text').setValue(null);

    expect(app.searchTextForm.valid).toBeFalsy();

    fixture.detectChanges();

    let btnToTest = fixture.debugElement.nativeElement.querySelector('#btnSubmit');
    expect(btnToTest.disabled).toBeTruthy();
  });

  it('should only enable Submit button when Form is valid.', () => {
    app.searchTextForm.get('main_text').setValue('Bowling is my favorite sports');
    app.searchTextForm.get('sub_text').setValue('favorite');

    expect(app.searchTextForm.valid).toBeTruthy();

    fixture.detectChanges();

    let btnToTest = fixture.debugElement.nativeElement.querySelector('#btnSubmit');
    expect(btnToTest.disabled).toBeFalsy();    
  });

  it('should display List of Positions matching sub text from main text upon clicking Submit button.', () => {
    app.searchTextForm.get('main_text').setValue('The optimist sees opportunity in every difficulty.');
    app.searchTextForm.get('sub_text').setValue('optimist');

    expect(app.searchTextForm.valid).toBeTruthy();

    fixture.detectChanges();

    let btnToTest = fixture.debugElement.nativeElement.querySelector('#btnSubmit');
    expect(btnToTest.disabled).toBeFalsy();    
     
    btnToTest.click();

    fixture.detectChanges();

    let posList = fixture.nativeElement;
    expect(posList.querySelector('#positionList').textContent).toEqual('4');    
  });

  //form validations
  it('should make form invalid with error required if main text is null', () => {
    app.searchTextForm.get('main_text').setValue(null);
    app.searchTextForm.get('sub_text').setValue('brown');

    expect(app.searchTextForm.valid).toBeFalsy();
    expect(app.searchTextForm.controls['main_text'].valid).toBeFalsy();
    expect(app.searchTextForm.controls['main_text'].errors['required']).toBeDefined();
  });

  it('should make form invalid with error required if sub text is null', () => {
    app.searchTextForm.get('main_text').setValue('the quick brown fox jumps over the lazy dog.');
    app.searchTextForm.get('sub_text').setValue(null);

    expect(app.searchTextForm.valid).toBeFalsy();
    expect(app.searchTextForm.controls['sub_text'].valid).toBeFalsy();
    expect(app.searchTextForm.controls['sub_text'].errors['required']).toBeDefined();
  });

  it('should make form invalid with error exceedLength if sub text length exceeded main text length', () => {
     app.searchTextForm.get('main_text').setValue('jumps');
     app.searchTextForm.get('sub_text').setValue('the quick brown fox jumps over the lazy dog.');

     expect(app.searchTextForm.valid).toBeFalsy();
     expect(app.searchTextForm.controls['sub_text'].valid).toBeFalsy();
     expect(app.searchTextForm.controls['sub_text'].errors['exceedLength']).toBeDefined();
  });

});
