import { Component, OnInit } from '@angular/core';
import { MethodsService } from 'src/app/share/methods.service';

@Component({
  selector: 'app-web-view',
  templateUrl: './web-view.component.html',
  styleUrls: ['./web-view.component.css']
})
export class WebViewComponent implements OnInit {
  /**
   * 事件流
   */
  ob$;
  
  /**
   * 通过ngIf 操控渲染canvas dom
   */
  expression = true;

  /**
   * chart options
   */
  chartOption;
  constructor(
    private sideBarMs$: MethodsService,
    private charData: MethodsService
  ) { }

  ngOnInit() {
    this.ob$ = this.sideBarMs$.getSideEvent().subscribe(val => {
      console.log("ToolsViewComponent", val)
      this.expression = false;
      setTimeout(v => {
        this.expression = true;
      }, 200)
    });

    this.chartInit();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ob$.unsubscribe();
  }

  /**
   * chart Init
   */
  chartInit() {
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

    let data = this.charData.getWebData().allObject;
    let dataYarr = [];
    let dataXarr = Object.keys(data);
    Object.values(data).map(v => {
      dataYarr.push(v.time);
    });

    this.chartOption = {
      backgroundColor: {
        type: 'pattern',
        image: canvas,
        repeat: 'repeat'
      },
      title: {
        text: '前端'
      },
      legend: {
        data: ['bar'],
        align: 'left'
      },
      toolbox: {
        // y: 'bottom',
        feature: {
          magicType: {
            //type: ['stack', 'tiled'] 启用的动态类型，包括'line'（切换为折线图）, 'bar'（切换为柱状图）, 'stack'（切换为堆叠模式）, 'tiled'（切换为平铺模式）。
          },
          dataView: {},//数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
          saveAsImage: {
            name: '总览', //下载图片名称
            title: '保存',
            pixelRatio: 5,//优化大图下载分辨图 目前6 最大值
          }
        }
      },
      tooltip: {},
      grid: [{  //柱状图网格
        top: 50,
        width: '100%',
        bottom: '0%',
        left: 0,
        containLabel: true
      }],
      xAxis: {
        data: dataXarr,
        silent: false,
        splitLine: {
          show: false
        },
        axisLabel: { //x轴 标签名 样式
          show: true,
          interval: 0,// 保证每一条都显示文字
        },
      },
      yAxis: {
      },
      series: [{
        name: 'bar',
        type: 'bar',
        data: dataYarr,
        itemStyle: {
          color: "#F85D65"
        },
        animationDelay: function (idx) {
          return idx * 10;
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };
  }
}
