import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchTextService } from './services/search-text.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
   MatCardModule,
   MatIconModule,
   MatButtonModule,
   MatFormFieldModule,
   MatInputModule,
   ReactiveFormsModule,
   FlexLayoutModule
  ],
  providers: [
    SearchTextService
  ]
})
export class SharedModule { }
