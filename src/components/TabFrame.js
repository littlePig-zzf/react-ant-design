import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class TabFrame extends Component {
    componentDidMount() {
        this.initEchart()
        
    }
    initEchart(which) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.refs.echart);
        // 绘制图表
        myChart.setOption({
            title: {
                // text: 'ECharts 入门示例'
            },
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
    }
    render() {
        window.onresize = () => {
            this.initEchart('resize')
        }
        const styleObj = {
            tabContainer: {
                padding: 10,
            },
            tabHeader: {
                display: 'flex',
                borderBottom: '1px solid #eee'
            },
            tabTitle: {
                flex: 1,
                fontSize: 18
            },
            tabTool: {
                marginTop: 6,
            },
            tabToolItem: {
                padding: '2px 12px',
                marginRight: 5,
                border: '1px solid #1890ff',
                color: '#1890ff',
                borderRadius: 5
            }
        }
        return (
            <div style = {styleObj.tabContainer} className = { this.props.echartWidth } >
                <div style = {styleObj.tabHeader} >
                    <h2 style = { styleObj.tabTitle } > { this.props.title } </h2>
                    <p style = { styleObj.tabTool } >
                        {
                            this.props.tabData.map((item, index) => {
                                return (
                                    <span style = { styleObj.tabToolItem } key = { index }> {item} </span>
                                )
                            })
                        }
                    </p>
                </div>
                <div ref = "echart" style = {{width: '90%',height: 400}}></div>
            </div>
        )
    }
}

TabFrame.defaultProps = {
    echartWidth: '100%',
    xAxisData: ['小黄', '小红', '小狗', '小花', '小猪', '小明'],
    yAxisData: [5, 20, 36, 10, 10, 20],
    echartBg: '#83bff6',
    title: '公司列表',
    tabData: ['日', '月', '年']
};

