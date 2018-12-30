import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { ListItemsComponent } from "../../list-items/list-items.component";
import { ItemComponent } from "./../../list-items/item/item.component";
import { CreateItemComponent } from "./../../list-items/create-item/create-item.component";
import { EditItemComponent } from "../../list-items/edit-item/edit-item.component";
import { DeleteItemComponent } from "../../list-items/delete-item/delete-item.component";
import { ItemDetailsComponent } from "../../list-items/item-details/item-details.component";
import { DatePickerComponent } from "../../common/components/date-picker/date-picker.component";
import { SortableTableDirective } from "../../common/directives/sortable-table.directive";

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatDialogModule,
  MatNativeDateModule
} from "@angular/material";

import { MatMomentDateModule } from "@angular/material-moment-adapter";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatMomentDateModule
  ],
  declarations: [
    ListItemsComponent,
    ItemComponent,
    CreateItemComponent,
    EditItemComponent,
    DeleteItemComponent,
    ItemDetailsComponent,
    DatePickerComponent,
    SortableTableDirective
  ],
  entryComponents: [DeleteItemComponent],
  providers: [MatNativeDateModule]
})
export class AdminLayoutModule {}
