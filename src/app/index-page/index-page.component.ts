import { Component, OnInit } from '@angular/core';
import { MethodsService } from '../share/methods.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  /**
   * 侧边栏收缩状态 false=展开，true=收缩
   */
  isCollapsed = false;
  constructor(private sideBarMs$:MethodsService) { }

  ngOnInit() {
  }

  /**
   * 收缩框点击
   */
  changeSideBar(){
    this.isCollapsed = !this.isCollapsed;
    console.log("this.isCollapse",this.isCollapsed);
    this.sideBarMs$.sendSideEvent(this.isCollapsed);
  }

}
