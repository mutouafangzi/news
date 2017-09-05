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
            userid:null,
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


    //点击用户中心的按钮时的处理，等价于老师的clickMenu
    handleClick = ({key}) => {
        // console.log(e);//{key: "guonei", keyPath: Array(1), item: {…}, domEvent: Proxy}
        if(key == 'logout'){
            //显示对话框，唯独的一个页头的菜单项，点击它的时候需要更改对话框选项
            this.setState({visible: true})
        }
        //    其余项点击时需要更改key，也就是做个标识，知道现在自己点击的是哪一个
        this.setState({selectedKeys:key})

    }


//No,获取当前表单域提交的内容，并且进行解析。
    /*
     处理提交登陆的请求
     */
    handleSubmit = (isLogin,event) => {
        // 阻止表单提交的默认行为
        event.preventDefault()

        //收集表单输入的数据
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
            url += `action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        }

    //    发ajax请求
        axios.get(url)
            .then(response=>{
            //    清除输入的数据
                this.props.form.resetFields();
                //请求返回的数据
                const result = response.data;
                if(isLogin){//登陆的返回
                    if(!result){//登陆失败
                        message.error('登陆失败, 重新登陆');
                    }else{
                    //      成功
                        message.success('登陆成功');
                    //    读取返回的username/userId
                        const username = result.NickUserName;

                        const userid = result.UserId;
                    //    更新状态
                        /*this.state={
                         username:null,
                         visible: false,
                         selectedKeys:'toutiao'	//当前选中的菜单项
                         }
                        * */
                        this.setState({username, userid})

                    //    保存username/userId
                        localStorage.setItem('username', username)
                        localStorage.setItem('userid', userid)

                    }
                }else{//注册的返回
                    // 提示成功
                    message.success('注册成功')
                }
            })
    //    关闭model
        this.setState({visible: false})
    }




    //没有弹出登录对话框时，就是在页面上。可以直接退出当前登录的函数。
    logout=()=>{
        //    更新状态
        this.setState({username: null,userId:null})
        //    清除保存用户数据
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
    }


    //弹出对话框之后，点击提交或者取消按钮，对话框会关闭。
    showModal = (isShow) => {
        //相当于老师的modalShow
        this.setState({visible: isShow})
    }




    render() {

        //antd中from表单内提供的方法，用来处理form表单输入框的值
        const { getFieldDecorator } = this.props.form;
        /*
        * visible: false,
         selectedKeys:'toutiao'*/
        const {username,userid,visible,selectedKeys} = this.state;


        /*根据是否输入的有username，来判断当前应该显示什么样式的菜单项*/
        const userShow = !username ? (
            //需要有个在右样式，这个样式需要手动设置
            <Menu.Item key="logout" className="register">
                <Icon type="appstore" />登录/注册lallaal
            </Menu.Item>
        ): (
            <Menu.Item key="login" className="register">
                <Button type='primary'>{username}</Button>
                &nbsp;&nbsp;
                <Link to={`/user_center`}><Button type="dashed"> 个人中心</Button></Link>&nbsp;&nbsp;
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
                        <Menu onClick={this.handleClick}  mode="horizontal">
                            <Menu.Item key="top">
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
                            visible={visible}
                            onOk={this.showModal.bind(this, false)}
                            onCancel={() =>this.showModal(false)}
                            okText="关闭">
                            <Tabs defaultActiveKey="1" onChange={() => this.props.form.resetFields()}>
                                <TabPane tab="登录" key="1">
                                    <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                        <FormItem label="用户名">
                                            {getFieldDecorator('username')(
                                                <Input placeholder="输入用户名" type="text"/>
                                            )}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('password')(
                                                <Input  type='password' placeholder="输入密码" />
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
                                    <Form onSubmit={this.handleSubmit.bind(this,false)}>
                                        <FormItem label="账户">
                                            {getFieldDecorator('r_userName')(
                                                <Input placeholder="输入用户名"  type='text'/>
                                            )}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('r_password')(
                                                <Input placeholder="输入密码"  type='password'/>
                                            )}
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {getFieldDecorator('r_confirmPassword')(
                                                <Input  type='password' placeholder="再次输入密码" />
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