import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class ActualClientIdService {
  private state$ = new BehaviorSubject<number>(0);

  changeState(myChange: number) {
    this.state$.next(myChange);
  }

  getState() {
    return this.state$.asObservable();
  }
}



