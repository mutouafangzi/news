import React, {Component} from 'react'
import {Tabs,Form,Modal, Button,Input,Icon,message} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'
import logo from '../images/newspaper.png'


const TabPane = Tabs.TabPane
const FormItem = Form.Item

class MobileHeader extends Component {

    state={
        username: null,
        modalVisible:false
    }

    componentWillMount(){
        // 读取保存到local中的username
        const username = localStorage.getItem('username')
        if(username){
            //更新状态
            this.setState({username});
        }
    }



    //点击任何关闭或者取消的按钮，弹出框都会关闭
    setModalVisible= (isVisible)=>{
        this.setState({modalVisible:isVisible})
    }


    handleSubmit = (isLogin,event)=>{
        //阻止表单的提交默认行为
        event.preventDefault()

        const {username,password,n_userName,n_password,n_cMpassword}=this.props.form.getFieldsValue();

        //根据传入的参数判断是登陆还是注册，向不同的接口发送不同的url请求
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?`;
        if (isLogin){
            //当前是登陆
            //http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=zxfjd3g&password=123123
            //收集发送url需要的数据
            url += `action=login&username=${username}&password=${password}`;
        }else{
            //当前是注册
            url += `action=register&r_userName=${n_userName}&r_password=${n_password}&r_confirmPassword=${n_cMpassword}`
        }
        //根据url发送ajax请求
        axios.get(url)
            .then(response=>{
                //清除输入的数据
                this.props.form.resetFields();
                //请求返回的数据
                const result = response.data;
                if(isLogin){
                    if(!result){
                        message.error('登陆错误，请重新登陆');
                    }else{
                        message.success('登陆成功')
                        //将登陆成功的数据保存起来，在当前用户下操作页面
                        /*"UserId": 514,
                            "NickUserName": "zxfjd3g",*/
                        const userid = result.UserId;
                        const username = result.NickUserName;
                        //保存
                        localStorage.setItem('userid',userid);
                        localStorage.setItem('username',username);
                        //更新状态
                        this.setState({username,userid});
                    }
                }else{
                    message.success('注册成功')
                }
            })
        //更改状态。无论登录或者注册成功与否，弹出的对话框都需要关闭。
        this.setState({modalVisible:false})
    }



    render() {

        const {username,userid,modalVisible} = this.state;
        const {getFieldDecorator} = this.props.form;
        const userItem=(username
                ?(<Link to={'/user_center'}>
                    <Icon type="home" /></Link>)
                :(<Icon type="setting" onClick={this.setModalVisible.bind(this,true)}/>));

        return (
            <div id="mobileheader">
                <header>
                    <div>
                        <Link to='/'>
                            <img src={logo} alt="logo"/>
                            <span>ReactNews2</span>
                        </Link>
                        {userItem}
                    </div>
                </header>
                <Modal
                    title="用户中心"
                    visible={modalVisible}
                    onOk={this.setModalVisible.bind(this,false)}
                    onCancel={this.setModalVisible.bind(this,false)}
                    okText='关闭'
                >
                    <Tabs type='card' defaultActiveKey="1" onChange={()=>this.props.form.resetFields()}>
                        <TabPane tab="登录" key="1">
                            <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                <FormItem label='账户'>
                                    {getFieldDecorator('username')(
                                        <Input type='text' placeholder="Username" />
                                    )}
                                </FormItem>
                                <FormItem label='密码'>
                                    {getFieldDecorator('password')(
                                        <Input type="password" placeholder="Password" />
                                    )}
                                </FormItem>
                                <Button type="primary" htmlType="submit">
                                    登录
                                </Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                <FormItem label='你的名字'>
                                    {getFieldDecorator('n_userName')(
                                        <Input type='你的名字' placeholder="Username" />
                                    )}
                                </FormItem>
                                <FormItem label='密码'>
                                    {getFieldDecorator('n_password')(
                                        <Input type="password" placeholder="新密码" />
                                    )}
                                </FormItem>
                                <FormItem label='再输一遍密码'>
                                    {getFieldDecorator('n_cMpassword')(
                                        <Input type="password" placeholder="再输一遍新密码" />
                                    )}
                                </FormItem>
                                <Button type="primary" htmlType="submit">
                                    注册
                                </Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(MobileHeader)