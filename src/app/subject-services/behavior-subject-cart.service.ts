import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectCartService {

  constructor() { }

  private itemCount = new BehaviorSubject<number>(0);
  itemCount$ = this.itemCount.asObservable();

  private fakeItem = new BehaviorSubject<any>({});
  fakeItem$ = this.fakeItem.asObservable();
  private currentCount = 0;

  addItem(productId:any) {
    this.currentCount++;
    this.itemCount.next(this.currentCount);
  }

  resetCart() {
    this.currentCount = 0;
    this.itemCount.next(this.currentCount);
  }

  addFakeItem(item:any){
    this.fakeItem.next(item)
  }

}
