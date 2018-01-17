'use strict';
const React = require('react');
const QRCode = require('qrcode.react');
const ReactDOM = require('react-dom');
const NumberFormat = require('react-number-format');

import { Progress } from 'react-sweet-progress';

class QR extends React.Component{
    constructor(props){
        super(props);
        this.state = {base: "http://192.168.0.11:5000/checkin/fkalter/", otp: '',
                      result: '', error: '', qrcolor: '#000000', progress: "0"};
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
            300
        );
    }

    tick(){
        var d = new Date();
        var s = d.getSeconds();
        var ms = d.getMilliseconds();
        if(s == 0 || s == 30){
            this.getOtp();
            this.setState({qrcolor: '#000000'});
        }else if(s >= 27 && s < 30 || s >= 57 && s<60){
            this.setState({qrcolor: '#FF0000'});
        }
        if(s<30){
            this.setState({progress: Math.round(s*1000+ms * (100/30000))});
        }else{
            this.setState({progress: Math.round(((s*1000+ms)-30000) * (100/30000))});
        }
    }


    render(){
        return(
          <div className="row">

            <div className="col-md-8 col-md-offset-2">
              <div className={"qrcode center-block"}>
                <QRCode value={this.state.result} fgColor={this.state.qrcolor} level="H" size={512}/>
              </div>
            </div>

            <div className="col-md-2 col-md-offset-5">
                <p className="text-center">
                  <NumberFormat id="otp" format="### ###" displayType="text" value={this.state.otp} />
                </p>
                <p className="error text-center">
                    {this.state.error}
                </p>
            </div>
            <div className="col-md-2">
                <div className="center-block">
                    <Progress
                      type="circle"
                      width={70}
                      theme={{
                        active: {
                            symbol: ' ',
                            color: '#000000',
                        },
                        default: {
                          symbol: ' ',
                          color: '#000000'
                        },
                        success: {
                          symbol: ' ',
                          color: '#000000'
                        }
                      }}
                      percent={this.state.progress}

                    />
                </div>
            </div>
          </div>
        );
    }
}


ReactDOM.render(
  <QR />,
  document.getElementById('container')
);
