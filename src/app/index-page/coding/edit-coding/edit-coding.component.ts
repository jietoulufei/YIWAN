import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MethodsService } from 'src/app/share/methods.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-edit-coding',
  templateUrl: './edit-coding.component.html',
  styleUrls: ['./edit-coding.component.css']
})
export class EditCodingComponent implements OnInit {
  @ViewChild('basicTable', { static: true }) greetDiv: ElementRef;
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
   * 下载Excel ===================================================================start
   */
  downExcel() {
    console.log("this.greetDiv", this.greetDiv["nzData"]);
    //var table1 = document.querySelector("#table1");

    let aoa = this.greetDiv["nzData"].map(item => {
      return [item.name, item.type, item.startTime, item.endTime, item.time]
    })
    aoa = [["名称", "类别", "起始日", "终止日", "总时长"], ...aoa];
    //var sheet = XLSX.utils.table_to_sheet(table1);//将一个table对象转换成一个sheet对象
    var sheet = XLSX.utils.aoa_to_sheet(aoa);
    this.openDownloadDialog(this.sheet2blob(sheet), '下载.xlsx');
  };

  // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
  sheet2blob(sheet, sheetName?) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
      SheetNames: [sheetName],
      Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

    var wopts = {
      bookType: "xlsx", // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: "binary"
    };
    //var wbout = XLSX.write(workbook, wopts);
    var wbout = XLSX.write(workbook, { bookType: "xlsx", bookSST: false, type: "binary" });
    var blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
    }); // 字符串转ArrayBuffer
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    return blob;
  }

  openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    // if (window.MouseEvent) event = new MouseEvent('click');
    // else {
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    //}
    aLink.dispatchEvent(event);
  };

  /**
   * 下载Excel ===================================================================end
   */
}
