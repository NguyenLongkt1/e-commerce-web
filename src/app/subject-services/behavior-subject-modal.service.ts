import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectModalService {
  constructor() { }

  private showModalLoginState = new BehaviorSubject<boolean>(false);
  showModalLoginState$ = this.showModalLoginState.asObservable();
  openModal(){
    this.showModalLoginState.next(true);
  }

  closeModal(){
    this.showModalLoginState.next(false);
  }
}