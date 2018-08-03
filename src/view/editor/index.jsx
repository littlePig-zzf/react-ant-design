import React, { Component } from 'react';
import './index.css'
import wangeditor from 'wangeditor'
import { Modal, Button, message } from 'antd';
import xss from 'xss'  //防止xss攻击

class Company extends Component {
    state = {
        editorContent: '',
        disposeCont: '',
        words: 0,
        maxWords: 150000,
        showModal: false
    }
    componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new wangeditor(elem)
      
        editor.customConfig.emotions = [{
            // tab 的标题
            title: '默认',
            // type -> 'emoji' / 'image'
            type: 'image',
            // content -> 数组
            content: [{
                    alt: '[坏笑]',
                    src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png'
                },
                {
                    alt: '[舔屏]',
                    src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png'
                }
            ]},
            {
                // tab 的标题
                title: 'emoji',
                // type -> 'emoji' / 'image'
                type: 'emoji',
                // content -> 数组
                content: ['😀', '😃', '😄', '😁', '😆']
            }
        ]
        editor.customConfig.onchange = html => {

            this.setState({
              disposeCont: html,
              words: editor.txt.text().length
            });

            console.log(html);
            
            if (this.state.words > this.state.maxWords) {
                message.warning(`请将字数控制在${this.state.maxWords}`)
            }
        }
        editor.create()
    }
    previewContent = (e) => {  //函数参数写多一个e，在调用方法时可不使用bind(this)的方法
        // console.log(filterXSS(this.state.disposeCont));
        const html = xss(this.state.disposeCont, {
            onIgnoreTag: (tag, html, options) => {
                if (tag === "blockquote") {
                    return tag + '"' + xss.escapeHtml(html) + '"'
                }
            },
            onIgnoreTagAttr: (tag, name, value, isWhiteAttr) => {
                if (name === 'style') {
                    return name + '="' + xss.escapeAttrValue(value) + '"'
                }
            }
        })
        console.log('back', html);
        
        this.setState({
            showModal: true,
            editorContent: html
        });
    }
    handleCancel = (e) => {
        this.setState({
            showModal: false,
        });
    }
    render() {
        return (
            <div className="editorContainer">
                <Modal
                    title="文章预览"
                    zIndex="199999"
                    visible={this.state.showModal}
                    footer={null}
                    onCancel={this.handleCancel}>
                    <div dangerouslySetInnerHTML={{__html: this.state.editorContent}}></div>
                </Modal>
                <div className = "container">
                    <div className="editorHead">
                        <h4>wangEditor编辑器</h4>
                        <Button className="previewBtn" type="primary" disabled={this.state.words > 0 ? '': 'false'} onClick={this.previewContent}>预览</Button>
                    </div>
                    <div ref="editorElem" className="editorCont" style={{textAlign: 'left', zIndex: 1}}></div>
                    <p className="words">{this.state.words}/{this.state.maxWords}</p>
                </div>
            </div>
        );
    }
}

export default Company;
