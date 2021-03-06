import React from 'react';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Home from './pages/home';
import User from './pages/user'
import UserLog from './pages/userlog'
import Sensor from './pages/sensor'
import Device from './pages/device'
import MonitorData from './pages/dataEcharts'
import DeviceForm from './pages/device/add'
import DeviceEdit from './pages/device/edit'
import DeviceDetail from './pages/device/detail'
import SensorEdit from './pages/sensor/edit'
import SensorDetail from './pages/sensor/detail'
import SensorAdd from './pages/sensor/add'
import PredictionLdss from './pages/prediction/ldss'
import PredictionJgjd from './pages/prediction/jgjd'
import PredictionGgzx from './pages/prediction/ggzx'
import PredictionGgfj from './pages/prediction/ggfj'
import AlarmSetting from './pages/alarmSetting/index'
import systemError from './pages/alarmLog/systemErrorPage'
import structureError from './pages/alarmLog/structureErrorPage'


export default class IRouter extends React.Component{

    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/" render={()=>(
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home}/>
                                    <Route path='/SystemManager/ShowUser' component={User}/>
                                    <Route path='/SystemManager/UserLog' component={UserLog}/>
                                    <Route path='/AccountManager/ShowSensor' component={Sensor}/>
                                    <Route path='/AccountManager/ShowDevice' component={Device}/>
                                    <Route path='/MonitorDataManager/ShowMonitorData' component={MonitorData}/>
                                    <Route path='/AccountManager/deviceAdd' component={DeviceForm}/>
                                    <Route path='/AccountManager/deviceEdit/:id' component={DeviceEdit}/>
                                    <Route path='/AccountManager/deviceDetail/:id' component={DeviceDetail}/>
                                    <Route path='/AccountManager/sensorAdd' component={SensorAdd}/>
                                    <Route path='/AccountManager/sensorEdit/:id' component={SensorEdit}/>
                                    <Route path='/AccountManager/sensorDetail/:id' component={SensorDetail}/>
                                    <Route path='/DecisionManager/PredictManager/showLDSSPredictData' component={PredictionLdss}/>
                                    <Route path='/DecisionManager/PredictManager/showGGZXPredictData' component={PredictionGgzx}/>
                                    <Route path='/DecisionManager/PredictManager/showJGJDPredictData' component={PredictionJgjd}/>
                                    <Route path='/DecisionManager/PredictManager/showGGFJPredictData' component={PredictionGgfj}/>
                                    <Route path='/DecisionManager/AlarmManager/ShowAlarmSetting' component={AlarmSetting}/>
                                    <Route path='/DecisionManager/AlarmManager/showAlarmLog/systemError' component={systemError}/>
                                    <Route path='/DecisionManager/AlarmManager/showAlarmLog/StructureError' component={structureError}/>
                                    <Redirect to="/home"/>
                                </Switch>
                            </Admin>
                        )} />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}