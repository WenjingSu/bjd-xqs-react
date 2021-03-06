import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal,InputNumber, message,Checkbox,DatePicker,Row,Col} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const {RangePicker} =  DatePicker;
export default class Sensor extends React.Component{

    state= {
        list:[],
        // isVisible:false,
      
    }

    params = {
        page:1
    }

    componentDidMount(){
        this.getAlarmData();
    }

    getAlarmData=()=>{
        axios.ajax({
            url:'/getAlarmData',
            method:'post',
            data:{}
        }).then((res)=>{
            if(res.code == 0){
                res.result.data.map((item, index) => {
                    item.key = index;
                })
                console.log(res.result.data);
                this.setState({
                    list: res.result.data
                })
            }
        })
    }
    


    提交查询表单
    handleSubmit=(params)=>{
        console.log(params)
        axios.ajax({
            url:'/getAlarmData',
            method:'post',
            data:{
                params:params
            }
        }).then((res)=>{
            if(res.code == 0){
                res.result.data.map((item, index) => {
                    item.key = index;
                })
                //console.log(res.result.data);
                this.setState({
                    list: res.result.data
                })
            }
        })
    }
    //弹出表单
    // addSensor=()=>{
    //     // this.setState({
    //     //     isVisible:true
    //     // })
    //     this.props.history.push('/AccountManager/sensorAdd')
    // }
    
    
    //删除
    // handleDel=(id)=>{
    //     Modal.confirm({
    //         title:'确认删除',
    //         content:'确定要删除此传感器吗？',
    //         okText:'确认',
    //         cancelText:'取消',
    //         onOk:()=>{
    //             axios.ajax({
    //                 url:'/delSensor',
    //                 method:'get',
    //                 data:{
    //                     params:{
    //                         seqId:id
    //                     }
    //                 }
    //             }).then((res)=>{
    //                 if(res.code == 0){
    //                     message.success('删除成功！');
    //                     //重新刷新页面
    //                     this.getAlarmData();
    //                 }else{
    //                     message.error('删除失败！');
    //                 }
    //             })
    //         }
    //     })
    // }

    //弹出表单
    addAlarmData=()=>{
        // this.setState({
        //     isVisible:true
        // })
        // this.props.history.push('/AccountManager/sensorAdd')
    }
    编辑
    handleEdit=(id)=>{
        // this.props.history.push('/AccountManager/sensorEdit/1');
    }
    

    render(){
        const columns = [
            {
              title:'故障记录编号',
              dataIndex:'alarmDataId',
              key:'alarmDataId',
            }, 
            {
              title:'故障类型',
              dataIndex:'alarmDataType',
              key:'alarmDataType',
            }, 
            {
              title: '报警等级',
              dataIndex: 'alarmLevel',
              key: 'alarmLevel',
            },
            {
              title: '起始时间',
              dataIndex: 'startTime',
              key: 'startTime',
            },
            {
              title: '修复时间',
              dataIndex: 'repairTime',
              key: 'repairTime',
            },
            {
                title: '持续时间',
                dataIndex: 'durationTime',
                key: 'durationTime',
            },
            {
                title: '维修记录',
                dataIndex: 'repairRecord',
                key: 'repairRecord',
            },
            {
                title: '操作',
                key: 'operation',
                render:(record)=>{
                    return (
                        <div>
                            {/* <div className="content-wrap">
                                <Table
                                    bordered 
                                    columns={columns}
                                    dataSource={this.state.list}
                                    pagination={true}
                                />
                            </div> */}

                            <a onClick={()=>this.addAlarmData()}>添加</a>
                            <span style={{marginLeft:5,marginRight:5}}>|</span>
                            <a onClick={()=>this.handleEdit(record.alarmDataId)}>编辑</a>
                            
                          
                        </div>
                    );
                }
            }
        ]


        return (
            <div>
                <Card style={{marginBottom:10}}>
                <FilterForm filterSubmit={this.handleSubmit}/>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered 
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={true}
                    />
                </div>
                
            </div>
        );
    }
}

class FilterForm extends React.Component{

    state = {
        //list:[],
        isVisible:false,
        positionOfErrorList:[],
        expand:false
    }

