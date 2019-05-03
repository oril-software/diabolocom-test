import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PhonepickerComponent, ToSelectItemPipe } from './components/phonepicker/phonepicker.component';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';

@NgModule({
  declarations: [
    AppComponent,
    PhonepickerComponent,
    PhoneInputComponent,
    ToSelectItemPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
