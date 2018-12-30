import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
    providedIn: 'root'
 }) 
export class SortColumnService{
    constructor(){}

    private columnSortedSource = new Subject<ColumnSortedEvent>();

    columnSorted$ = this.columnSortedSource.asObservable();

    columnSorted(event: ColumnSortedEvent){
        this.columnSortedSource.next(event);
    }
}

export interface ColumnSortedEvent{
    sortColumn: string;
    sortDirection: string;
}