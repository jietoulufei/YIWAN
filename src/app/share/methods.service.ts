import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { allData } from './data';

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

  /**
   * 获取所有数据
   */
  getAllData(){
    let getData = allData;
    return getData;
  }

  /**
   * 获取所有前端数据 Object.values(allData).map((item) => item.time).reduce((a, b) => a + b)
   */
  getWebData(){
    let getData = allData;
    
    return getData;
  }
}
