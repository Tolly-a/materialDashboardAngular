import { Routes } from "@angular/router";

import { ListItemsComponent } from "../../list-items/list-items.component";
import { CreateItemComponent } from "./../../list-items/create-item/create-item.component";
import { EditItemComponent } from "./../../list-items/edit-item/edit-item.component";
import { ItemDetailsComponent } from "./../../list-items/item-details/item-details.component";

export const AdminLayoutRoutes: Routes = [
  { path: "", redirectTo: "list-items", pathMatch: "full" },
  { path: "list-items", component: ListItemsComponent },
  { path: "create-item", component: CreateItemComponent },
  { path: "edit-item/:id", component: EditItemComponent },
  { path: "item-details/:id", component: ItemDetailsComponent }
];
