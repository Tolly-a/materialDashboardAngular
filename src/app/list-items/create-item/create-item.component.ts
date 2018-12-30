import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { ApiService } from "../../common/services/api.service";
//import { routerNgProbeToken } from '@angular/router/src/router_module';
import { isNullOrUndefined } from "util";
//toastr
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-create-item",
  templateUrl: "./create-item.component.html",
  styleUrls: ["./create-item.component.scss"]
})
export class CreateItemComponent implements OnInit {
  createItemForm: FormGroup;
  filingDate: Date;
  isPrivate: boolean; //chackBox
  datePickerError: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.isPrivate = false;
    this.filingDate = null;
    this.createItemForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(100)
      ]),
      description: new FormControl(""),
      amount: new FormControl(0, [Validators.max(999999)])
    });
  }

  onSubmit() {
    let dateTicks = null;
    if (!isNullOrUndefined(this.filingDate)) {
      dateTicks = moment(this.filingDate, "M/D/YYYY H:mm")
        .format("x")
        .valueOf();
    }
    const newItem = {
      Name: this.createItemForm.value.name,
      Date: dateTicks,
      Description: this.createItemForm.value.description,
      Amount: this.createItemForm.value.amount,
      IsPrivate: this.isPrivate
    };
    this.apiService.addItem(newItem).subscribe(res => {
      this.toastr.success(`Item ${newItem.Name} Sccessfully Created`);
      this.router.navigate(["./list-items"]);
    });
  }

  onCheckboxChange(event) {
    this.isPrivate = event.checked;
  }
  onDatePickerHasError(error: boolean) {
    this.datePickerError = error;
  }

  onDatepikerDate(newDate: Date) {
    this.filingDate = newDate;
  }

  cancel() {
    this.isPrivate = false;
    this.filingDate = null;
    this.createItemForm.reset();
    this.router.navigate(["./list-items"]);
  }
}
