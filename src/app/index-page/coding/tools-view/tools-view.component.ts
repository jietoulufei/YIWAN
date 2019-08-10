import { Component, OnInit } from '@angular/core';
import { MethodsService } from 'src/app/share/methods.service';

@Component({
  selector: 'app-tools-view',
  templateUrl: './tools-view.component.html',
  styleUrls: ['./tools-view.component.css']
})
export class ToolsViewComponent implements OnInit {
  /**
   * 事件流
   */
  ob$;

  constructor(private sideBarMs$: MethodsService,
    private charData: MethodsService) { }

  ngOnInit() {
    this.ob$ = this.sideBarMs$.getSideEvent().subscribe(val => {
      console.log("ToolsViewComponent", val)
     
    });
  };

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ob$.unsubscribe();
  }
}
