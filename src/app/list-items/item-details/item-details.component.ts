import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
//model
import { Item } from './../../common/models/item.model';

//service
import { ApiService } from './../../common/services/api.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  
  Id: string;
  item:Item;
  
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params) => {
      this.Id = params['id'];

      this.apiService.getItem(this.Id)
        .subscribe((res: Item) => {
          this.item = res;
        });
    })
  }

}
