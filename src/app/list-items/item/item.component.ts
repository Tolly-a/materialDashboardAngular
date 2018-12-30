import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
//toastr
import { ToastrService } from "ngx-toastr";
//models
import { Item } from "../../common/models/item.model";
//dialog component
import { DeleteItemComponent } from "../../list-items/delete-item/delete-item.component";
//services
import { ApiService } from "./../../common/services/api.service";
import { InfoService } from "../../common/services/info.service";

@Component({
  selector: "[app-item]",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent implements OnInit, OnDestroy {
  dialogResult = "";
  @Input() item: Item;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private dialog: MatDialog,
    private infoService: InfoService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.item.Date.valueOf() === 0) {
      this.item.Date = "";
    }
  }
  editItem() {
    this.router.navigate(["/edit-item", this.item.Id]);
  }

  openDialog(item: any) {
    let dialogRef = this.dialog.open(DeleteItemComponent, {
      width: "500px",
      data: `Are you sure you want to delete the ${item.Name}`
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;

      if (this.dialogResult === "Confirm") {
        this.apiService.deleteItem(this.item.Id).subscribe(res => {
          this.infoService.setSubject("ItemDeleted");
          this.toastr.success(`Item ${this.item.Name} Sccessfully Deleted`);
          this.router.navigate(["/list-items"]);
        });
      }
    });
  }

  ngOnDestroy() {}
}
