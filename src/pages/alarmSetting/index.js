import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal, message,Tabs,Checkbox} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;
const Option = Select.Option;
var TabPane = Tabs.TabPane;

const operations = <a href="http://localhost:3000/#/AccountManager/ShowSensor">返回</a>

//查询
class FilterForm extends React.Component{
    state ={    
        sWayOfAlarmList:[],
    }

    componentDidMount(){
       this.getSWayOfAlarmClass();
    }
    handleFilterSubmit=()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset=()=>{
        this.props.form.resetFields();
    }
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    //获取结构故障报警通知类型
    getSWayOfAlarmClass=()=>{
        axios.ajax({
            url:'/getWayOfAlarm',
            method:'post',
            data:{}
        }).then((res)=>{
            if(res.code == 0){
                res.result.data.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    sWayOfAlarmList: res.result.data
                })
            }
        })
    }

    renderCheckbox(tagCheckboxs,type){
        if(type == 'sWayOfAlarm'){
            return tagCheckboxs.map(tag => <Checkbox key={tag.itemId}>{tag.itemName}</Checkbox>);
        }
        // if(type == 'typeName'){
        //     return tagOptions.map(tag => tag.typeId == '0'?null:<Option key={tag.typeId}>{tag.typeName}</Option>);
        // }
        // if(type == 'targetName'){
        //     return tagOptions.map(tag => tag.targetId == '0'?null:<Option key={tag.targetId}>{tag.targetName}</Option>);
        // }
        // if(type == 'sectionName'){
        //     return tagOptions.map(tag => tag.sectionId == '0'?null:<Option key={tag.sectionId}>{tag.sectionName}</Option>);
        // }
        
    }
    render(){
        //const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol:{
                xs:0,
                sm:0
            },
            wrapperCol:{
                xs:0,
                sm:0
            }
            //labelCol: {span: 5},
            //wrapperCol: {span: 16}
        };
        
        const offsetLayout = {
            wrapperCol:{
                xs:{
                    span:0,
                    offset:0
                },
                sm:{
                    span:0,
                    offset:0
                }
            }
        }


        const { getFieldDecorator } = this.props.form;
        const sWayOfAlarmList = this.state.sWayOfAlarmList || [];
        return (
            <Card>
            <Form layout="inline" >
                <Tabs tabBarExtraContent={operations}>
                    <TabPane tab="报警通知方式" key="1" onTabClick={this.showCard1}>
                        <Form layout="inline">
                            <FormItem {...formItemLayout}>
                            系统故障报警：
                            
                            {
                                getFieldDecorator('sWayOfAlarm',{
                               
                            })
                            (
                               
                                <Checkbox>{ this.renderCheckbox(sWayOfAlarmList,'sWayOfAlarm') }</Checkbox>
                            )
                            }
                            {/* <Checkbox onChange={this.onChange}>弹窗</Checkbox>
                            <Checkbox onChange={this.onChange}>短信</Checkbox>
                            <Checkbox onChange={this.onChange}>邮件</Checkbox> */}
                            </FormItem>

                            <FormItem {...formItemLayout}>
                            结构一级报警：
                            <Checkbox onChange={this.onChange}>弹窗</Checkbox>
                            <Checkbox onChange={this.onChange}>短信</Checkbox>
                            <Checkbox onChange={this.onChange}>邮件</Checkbox>
                            </FormItem>

                            <FormItem {...formItemLayout}>
                            结构二级报警：
                            <Checkbox onChange={this.onChange}>弹窗</Checkbox>
                            <Checkbox onChange={this.onChange}>短信</Checkbox>
                            <Checkbox onChange={this.onChange}>邮件</Checkbox>
                            </FormItem>
                            <FormItem {...offsetLayout}>
                                <Button type="primary" onClick={this.handleFilterSubmit} style={{marginLeft:0}}>确定</Button>
                                <Button type="primary" onClick={this.reset} style={{marginLeft:10}}>重置</Button>
                            </FormItem>
                        </Form>

                    </TabPane>
                    <TabPane tab="报警阈值修改" key="2">
                    <Form layout="inline">
                            <FormItem {...formItemLayout}>
                            系统故障报警：
                            <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange}>
                               <Option value="1">1</Option>
                               <Option value="5">5</Option>
                               <Option value="10">10</Option>
                            </Select>

                            <Select defaultValue="day" style={{ width: 120,marginLeft:10}} onChange={this.handleChange}>
                               <Option value="day">天</Option>
                               <Option value="week">周</Option>
                               <Option value="month">月</Option>
                            </Select>
                            </FormItem>

                            <FormItem {...formItemLayout}>
                            结构一级报警：
                            <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange}>
                               <Option value="1">1</Option>
                               <Option value="5">5</Option>
                               <Option value="10">10</Option>
                            </Select>

                            <Select defaultValue="minute" style={{ width: 120,marginLeft:10}} onChange={this.handleChange}>
                               <Option value="minute">分钟</Option>
                               <Option value="hour">小时</Option>
                               <Option value="day">天</Option>
                            </Select>
                            </FormItem>

                            <FormItem {...formItemLayout}>
                            结构二级报警：
                            <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange}>
                               <Option value="1">1</Option>
                               <Option value="5">5</Option>
                               <Option value="10">10</Option>
                            </Select>

                            <Select defaultValue="minute" style={{ width: 120,marginLeft:10}} onChange={this.handleChange}>
                               <Option value="minute">分钟</Option>
                               <Option value="hour">小时</Option>
                               <Option value="day">天</Option>
                            </Select>
                            </FormItem>
                            <FormItem {...offsetLayout}>
                                <Button type="primary" onClick={this.handleFilterSubmit} style={{marginLeft:0}}>确定</Button>
                                <Button type="primary" onClick={this.reset} style={{marginLeft:10}}>重置</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                    <TabPane tab="报警紧迫程度" key="3">
                    <Form layout="inline">
                            <FormItem {...formItemLayout}>
                            系统故障报警：
                            <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange}>
                               <Option value="1">1</Option>
                               <Option value="5">5</Option>
                               <Option value="10">10</Option>
                            </Select>

                            <Select defaultValue="day" style={{ width: 120,marginLeft:10}} onChange={this.handleChange}>
                               <Option value="day">天</Option>
                               <Option value="week">周</Option>
                               <Option value="month">月</Option>
                            </Select>
                            </FormItem>

                            <FormItem {...formItemLayout}>
                            结构一级报警：
                            <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange}>
                               <Option value="1">1</Option>
                               <Option value="5">5</Option>
                               <Option value="10">10</Option>
                            </Select>

                            <Select defaultValue="minute" style={{ width: 120,marginLeft:10}} onChange={this.handleChange}>
                               <Option value="minute">分钟</Option>
                               <Option value="hour">小时</Option>
                               <Option value="day">天</Option>
                            </Select>
                            </FormItem>

                            <FormItem {...formItemLayout}>
                            结构二级报警：
                            <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange}>
                               <Option value="1">1</Option>
                               <Option value="5">5</Option>
                               <Option value="10">10</Option>
                            </Select>

                            <Select defaultValue="minute" style={{ width: 120,marginLeft:10}} onChange={this.handleChange}>
                               <Option value="minute">分钟</Option>
                               <Option value="hour">小时</Option>
                               <Option value="day">天</Option>
                            </Select>
                            </FormItem>
                            <FormItem {...offsetLayout}>
                                <Button type="primary" onClick={this.handleFilterSubmit} style={{marginLeft:0}}>确定</Button>
                                <Button type="primary" onClick={this.reset} style={{marginLeft:10}}>重置</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                </Tabs>
                {/* <FormItem label="选择设备名称">
                    {
                        getFieldDecorator('deviceName',{
                            initialValue: ''
                        })
                        (
                            <Input />
                        )
                    }
                </FormItem> */}
                {/* <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem> */}
            </Form>
            </Card>
        );
    }
}
export default FilterForm = Form.create({})(FilterForm);

