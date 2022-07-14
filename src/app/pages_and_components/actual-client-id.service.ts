/* import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActualClientIdService {

  static current_client_id:number

  constructor() { }

  set_id(id:number){
    ActualClientIdService.current_client_id = id
  }

  get_id(){
    return ActualClientIdService.current_client_id
  }
} */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class ActualClientIdService {
    private state$ = new BehaviorSubject<number>(0);

    changeState(myChange:number) {
        this.state$.next(myChange);
    }

    getState() {
        return this.state$.asObservable();
    }
}



