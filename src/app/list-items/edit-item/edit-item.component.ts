import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { ApiService } from "../../common/services/api.service";
import { isNullOrUndefined } from "util";
import { ActivatedRoute, Params } from "@angular/router";
//services
import { InfoService } from "../../common/services/info.service";
import { ToastrService } from "ngx-toastr";
//model
import { Item } from "./../../common/models/item.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-item",
  templateUrl: "./edit-item.component.html",
  styleUrls: ["./edit-item.component.scss"]
})
export class EditItemComponent implements OnInit, OnDestroy {
  editItemForm: FormGroup;
  filingDate: Date | string;
  isPrivate: boolean;
  datePickerError: boolean = false;
  Id: string;
  item: Item;
  sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private infoService: InfoService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.Id = params["id"];
    });

    this.apiService.getItem(this.Id).subscribe((res: Item) => {
      this.item = res;

      if (this.item.Date) {
        this.filingDate = this.item.Date;
      } else {
        this.filingDate = null;
      }

      this.isPrivate = this.item.IsPrivate;

      setTimeout(() => {
        this.editItemForm = new FormGroup({
          name: new FormControl(this.item.Name, [
            Validators.required,
            Validators.maxLength(100)
          ]),
          description: new FormControl(this.item.Description),
          amount: new FormControl(this.item.Amount, [Validators.max(999999)])
        });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (!isNullOrUndefined(this.filingDate)) {
      this.filingDate = moment(this.filingDate, "M/D/YYYY H:mm")
        .format("x")
        .valueOf();
    }

    const newItem = {
      Id: this.item.Id,
      Name: this.editItemForm.value.name,
      Date: this.filingDate,
      Description: this.editItemForm.value.description,
      Amount: this.editItemForm.value.amount,
      IsPrivate: this.isPrivate
    };

    this.apiService.editItem(newItem).subscribe(res => {
      this.toastr.success(`Item ${this.item.Name} Sccessfully Updated`);
      this.infoService.setSubject("ItemEdited");
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
    this.router.navigate(["/list-items"]);
  }
}
