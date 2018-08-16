import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class BarEchart extends Component {
    componentDidMount() {
        this.initEchart()
    }
    initEchart() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.refs.echart);
        // 绘制图表
        myChart.setOption({
            tooltip: {},
            xAxis: {
                data: this.props.xAxisData
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: this.props.echartBg
                    }
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: this.props.yAxisData
            }]
        });
        setTimeout(()=>{
            myChart.resize()
        },20)
    }
    render() {
        return (
            <div ref = "echart" style = {{width: '100%', height: 400, background: '#fff'}}> </div>
        )
    }
}

BarEchart.defaultProps = {
    echartWidth: '100%',
    xAxisData: ['小黄', '小红', '小狗', '小花', '小猪', '小明'],
    yAxisData: [5, 20, 36, 10, 10, 20],
    echartBg: '#83bff6',
};