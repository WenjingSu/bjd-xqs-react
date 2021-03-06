import React from 'react';
import {Row, Col, Modal} from 'antd'
import './index.less'
import Utils from '../../utils/utils'
import axios from '../../axios'
import { connect } from 'react-redux'

class Header extends React.Component{


    componentWillMount(){
        this.setState({
            userName: sessionStorage.getItem('userName')
        });
        setInterval(()=>{
            let sysTime = Utils.formateDate(new Date().getTime());
            this.setState({
                sysTime
            });
        },1000);
        this.getWeatherAPIData();
    }
    // 高德地图
    getWeatherAPIData(){
        let city = '北京';
        // encodeURIComponent
        axios.jsonp({
            url: 'https://restapi.amap.com/v3/weather/weatherInfo?city='+city+'&key=bd53f6528c5657c7d15afa772cbd4b78'
        }).then((res)=>{
            if(res.status === '1'){
                let data = res.lives[0]
                this.setState({
                    weather: data.weather,
                    temperature: data.temperature,
                    city: data.city
                })
            }
        })
    }

    //退出
    logout = ()=>{
        Modal.confirm({
            title:'退出',
            content:'确定要退出本系统吗？',
            cancelText:'取消',
            okText: '确定',
            onOk:()=>{
                sessionStorage.clear();
                window.location.href='/#/login';
            }
        })
        
    }

    render(){

        const menuType = this.props.menuType;
        
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType?
                            <Col span="6" className="logo">
                                <img src="/assets/logo-ant.svg" alt=""/>
                                <span>通用后台管理系统</span>
                            </Col>:''
                    }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a onClick={this.logout}>退出</a>
                    </Col>
                </Row>
                    {
                    menuType?'':
                        <Row className="breadcrumb">
                            <Col span="4" className="breadcrumb-title">
                                {this.props.menuName}
                            </Col>
                            <Col span="20" className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-detail">{this.state.city} | {this.state.weather} | {this.state.temperature} ℃</span>
                            </Col>
                        </Row>
                    }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        menuName: state.menuName
    }
};
export default connect(mapStateToProps)(Header);