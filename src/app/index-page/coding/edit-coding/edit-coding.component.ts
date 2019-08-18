import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MethodsService } from 'src/app/share/methods.service';

@Component({
  selector: 'app-edit-coding',
  templateUrl: './edit-coding.component.html',
  styleUrls: ['./edit-coding.component.css']
})
export class EditCodingComponent implements OnInit {
  /**
   * 表单
   */
  validateForm: FormGroup;
  /**
   * 总类别 --默认all
   */
  selectedValue = 'all';

  /**
   * 多选下拉
   */
  listOfOption: Array<any> = [];
  listOfSelectedValue = ['all'];
  isNzDisabled: boolean = false;

  /**
   * 缓存数据
   */
  allSelectData = {
    getAllData: Object.keys(this.ms.getAllData()),
    getWebData: Object.keys(this.ms.getWebData().allObject),
    getBackData: Object.keys(this.ms.getBackData().allObject),
    getHackData: Object.keys(this.ms.getHackData().allObject),
    getToolsData: Object.keys(this.ms.getToolsData().allObject),
  }

  constructor(
    private fb: FormBuilder,
    private ms: MethodsService
  ) {
    this.validateForm = this.fb.group({
      select1: 'all',
      select2: ['all']
    });
  }

  ngOnInit(): void {
    this.listOfOption = this.allSelectData.getAllData;
  }

  /**
   * 表单提交
   */
  onSubmit(v): void {
    console.log("this.validateForm", v);
    this.validateForm.reset({
      select1: 'all',
      select2: ['all']
    });//重置清零
  }

  /**
   * 大类选择事件
   * @param e value值
   */
  topTypeChange(e) {
    this.listOfSelectedValue = ['all'];
    switch (e) {
      case "all":
        this.listOfOption = this.allSelectData.getAllData;
        break;
      case "webView":
        this.listOfOption = this.allSelectData.getWebData;
        break;
      case "backView":
        this.listOfOption = this.allSelectData.getBackData;
        break;
      case "hack":
        this.listOfOption = this.allSelectData.getHackData;
        break;
      case "tools":
        this.listOfOption = this.allSelectData.getToolsData;
        break;
    }
  }

  /**
   * 小类选择事件
   */
  selectCodeChange(v) {
    if (v.indexOf('all') > -1) {
      this.listOfSelectedValue = ['all'];
      this.isNzDisabled = true;
    } else {
      this.isNzDisabled = false;
    }
  }


}
