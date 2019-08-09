import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {
  subjectObject = new Subject();
  constructor() { }

  /**
   * 得到侧边栏收缩事件流
   */
  getSideEvent(){
    return this.subjectObject;
  }

  /**
   * 发送 侧边栏收缩事件流 通知
   * @param val 
   */
  sendSideEvent(val){
    this.subjectObject.next(val)
  }
}
