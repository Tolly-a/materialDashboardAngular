import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Item } from '../models/item.model';
 
@Injectable({
    providedIn: 'root'
})

export class InfoService{

    private infoServiceSubject = new BehaviorSubject<string>('');

    setSubject (subject: string){
        this.infoServiceSubject.next(subject);
    }

    getSubject():Observable<string>{
        return this.infoServiceSubject.asObservable();
    }
}