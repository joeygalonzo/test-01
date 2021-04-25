import { TestBed } from '@angular/core/testing';
import { SearchTextService } from './search-text.service';

describe('SearchTextService', () => {
  let service: SearchTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTextService);    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllPositionOfText to return null if main text is null', () => {
    let result = service.getAllPositionsOfText(null,"chess");
    expect(result).toBe(null);
  });

  it('should call getAllPositionOfText to return null if sub text is null', () => {
   let result = service.getAllPositionsOfText("Keep it simple.",null);
   expect(result).toBe(null);
  });

  it('should call getAllPositionOfText to return null if no match was found.', () => {
    let result = service.getAllPositionsOfText("Beauty is in the eye of the beholder.","tongue");
    expect(result).toBe(null);
  });

  it('should call getAllPositionOfText to return all zero-based index positions of sub-text within the main text if there is any match.', () => {
     let result = service.getAllPositionsOfText("Time is money. Use your time wisely. Now is the right time.","Time");
     expect(result).toBe("0, 24, 54");
  }); 

});
