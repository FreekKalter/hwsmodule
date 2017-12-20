'use strict';
const React = require('react');
const QRCode = require('qrcode.react');
const ReactDOM = require('react-dom');

class QR extends React.Component{
    constructor(props){
        super(props);
        this.state = {base: "http://192.168.0.11:5000/checkin/fkalter/", otp: '', result: ''};
        this.getOtp = this.getOtp.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.render = this.render.bind(this);
        this.tick = this.tick.bind(this);
    }

    getOtp(){
        fetch('/otp').then(function(response){
          response.json().then(function(data){
            this.setState({otp: data, result: this.state.base + data});
          }.bind(this));
        }.bind(this));
    }

    componentDidMount(){
        this.getOtp();
        this.timerId = setInterval(
            () => this.tick(),
            980
        );
    }

    tick(){
        var d = new Date();
        var s = d.getSeconds();
        if(s == 0 || s == 30){
            console.log(s);
            this.getOtp();
        }

    }

    render(){
        return(
          <div className='qrcode'>
            <QRCode value={this.state.result} level="H" size={256} />
            <p>{this.state.otp}</p>
          </div>
        );
    }
}


ReactDOM.render(
  <QR />,
  document.getElementById('container')
);
