/*
* 头部组件*/
import React,{Component} from 'react'
import axios from 'axios'
import logo from '../images/logo.png'

import {
    Button,
    Row,
    Col,
    Icon,
    Menu,
    Modal,
    Form,
    Input,
    Checkbox
} from 'antd';


//我也不知道是啥，官方提供的让From用的。
const FormItem = Form.Item;



class NewsHeader extends Component {

    //自己会给自己传入一些参数，这些参数是自己页面上获得的，所以直接定义到state对象上。
    constructor(props){
        super(props)
        this.state={
            username:null,
            visible: false,
            selectedKeys:'toutiao'	//当前选中的菜单项
        }
    }


//我也不知道是啥，官方提供的让From用的。
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    //点击用户中心时，弹出一个对话框的函数
    handleClick = ({key}) => {
        // console.log(e);//{key: "guonei", keyPath: Array(1), item: {…}, domEvent: Proxy}
        if(key == 'logout'){
            //显示对话框，维度的一个，点击它的时候需要更改对话框选项
            this.setState({visible: true})
        }
    //    其余项点击时需要更改key，也就是做个标识，知道现在自己点击的是哪一个
        this.setState({selectedKeys:key})

    }
    //弹出输入框，点击确定和关闭触发的函数
    handleOk = () => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {

        this.setState({
            visible: false,
        });
    }



    render() {

//我也不知道是啥，官方提供的让From用的。
        const { getFieldDecorator } = this.props.form;

        /*根据是否输入的有username，来判断当前应该显示什么样式的菜单项*/
        const userShow = !this.state.username ? (
            //需要有个在右样式，这个样式需要手动设置
            <Menu.Item key="logout" className="register">
                <Icon type="appstore" />登录/注册
            </Menu.Item>
        ): (
            <Menu.Item key="login" className="register">
                <Button type='primary'></Button>
                <Button></Button>
                <Button></Button>
            </Menu.Item>
        )



        return(
            <header>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <a href="#/" className="logo">
                            <img src={logo} alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={19}>
                        <Menu onClick={this.handleClick} mode="horizontal">
                            <Menu.Item key="toutiao">
                                <Icon type="appstore" />头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore" />社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore" />国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore" />国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore" />娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore" />体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore" />科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore" />时尚
                            </Menu.Item>

                            {/*用户登录模块*/}
                            {userShow}
                        </Menu>
                        <Modal
                            title="用户中心"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(
                                        <Checkbox>Remember me</Checkbox>
                                    )}
                                    <a className="login-form-forgot" href="">Forgot password</a>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                    Or <a href="">register now!</a>
                                </FormItem>
                            </Form>
                        </Modal>


                    </Col>
                    <Col span={1}></Col>
                </Row>
            </header>
        )
    }
}


export default  Form.create()(NewsHeader)