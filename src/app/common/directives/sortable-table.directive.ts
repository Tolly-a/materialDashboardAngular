import { Directive, OnInit,EventEmitter,Output,OnDestroy,Input, ElementRef, Renderer2 } from '@angular/core';
import { SortColumnService } from '../services/sort-column.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[sortColumn]'
})
export class SortableTableDirective implements OnInit {

  constructor(private SortColumnService: SortColumnService,
      private el: ElementRef, private renderer: Renderer2) { }

  @Input() data: any[];
  @Input('sortKey') key: any;
  private toggleSort: boolean = false;

  @Output() sorted = new EventEmitter();
  private columnSortedSubscription: Subscription;

  ngOnInit(){
    this.renderer.listen(this.el.nativeElement, 'click', (event) => {
      let parentNode = this.el.nativeElement.parentNode;
      let children = parentNode.children;

      if(this.data && this.key){
        this.sortArray();
      }

      this.toggleSort = !this.toggleSort;
    })
    this.columnSortedSubscription = this.SortColumnService.columnSorted$.subscribe(event => {
      this.sorted.emit(event);
    });
  }

  sortArray(): Array<any> {
    let tempArray: Array<any> = this.data;
    tempArray.sort((a, b) => {
     //let aKey = a[this.key];
      let str1: string = a[this.key]; //.toLowerCase()
      let str2: string = b[this.key]; //.toLowerCase()
      if(this.toggleSort){
      
        if(str1 < str2){
          return -1;
        }
        if(str1 > str2){
          return 1;
        }
      } else {
        if(str1 > str2){
          return -1;
        }
        if(str1 < str2){
          return 1;
        }
      }
      return 0;
    });
    return tempArray;
  }

}
