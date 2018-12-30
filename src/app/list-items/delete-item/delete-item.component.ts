import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-delete-item",
  templateUrl: "./delete-item.component.html",
  styleUrls: ["./delete-item.component.scss"]
})
export class DeleteItemComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit() {}

  onCloseCoinfirm() {
    this.dialogRef.close("Confirm");
  }

  onCloseCancel() {
    this.dialogRef.close("Cancel");
  }
}
