import { Component, OnInit } from '@angular/core';
import { MethodsService } from '../share/methods.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  /**
   * 编辑页样式触发条件
   */
  isEditClick: boolean = false;
  /**
   * 其他常规页触发条件
   */
  isNormalClick:boolean = true;
  constructor(private sideBarMs$: MethodsService, private router: Router) { }

  ngOnInit() {
    /**
     * 监听路由 --编辑页样式需要单独修改
     */
    this.router.events.
      pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log(event.url);
        if (event.url.indexOf('editCoding') > -1) {
          this.isEditClick = true;
          this.isNormalClick = false;
        }else{
          this.isEditClick = false;
          this.isNormalClick = true;
        }
      });
      
  }

  /**
   * 收缩框点击
   */
  changeSideBar() {
    this.isCollapsed = !this.isCollapsed;
    console.log("this.isCollapse", this.isCollapsed);
    this.sideBarMs$.sendSideEvent(this.isCollapsed);
  }

}
