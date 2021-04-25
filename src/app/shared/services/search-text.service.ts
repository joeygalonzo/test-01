
/* Author:       Joselito G. Alonzo
   Date Created: April 17, 2021
   Description : This service is being used by app component for any process
                 related to text searching.
*/

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SearchTextService {

  constructor() { }
  
  /*
   Description - This function determines the character positions of the beginning
   of each match for the subtext within the main text.

   Note: It is based on zero-based index. i.e. the first character is 0 not 1.

   Parameters:

   mainText: string - the source text where the subtext will be searched.

   subText: string - the text to be searched within the source text.

   Return:
     string - list of comma delimited positions of subtext that match in main text
  */
  getAllPositionsOfText(mainText: string, subText: string): string {
    //do not allow null values for main text and sub text
    if ((!mainText) || (!subText)) {
      return null;
    }
    let positionList: string = null; // string to be returned containing comma delimited positions of matched subtext.
    let currentPointer: number = 0; // serves as pointer traversing the main text from start to end.

    //loop through main text from beginning to end
    //while storing position for every match of sub text to main text
    while(currentPointer < mainText.length) {
      //check if there is matched sub text from the current pointer
      if (mainText.substring(currentPointer, currentPointer + subText.length).toLowerCase() === subText.toLowerCase()) {
        
        //concatenate the current pointer value to list of comma delimited position of matched subtext
        if(positionList === null)
           positionList = currentPointer.toString(); // no comma for the first match.
        else
           positionList += ", " + currentPointer.toString(); //put comma delimiter on succeding match

        // move pointer to next character after the last character 
        //of the current match of sub text.
        currentPointer += subText.length;  
      } 
      else 
        currentPointer++; // if there is no match then move to next character.
    }

    return positionList; //contains list of comma delimited positions of matched subtext
  }
}
