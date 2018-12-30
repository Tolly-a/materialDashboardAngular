import {
  Component,
  OnChanges,
  forwardRef,
  HostBinding,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject, Host, Output
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  Validator
} from '@angular/forms';

import * as moment from 'moment';

// //test
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnChanges, ControlValueAccessor, Validator{

  
  @ViewChild('appDatePickerControl', { read: ElementRef }) inputElement: ElementRef;

  _formControl = new FormControl();
  
  @Input() filingDate? : any;
  @Input() label = 'Choose a date';
  @Input() required?= false;
  @Input() disabled?= false;
  @Input() autofocus?= false;
  @Input() allowFutureDates?= true;
  @Output() dateHasError = new EventEmitter();
  @Output() newDate = new EventEmitter();

  datePickerEvent: Date;

  maxDate;
  innerValue;

  onChange: any = () => { };
  onTouched: any = () => { };

  focus() {
    this.inputElement.nativeElement.focus();
  }

  //test
  addEvent(type: string, event:MatDatepickerInputEvent<Date>){
    this.datePickerEvent = event.value;
    if(this.datePickerEvent){
      this.dateHasError.emit(false);    
      this.newDate.emit(this.datePickerEvent);
    }
  }


  ngOnChanges() {
    this.maxDate = this.allowFutureDates ? null : new Date();
  }

  writeValue(value: any) {
    this.innerValue = value;
    this._formControl.setValue(this.innerValue);
    this.filingDate = moment.parseZone(this.innerValue);
  }

  // This needs to be wired to the dateChange event and not dateInput event so that
  // the changed value is only bubbled up when the user changes focus or selects from
  // the popup calendar and not on each key stroke
  onDateChange(event) {
    this.onChange(event.value);
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    if (isDisabled) {
      this._formControl.disable();
    } else {
      this._formControl.enable();
    }
  }

  validate(control: FormControl) {
    const errors = Object.assign({}, this._formControl.errors || {});
    return Object.keys(errors).length && this._formControl.invalid ? errors : null;
  }
  
  onBlur($event) {
    if ($event.target && $event.target.value && $event.target.value.length === 8 && !isNaN($event.target.value)) {
      const val: String = $event.target.value;
      const month = val.slice(0, 2);
      const day = val.slice(2, 4);
      const year = val.slice(4);
      this.innerValue = new Date(`${month}/${day}/${year}`);
      this._formControl.setValue(this.innerValue);
      this._formControl.updateValueAndValidity();
      this.onChange(this.innerValue);
    }
    if ($event.target && $event.target.value && isNaN($event.target.value)) {
      let inputValue = $event.target.value;
      if(typeof(inputValue) === 'string'){
        const regexp = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;
        if(regexp.test(inputValue)) {
            return null;
          } else {
            this._formControl.setErrors({forbiddenName: true});
             this.dateHasError.emit(true);
          } 
          return null;
        }
      }
    if (this._formControl.hasError('matDatepickerParse') || this._formControl.hasError('forbiddenName')) {
      this._formControl.setValue(null);
      this._formControl.setErrors({forbiddenName: true});
      this._formControl.updateValueAndValidity();
    }
    this.dateHasError.emit(false);
    this.onTouched();
  }
}
