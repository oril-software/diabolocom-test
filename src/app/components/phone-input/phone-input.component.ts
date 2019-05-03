import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PhoneInputComponent),
    multi: true
  }]
})
export class PhoneInputComponent implements OnInit, ControlValueAccessor {

  constructor() { }

  ngOnInit() { }

  onChange: any = () => { }
  onTouch: any = () => { }
  // val = "" // this is the updated value that the class accesses
  set value(val) {  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.onChange(val)
    this.onTouch(val)
  }

  // this method sets the value programmatically
  writeValue(value: any) {
    this.value = value;
  }
  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: any) {
    this.onChange = fn
  }
  // upon touching the element, this method gets triggered
  registerOnTouched(fn: any) {
    this.onTouch = fn
  }

  onlyNumber(e) {
    return (e.charCode >= 48 && e.charCode <= 57) || e.charCode === 43
  }

}
