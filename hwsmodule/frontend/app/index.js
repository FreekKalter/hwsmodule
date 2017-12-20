'use strict';
const React = require('react');
const QRCode = require('qrcode.react');
const ReactDOM = require('react-dom');
const NumberFormat = require('react-number-format');

class QR extends React.Component{
    constructor(props){
        super(props);
        this.state = {base: "http://192.168.0.11:5000/checkin/fkalter/", otp: '', result: '', error: ''};
        this.getOtp = this.getOtp.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.render = this.render.bind(this);
        this.tick = this.tick.bind(this);
    }

    getOtp(){
        fetch('/otp').then(function(response){
           if(response.ok){
              response.json().then(function(data){
                console.log(data);
                this.setState({otp: data, result: this.state.base + data, error: ''});
              }.bind(this));
           }else{
               this.setState({otp: '', error: 'Response error'});
           }
        }.bind(this)).catch(function(error){
           this.setState({otp: '', error: 'Connection error'});
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
            this.getOtp();
        }
    }

    render(){
        return(
          <div className='qrcode'>
            <QRCode value={this.state.result} level="H" size={256} />
            <p>
              <NumberFormat id="otp" format="### ###" displayType="text" value={this.state.otp} />
            </p>
            <p className="error">
                {this.state.error}
            </p>
          </div>
        );
    }
}


ReactDOM.render(
  <QR />,
  document.getElementById('container')
);
