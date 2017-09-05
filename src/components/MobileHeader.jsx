import React, {Component} from 'react'
import {Tabs,Form,Modal, Button,Input,Icon} from 'antd'
import {Link} from 'react-router'
import logo from '../images/newspaper.png'


const TabPane = Tabs.TabPane
const FormItem = Form.Item

class MobileHeader extends Component {

    state={
        username: null,
        modalVisible:false
    }


    setModalVisible= (isVisible)=>{
        this.setState({modalVisible:isVisible})
    }


    handleSubmit = (isLogin)=>{

        const {username,password,n_userName,n_password,n_cMpassword}=this.props.form.getFieldsValue();

        //根据传入的参数判断是登陆还是注册，向不同的接口发送不同的url请求
        if (isLogin){
            //当前是登陆状态
            //http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=zxfjd3g&password=123123
            //收集发送url需要的数据
            let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=${username}&password=${password}`;


        }else{
            //当前是注册
            url = `http://newsapi.gugujiankong.com/Handler.ashx?action=register&r_userName=${n_userName}&r_password=${n_password}&r_confirmPassword=${n_cMpassword}`

        }





        //更改状态
        this.setState({modalVisible:isLogin})
    }



    render() {

        const userItem=(<h2>hahahah</h2>);
        const {modalVisible} = this.state;
        const {getFieldDecorator} = this.props.form;


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
                            <Form onSubmit={this.handleSubmit.bind(this,false)}>
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
                            <Form onSubmit={this.handleSubmit.bind(this, true)}>
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