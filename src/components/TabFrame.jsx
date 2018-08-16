import React, { Component } from 'react';

export default class TabFrame extends Component {
    searchEchart(index) {
        this.props.searchEchart(index) //子组件触发父组件
    }
    render() {
        const styleObj = {
            tabHeader: {
                display: 'flex',
                padding: 10,
                borderBottom: '1px solid #eee',
                background: '#fff'
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
        let tabCont = null
        if (this.props.showTab) {
            tabCont = this.props.tabData.map((item, index) => {
                return (
                    <span onClick = { this.searchEchart.bind(this, index) } style = { styleObj.tabToolItem } key = { index }> {item} </span>
                )
            })
        } else {
            tabCont = this.props.subTitle
        }
        return (
            <div style = {styleObj.tabHeader} >
                <h2 style = { styleObj.tabTitle } > { this.props.title } </h2>
                <p style = { styleObj.tabTool } >
                    {tabCont}
                </p>
            </div>
        )
    }
}

TabFrame.defaultProps = {
    title: '公司列表',
    showTab: true,
    tabData: ['日', '月', '年'],
    searchEchart: ()=>{}
};

