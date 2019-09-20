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
   * 编辑 日期单元格 样式
   */
  dateFormat = 'yyyy/MM/dd';
  /**
   * 表单
   */
  validateForm: FormGroup;
  validateForm2: FormGroup;
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
   * add弹框
   */
  isVisible = false;
  addValue: string = "";
  addCountTime: string = "";
  /**
   * 缓存数据
   */
  allSelectData = {
    getAllData: Object.keys(this.ms.getAllData()),
    getWebData: Object.keys(this.ms.getWebData().allObject),
    getBackData: Object.keys(this.ms.getBackData().allObject),
    getHackData: Object.keys(this.ms.getHackData().allObject),
    getToolsData: Object.keys(this.ms.getToolsData().allObject),
    getAllDataArr: this.ms.getAllDataArr(),
    getformatData: this.ms.getAllDataArr().map(item => {
      item[1]["name"] = item[0];
      return item[1]
    })
  };
  /**
   * 导出Excel数据
   */
  excelData: any[];

  constructor(
    private fb: FormBuilder,
    private ms: MethodsService
  ) {
    this.validateForm = this.fb.group({
      select1: 'all',
      select2: ['all']
    });
    this.validateForm2 = this.fb.group({
      select1: 'all',
      select2: ['all'],
      addValue: '',
      dateRange: '',
      addCountTime: ''
    });
    console.log(this.allSelectData.getformatData);

    this.excelData = this.allSelectData.getformatData.map(item => {
      return {
        name: item["name"],
        type: item.type,
        startTime: item.startTime,
        endTime: item.endTime,
        time: item.time
      }
    })
  }

  /**
   * 排序
   */
  sortName: string | null = null;
  sortValue: string | null = null;
  searchAddress: string;
  listOfSearchName: string[] = [];
  listOfData: Array<any> = this.allSelectData.getformatData;
  listOfDisplayData: Array<any> = [
    ...this.listOfData
  ];

  ngOnInit(): void {
    this.listOfOption = this.allSelectData.getAllData;
    console.log(this.ms.getAllDataArr());
  }

  /**
   * 排序事件
   */
  sort(sort): void {
    console.log(sort);

    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = (item) =>
      (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) &&
      (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1) : true);
    const data = this.listOfData.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.listOfDisplayData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
            ? 1
            : -1
      );
    } else {
      this.listOfDisplayData = data;
    }
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

  /**
   * 編輯操作
   */
  startEdit(i): void {
    this.listOfDisplayData[i].edit = true;
  }

  /**
   * 保存
   */
  saveEdit(i): void {
    console.log("保存", this.listOfDisplayData[i]);
    this.listOfDisplayData[i].edit = false;
  }

  /**
   * 删除
   */
  cancelEdit(i): void {
    this.listOfDisplayData[i].edit = false;
  }

  /**
   * 显示弹框
   */
  showModal(): void {
    this.isVisible = true;
  }

  /**
   * 弹框确认提交
   */
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  /**
   * 弹框关闭
   */
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  /**
   * 起始日 截止日
   */
  onChange(v) {

  }

  /**
   * 下载Excel
   */
  downExcel() {
    //要导出的json数据 格式
    // const jsonData = [{
    //   name: '路人甲',
    //   phone: '123456789',
    //   email: '000@123456.com'
    // }];

    //列标题，逗号隔开，每一个逗号就是隔开一个单元格
    let str = `名称,类别,起始日,终止日,总时长\n`;
    //增加\t为了不让表格显示科学计数法或者其他格式
    for (let i = 0; i < this.excelData.length; i++) {
      for (let item in this.excelData[i]) {
        str += `${this.excelData[i][item] + '\t'},`;
      }
      str += '\n';
    }

    //encodeURIComponent解决中文乱码
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    //通过创建a标签实现
    let link = document.createElement("a");
    link.href = uri;
    //对下载的文件命名
    link.download = "json数据表.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
