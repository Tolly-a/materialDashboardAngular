import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
   providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'https://map42.gear.host/api/Entity';
  constructor(private httpClient: HttpClient) { }

  getItems(){
   return  this.httpClient.get<any>(this.baseUrl)
    .pipe(map(resp =>  resp.List
     ), catchError(error => {
        return throwError('ERROR FROM GET ITEMS', error)
    }));
  }

  getItem(id: string){
    return this.httpClient.get(`${this.baseUrl}/${id}`)
      .pipe(map(res => res),
           catchError((error)=>{
           return throwError('ERROR FROM GET ITEM BY ID ', error)
      }))
  }

  deleteItem(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(error =>{
        return throwError('ERROR FROM DELETE ITEM', error);
      }));
  }

  addItem(item: any): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}`, item)
    .pipe(
      catchError(error => {
        return throwError("ERROR FROM ADD ITEM",error)
      })
    );
  }

  editItem(item: any): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}`,  item)
      .pipe(
        catchError(error => {
          return throwError('ERROR FROM EDIT ITEM (Edit Item)', error)
        })
      )
  }


}