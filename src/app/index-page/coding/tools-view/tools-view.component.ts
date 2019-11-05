import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MethodsService } from 'src/app/share/methods.service';

@Component({
  selector: 'app-tools-view',
  templateUrl: './tools-view.component.html',
  styleUrls: ['./tools-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolsViewComponent implements OnInit {
  /**
   * 事件流
   */
  ob$;

  constructor(
    private sideBarMs$: MethodsService,
    private charData: MethodsService,
    private changeRef: ChangeDetectorRef //手动变更检测
  ) { }

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
