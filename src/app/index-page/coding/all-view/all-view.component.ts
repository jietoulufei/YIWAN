import { Component, OnInit } from '@angular/core';
import { MethodsService } from 'src/app/share/methods.service';

@Component({
  selector: 'app-all-view',
  templateUrl: './all-view.component.html',
  styleUrls: ['./all-view.component.css']
})
export class AllViewComponent implements OnInit {

  constructor(private sideBarMs$: MethodsService) { }
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

    var builderJson = {
      "all": 10887,
      "charts": {
        "map": 3237,
        "lines": 2164,
        "bar": 7561,
        "line": 7778,
        "pie": 7355,
        "scatter": 2405,
        "candlestick": 1842,
        "radar": 2090,
        "heatmap": 1762,
        "treemap": 1593,
        "graph": 2060,
        "boxplot": 1537,
        "parallel": 1908,
        "gauge": 2107,
        "funnel": 1692,
        "sankey": 1568
      },
      "ie": 9743
    };

    var downloadJson = {
      "echarts.min.js": 17365,
      "echarts.simple.min.js": 4079,
      "echarts.common.min.js": 6929,
      "echarts.js": 14890
    };

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
      legend: {
        orient: 'vertical',
        x: 'right',
        y: 'bottom',
        data: ['直接访问', '邮件营销']
      },
      toolbox: {  //保存下载
        feature: {
          saveAsImage: {}
        }
      },
      title: [{
        text: '在线构建',
        subtext: '总计 ' + builderJson.all,
        x: '25%',
        textAlign: 'center'
      }, {
        text: '各版本下载',
        subtext: '总计 ' + Object.keys(downloadJson).reduce(function (all, key) {
          return all + downloadJson[key];
        }, 0),
        x: '75%',
        textAlign: 'center'
      }],
      grid: [{
        top: 50,
        width: '50%',
        bottom: '0%',
        left: 10,
        containLabel: true
      }],
      xAxis: [{
        type: 'value',
        max: builderJson.all,
        splitLine: {
          show: false
        }
      }],
      yAxis: [{
        type: 'category',
        data: Object.keys(builderJson.charts),
        axisLabel: {
          interval: 0,
          rotate: 30
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
        data: Object.keys(builderJson.charts).map(function (key) {
          return builderJson.charts[key];
        })
      }, {
        type: 'bar',
        stack: 'chart',
        silent: true,
        itemStyle: { //柱状图背景样式
          normal: {
            color: '#eee'
          }
        },
        data: Object.keys(builderJson.charts).map(function (key) {
          return builderJson.all - builderJson.charts[key];
        })
      }, {
        type: 'pie', //饼图
        radius: [0, '30%'],
        center: ['75%', '25%'],
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
        data: Object.keys(downloadJson).map(function (key) {
          return {
            name: key.replace('.js', ''),
            value: downloadJson[key]
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
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
        ]
      }]
    }
  }
}
