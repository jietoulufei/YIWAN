import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { allData, webData, backData, toolsData, hackData } from './data';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {
  subjectObject = new Subject();
  constructor() { }

  /**
   * 得到侧边栏收缩事件流
   */
  getSideEvent() {
    return this.subjectObject;
  }

  /**
   * 发送 侧边栏收缩事件流 通知
   * @param val 
   */
  sendSideEvent(val) {
    console.log("next",val);
    this.subjectObject.next(val)
  }

  /**
   * 获取所有数据
   */
  getAllData() {
    let getData = allData;
    return getData;
  }
  getAllDataArr(){
    let getDataArr = Object.entries(allData);
    return getDataArr;
  }

  /**
   * 获取所有前端数据 
   */
  getWebData() {
    const webDataObject = {
      "allTime": Object.values(webData).map(v => v.time).reduce((a, b) => a + b),//前端总时长
      "allObject": webData
    }
    return webDataObject;
  };

  /**
   * 获取所有后端数据 
   */
  getBackData() {
    const backDataObject = {
      "allTime": Object.values(backData).map(v => v.time).reduce((a, b) => a + b),//后端总时长
      "allObject": backData
    }
    return backDataObject;
  };

  /**
   * 获取所有渗透数据 
   */
  getHackData() {
    const hackDataObject = {
      "allTime": Object.values(hackData).map(v => v.time).reduce((a, b) => a + b),//渗透总时长
      "allObject": hackData
    }
    return hackDataObject;
  };

  /**
   * 获取所有工具数据 
   */
  getToolsData() {
    const toolsDataObject = {
      "allTime": Object.values(toolsData).map(v => v.time).reduce((a, b) => a + b),//工具总时长
      "allObject": toolsData
    }
    return toolsDataObject;
  };
}
