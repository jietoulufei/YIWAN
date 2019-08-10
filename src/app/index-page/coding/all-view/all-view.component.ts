import { Component, OnInit } from '@angular/core';
import { MethodsService } from 'src/app/share/methods.service';

@Component({
  selector: 'app-all-view',
  templateUrl: './all-view.component.html',
  styleUrls: ['./all-view.component.css']
})
export class AllViewComponent implements OnInit {

  constructor(
    private sideBarMs$: MethodsService,
    private charData: MethodsService
  ) { }
  /**
   * 通过ngIf 操控渲染canvas dom
   */
  expression = true;

  /**
   * canvas option
   */
  chartOption;

  ngOnInit() {
    /**
     * 订阅收缩条 事件流
     */
    this.sideBarMs$.getSideEvent().subscribe(val => {
      console.log("haha", val)
      this.expression = false;
      setTimeout(v => {
        this.expression = true;
      }, 200)
    });

    this.chartInit();
  }

  /**
   * chart图数据加载 
   */
  chartInit() {
    /**
     * 柱状图数据
     */
    const progressAll = this.charData.getAllData();
    const progress = {
      "all": Object.values(progressAll).map((item) => item.time).reduce((a, b) => a + b),
      "bg": 500,
      "timeBar": Object.keys(progressAll).map(function (key) { //时间条
        return progressAll[key].time;
      }),
      "timeBarBg": Object.keys(progressAll).map(function (key) { //时间条背景
        return 500 - progressAll[key].time;
      }),
      "items": Object.keys(progressAll) //柱状条目
    };

    /**
     * 饼图数据
     */
    const pie = {
      "前端": this.charData.getWebData().allTime,
      "后端": this.charData.getBackData().allTime,
      "渗透": this.charData.getHackData().allTime,
      "工具": this.charData.getToolsData().allTime,
    };

    /**
     * 环形进度图
     */
    const cricleProgress = {
      items: ['已完成', '未完成'],
      data: [
        { value: progress.all, name: '已完成' },
        { value: 10000 - progress.all, name: '未完成' },
      ],
      learnPercent: Math.round((progress.all / 10000) * 10000) / 100 + '%'
    }

    /**
     * chart背景水印
     */
    const waterMarkText = 'TenThousand';

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 100;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.08;
    ctx.font = '20px Microsoft Yahei';
    ctx.translate(50, 50);
    ctx.rotate(-Math.PI / 4);
    ctx.fillText(waterMarkText, 0, 0);

    this.chartOption = {
      backgroundColor: {
        type: 'pattern',
        image: canvas,
        repeat: 'repeat'
      },
      tooltip: {},
      legend: {   //环形饼图
        orient: 'vertical',
        x: 'right',
        y: 'bottom',
        data: cricleProgress.items
      },
      toolbox: {  //保存下载
        feature: {
          saveAsImage: {
            name: '总览', //下载图片名称
            title: '保存',
            pixelRatio: 5,//优化大图下载分辨图 目前6 最大值
          }
        }
      },
      title: [{
        text: '总览',
        subtext: '总计 ' + progress.all + 'H',
        x: '25%',
        textAlign: 'center'
      }, {
        text: '各技能栈',
        subtext: '总计 ' + progress.all,
        x: '75%',
        textAlign: 'center'
      }, {
        text: '总进度',
        subtext: cricleProgress.learnPercent,
        x: '75%',
        y: '50%',
        textAlign: 'center'
      }],
      grid: [{  //柱状图网格
        top: 50,
        width: '55%',
        bottom: '0%',
        left: 10,
        containLabel: true
      }],
      xAxis: [{
        type: 'value',
        max: progress.bg,
        splitLine: {
          show: false
        }
      }],
      yAxis: [{
        type: 'category',
        data: progress.items,
        axisLabel: {
          interval: 0,
          rotate: 20 //柱状图名称倾斜
        },
        splitLine: {
          show: false
        }
      }],
      series: [{
        type: 'bar',
        stack: 'chart',
        z: 3,
        label: {
          normal: {
            position: 'right',
            show: true
          }
        },
        itemStyle: {  //柱状图样式  
          normal: {
            color: '#1890FF'
          }
        },
        data: progress.timeBar
      }, {
        type: 'bar',
        stack: 'chart',
        silent: true,
        itemStyle: { //柱状图背景样式
          normal: {
            color: '#eee'
          }
        },
        data: progress.timeBarBg
      }, {
        name: '占比',
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        type: 'pie', //饼图
        radius: [0, '30%'],
        center: ['75%', '30%'],
        itemStyle: {
          normal: {
            //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
            color: function (params) {
              // build a color map as your need.
              var colorList = [
                '#3CB2EF', '#67E0E3', '#FFDB5C', '#FFAE8B', '#96BFFF',
              ];
              return colorList[params.dataIndex]
            }
          }
        },
        data: Object.keys(pie).map(function (key) {
          return {
            name: key,
            value: pie[key]
          }
        })
      }, {
        name: '访问来源',
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        type: 'pie',
        radius: ['20%', '30%'],
        center: ['75%', '75%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
            color: function (params) {
              // build a color map as your need.
              var colorList = [
                '#3CB2EF', '#FFED65'
              ];
              return colorList[params.dataIndex]
            }
          }
        },
        data: cricleProgress.data
      }]
    }
  }
}
