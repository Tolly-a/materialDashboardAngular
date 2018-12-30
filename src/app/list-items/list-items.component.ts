import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
//models
import { Item } from "../common/models/item.model";
//services
import { ApiService } from "./../common/services/api.service";
import { InfoService } from "./../common/services/info.service";

@Component({
  selector: "list-items",
  templateUrl: "./list-items.component.html",
  styleUrls: ["./list-items.component.css"]
})
export class ListItemsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  items: Item[] = null;

  constructor(
    private apiService: ApiService,
    private infoService: InfoService
  ) {}

  ngOnInit() {
    this.getAllItems();
    this.sub = this.infoService.getSubject().subscribe(subject => {
      if (
        subject === "ItemDeleted" ||
        subject === "ItemAdded" ||
        subject === "ItemEdited"
      )
        this.getAllItems();
    });
  }

  private getAllItems() {
    this.apiService.getItems().subscribe((res: Item[]) => {
      this.items = res;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
