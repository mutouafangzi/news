/*
* 头部组件*/
import React,{Component} from 'react'
import axios from 'axios'
import logo from '../images/newspaper.png'
import {Link} from 'react-router'
import {
    Button,
    Row,
    Col,
    Icon,
    Menu,
    Modal,
    Form,
    Input,
    Tabs,
    //其他都是标签组件，只有这个是js组件
    message
} from 'antd';


//我也不知道是啥，官方提供的让From用的。
const FormItem = Form.Item;
//官方提供让tabs用的
const TabPane = Tabs.TabPane;
// 菜单项组件
const MenuItem = Menu.Item



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

    componentDidMount () {
        // 读取保存到local中的username
        const username = localStorage.getItem('username')
        if(username) {
            // 更新状态
            this.setState({username})
        }
    }


//No,获取当前表单域提交的内容，并且进行解析。
    /*
     处理提交登陆的请求
     */
    handleSubmit = (isLogin) => {

        //官网提供
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         console.log('Received values of form: ', values);//{username: "1234", password: "123456"}
        //     }
        // });

        // console.log(this.props.form);//{getFieldsValue: ƒ, getFieldValue: ƒ, getFieldInstance: ƒ, setFieldsValue: ƒ, setFields: ƒ, …}

        //收集表单输入的数据
        // console.log(this.props.form.getFieldsValue());//{username: "1234", password: "123456", r_username: undefined, r_password: undefined, r_confirmPassword: undefined}
        const {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue();
    //    准备url
    //    登录url:http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=zxfjd3g&password=123123
    //    注册url:http://newsapi.gugujiankong.com/Handler.ashx?action=register&r_userName=abc&r_password=123123&r_confirmPassword=123123
        let url = 'http://newsapi.gugujiankong.com/Handler.ashx?'
        if (isLogin){
        //    登录操作，登陆的话就将数据进行验证
        //    http://newsapi.gugujiankong.com/Handler.ashx?action=register&undefined=abc&123123=123123&123123=undefined
            url += "action=login&username="+username+"&password="+password;
        }else{
        //    注册操作，注册的话就将数据进行保存
            url += "action=register&r_userName="+username+"&r_password="+password+"&r_confirmPassword="+r_confirmPassword;
        }

    //    发请求
        axios.get(url)
            .then(response=>{
            //    清除输入的数据
                this.props.form.resetFields();
                //请求返回的数据？？？？？？
                console.log(response.data)
                const result = response.data;
                if(isLogin){//登陆的返回
                    console.log(result);
                    if(!result){//登陆失败
                        console.log(result);
                        message.error('登陆失败, 重新登陆');
                    }else{
                    //      成功
                        message.success('登陆成功');
                    //    读取返回的username/userId
                        const username = result.NickUserName;
                        const userId = result.UserId;
                    //    更新状态
                        /*this.state={
                         username:null,
                         visible: false,
                         selectedKeys:'toutiao'	//当前选中的菜单项
                         }
                        * */
                        this.setState({username})
                        console.log(this.state.username)
                    //    保存username/userId
                        localStorage.setItem('username', username)
                        localStorage.setItem('userId', userId)
                    }
                }else{//注册的返回
                    // 提示成功
                    message.success('注册成功')
                }
            })
    //    关闭model
        this.setState({visible: false})
    }


    //点击用户中心的按钮时的处理，等价于老师的clickMenu
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
    // handleOk = () => {
    //     this.setState({
    //         visible: false,
    //     });
    // }
    // handleCancel = (e) => {
    //
    //     this.setState({
    //         visible: false,
    //     });
    // }
    //弹出对话框之后，可以选择取消或者直接关闭。
    showModal = (isShow) => {
        //相当于老师的modalShow
        this.setState({visible: isShow})
    }
    //没有弹出登录对话框时，就是在页面上。可以直接退出当前登录的函数。
    logout=()=>{
        //    更新状态
        this.setState({username: null})
        //    清除保存用户数据
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
    }


    render() {

//我也不知道是啥，官方提供的让From用的。
        const { getFieldDecorator } = this.props.form;

        //tabs让用的
        function callback(key) {
            console.log(key);
        }

        /*根据是否输入的有username，来判断当前应该显示什么样式的菜单项*/
        const userShow = !this.state.username ? (
            //需要有个在右样式，这个样式需要手动设置
            <Menu.Item key="logout" className="register">
                <Icon type="appstore" />登录/注册lallaal
            </Menu.Item>
        ): (
            <Menu.Item key="login" className="register">
                <Button type='primary'>{this.state.username}</Button>
                &nbsp;&nbsp;
                <Link to="/user_center"><Button type="dashed">个人中心</Button></Link>&nbsp;&nbsp;
                <Button onClick={this.logout}>退出</Button>
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
                            onOk={this.showModal.bind(this, false)}
                            onCancel={() =>this.showModal(false)}
                            okText="关闭"
                        >
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="登录" key="1">
                                    <Form onSubmit={this.handleSubmit.bind(this,true)} className="login-form">
                                        <FormItem label="用户名">
                                            {getFieldDecorator('username', {
                                                rules: [{ required: true, message: '请输入你的用户名!' }],
                                            })(
                                                <Input placeholder="输入用户名" />
                                            )}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('password', {
                                                rules: [{ required: true, message: '请输入你的密码!' }],
                                            })(
                                                <Input placeholder="输入密码" />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" htmlType="submit" >
                                                登录
                                            </Button>

                                        </FormItem>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    {/*传参数，代表当前不是登录而是注册*/}
                                    <Form onSubmit={this.handleSubmit.bind(this,false)} className="login-form">
                                        <FormItem label="账户">
                                            {getFieldDecorator('r_username', {
                                                rules: [{ required: true, message: '请输入你的用户名!' }],
                                            })(
                                                <Input placeholder="输入用户名" />
                                            )}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('r_password', {
                                                rules: [{ required: true, message: '请输入你的密码!' }],
                                            })(
                                                <Input placeholder="输入密码" />
                                            )}
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {getFieldDecorator('r_confirmPassword', {
                                                rules: [{ required: true, message: '请再次输入密码!' }],
                                            })(
                                                <Input placeholder="再次输入密码" />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" htmlType="submit" >
                                                注册
                                            </Button>

                                        </FormItem>
                                    </Form>

                                </TabPane>
                            </Tabs>

                        </Modal>

                    </Col>
                    <Col span={1}></Col>
                </Row>
            </header>
        )
    }
}


export default  Form.create()(NewsHeader)