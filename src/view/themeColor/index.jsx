import React, { Component } from 'react';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';

class themeColor extends Component {
    changeHandler(colors) {
        console.log(colors);
    }
    render() {
        return (
            <div className="container">
                <h4>自定义主题色</h4>
                 <ColorPicker
                    animation="slide-up"
                    color={'#36c'}
                    onChange={this.changeHandler.bind(this)}
                    />
            </div>
        )
    }
}

export default themeColor;