    componentWillMount(){
        //this.getMonitorData();
        this.getPositionOfError();
       
    }
    //获取故障类型列表
    getPositionOfError=()=>{
        axios.ajax({
            url:'/getPositionOfError',
            method:'post',
            data:{}
        }).then((res)=>{
            if(res.code == 0){
                res.result.data.map((item, index) => {
                    item.key = index;
                })
                console.log(res.result.data);
                this.setState({
                    positionOfErrorList: res.result.data
                    
                })
            }
        })
    }
    renderOption(tagOptions,type){
        if(type == 'test'){
            return tagOptions.map(tag => <Option key={tag.errorId}>{tag.errorName}</Option>);
        }
        
    }
    handleFilterSubmit=()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        const values = {
            'sensorItemId':fieldsValue['sensorItemId'],
            'dataRange':[
                fieldsValue['dateRange'][0].format('YYYY-MM-DD'),
                fieldsValue['dateRange'][1].format('YYYY-MM-DD'),
            ]
        }
        this.props.filterSubmit(values);
    }

    reset=()=>{
        this.props.form.resetFields();
    }


    


    render(){
        

        const { getFieldDecorator } = this.props.form;
        const positionOfErrorList = this.state.positionOfErrorList || [];

  
        return (
            <Form layout="inline">
                <FormItem label="选择日期范围" >
                    {
                        getFieldDecorator('dateRange',{
                            initialValue: ''
                        })
                        (
                            <RangePicker 
                                placeholder={['开始时间', '结束时间']}
                            />
                        )
                    }
                </FormItem>
                <FormItem label="故障类型" >
                {
                        // getFieldDecorator('test',{
                        //     rules: [{ required: true ,message:'传感器类型不能为空'}],
                        // })
                        (
                            <Select>
                                { this.renderOption(positionOfErrorList,'test') }
                            </Select>
                        )
                    }
                </FormItem>
                
                <FormItem label="是否修复">
                    <Checkbox onChange={this.onChange}>是</Checkbox>
                    <Checkbox onChange={this.onChange}>否</Checkbox>
                </FormItem>
                
                <FormItem>
                    <Button type="primary" style={{ marginTop: '50px' ,marginLeft:'20px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);

// class FilterForm extends React.Component{

//     renderOptoin(tagOptions,type){
//         if(type == 'typeName'){
//             return tagOptions.map(tag => <Option key={tag.typeId}>{tag.typeName}</Option>);
//         }
//         if(type == 'targetName'){
//             return tagOptions.map(tag => <Option key={tag.targetId}>{tag.targetName}</Option>);
//         }
//         if(type == 'sectionName'){
//             return tagOptions.map(tag => <Option key={tag.sectionId}>{tag.sectionName}</Option>);
//         }
        
//     }


//     handleFilterSubmit=()=>{
//         let fieldsValue = this.props.form.getFieldsValue();
//         this.props.filterSubmit(fieldsValue);
//     }

//     reset=()=>{
//         this.props.form.resetFields();
//     }

//     render(){

//         const { getFieldDecorator } = this.props.form;
//         const typeList = this.props.typeList || [];
//         const targetList = this.props.targetList || [];
//         const sectionList = this.props.sectionList || [];
        
//         return (
//             <Form layout="inline">
//                 <FormItem label="选择检测指标类型">
//                     {
//                         getFieldDecorator('typeName',{
//                             initialValue: '0'
//                         })
//                         (
//                             <Select style={{ width: 100 }}>
//                                 { this.renderOptoin(typeList,'typeName') }
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="选择传感器监测对象">
//                     {
//                         getFieldDecorator('targetName',{
//                             initialValue: '0'
//                         })
//                         (
//                             <Select style={{ width: 100 }}>
//                                 { this.renderOptoin(targetList,'targetName') }
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="选择传感器位置">
//                     {
//                         getFieldDecorator('sectionName',{
//                             initialValue: '0'
//                         })
//                         (
//                             <Select style={{ width: 100 }}>
//                                 { this.renderOptoin(sectionList,'sectionName') }
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem>
//                     <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
//                     <Button onClick={this.reset}>重置</Button>
//                 </FormItem>
//             </Form>
//         );
//     }
// }
// FilterForm = Form.create({})(FilterForm);

