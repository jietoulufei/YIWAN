import { Component, OnInit } from '@angular/core';
import { MethodsService } from 'src/app/share/methods.service';

@Component({
  selector: 'app-back-view',
  templateUrl: './back-view.component.html',
  styleUrls: ['./back-view.component.css']
})
export class BackViewComponent implements OnInit {

  chartOption
  constructor(
    private sideBarMs$: MethodsService,
    private charData: MethodsService
  ) { }

  ngOnInit() {

  };

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.sideBarMs$.getSideEvent().subscribe(val => {
      console.log("BackViewComponent", val)

    });
  }

}
