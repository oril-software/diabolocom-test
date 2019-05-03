import { Component, OnInit, Pipe, PipeTransform, OnChanges, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SelectItem} from 'primeng/api';
import { FormBuilder, FormControl } from '@angular/forms';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

interface Country {
  name: string;
  alpha2Code: string;
  callingCodes: Array<number>;
}

@Component({
  selector: 'app-phonepicker',
  templateUrl: './phonepicker.component.html',
  styleUrls: ['./phonepicker.component.scss'],
})
export class PhonepickerComponent implements OnInit {

  countriesAPIUrl = 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;callingCodes';

  countries: Country[];
  selected: any;
  isCalling: boolean = false;
  phone: any;

  PhoneValidator = (control: FormControl) => { 
    let phone = control.value; 
    if(phone){
      const phoneNumber = parsePhoneNumberFromString(`+${this.selected.callingCodes[0]}${phone}`);
      if(phoneNumber && phoneNumber.isValid()){
        return null;
      }
      else{
        return { invalidNumber : true };
      }    
    }
    else{
      return { emptyField: true }
    }
  }

  phoneForm = this.formBuilder.group({
    phoneNumber: ['', [this.PhoneValidator]]
  });

  constructor(
    private http: HttpClient,
    public formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.http.get(this.countriesAPIUrl).subscribe((data: Country[]) => {
      this.countries = data;
      this.selected = data[0];
    });
  }

  onSubmit(){
    this.isCalling = true;
    let code = this.selected.callingCodes[0];
    let number = this.phoneForm.controls.phoneNumber.value;
    this.phone = parsePhoneNumberFromString(`+${code}${number}`);
    setTimeout( () => {
      this.isCalling = false;
    }, 2000);
  }
}

@Pipe({ name: 'toSelectItem' })
export class ToSelectItemPipe implements PipeTransform {

  public transform(countries: Country[]): SelectItem[] {
    if (!countries) return undefined;
    return countries.map(c => ({ label: c.name, value: c, code: c.alpha2Code.toLowerCase() }));
  }
}
