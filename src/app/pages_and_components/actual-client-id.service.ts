import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActualClientIdService {

  current_client_id:number = 0

  constructor() { }

  set_id(id:number){
    this.current_client_id = id
  }

  get_id(){
    return this.current_client_id
  }
}



