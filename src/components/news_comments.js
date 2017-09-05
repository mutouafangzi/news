import React, {Component, PropTypes} from 'react'
import {Form, Card, Input, Button, notification} from 'antd'
import axios from 'axios'

const FormItem = Form.Item;

class NewsComments extends Component {

    static propTypes = {
        uniquekey: PropTypes.string.isRequired
    }
    //http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=161028192308012
    state ={
        comments:[]
    }
    //进入当前组件页面时加载
    componentDidMount(){
        //获取发送ajax请求需要的数据
        const {uniquekey}=this.props;
        this.showComments(uniquekey)
    }

    //切换新闻时执行
    componentWillReceiveProps (newProps) {
        this.showComments(newProps.uniquekey)
    }

    showComments(uniquekey){
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`;
        //发送ajax请求
        axios.get(url)
            .then(response=>{
                //将需要的内容从返回的响应数据中拿出来，这个内容常常是状态对象存储的数据
                const comments=response.data;
                //更改状态
                this.setState({comments});
                console.log(this.state.comments)
            })
    }

    //提交评论
    handleSubmit= () =>{
        //获取当前发送请求需要的数据。
        //获取原来保存已有的数据
        const userid = localStorage.getItem('userid');
        if(!userid){
            alert('请先登录')
            return
        }
        const {uniquekey}=this.props;
        //获取现在新输入的数据
        const content=this.props.form.getFieldValue('content')
        // http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=512&uniquekey=161028202106247&commnet=testtest
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userid}&uniquekey=${uniquekey}&commnet={content}`
        //发送ajax请求
        axios.get(url)
            .then(response=>{
                //已经将新增的评论添加，此时需要的是更新原有的评论列表。
                //注意此时response.data只是一个true值。
                this.componentDidMount();
                //提示
                notification.success({
                    message:'提交评论成功'
                })
                //清除输入数据
                this.props.form.resetFields();
            })
    }


    //收藏文章
    handleClick = ()=>{
        //http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=514&uniquekey=161028202106247
        //获取发送ajax请求需要的参数
        const userid = localStorage.getItem('userid');
        const {uniquekey}=this.props;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userid}&uniquekey=${uniquekey}`
        //发送请求
        axios.get(url)
            .then(response=>{
                   //提示收藏成功
                    notification.success({
                        message:'收藏文章成功'
                    })
                })
    }




    render() {

        const {comments} = this.state;
        const { getFieldDecorator } = this.props.form;

        const commentList = !comments
            ?(<h2>评论列表为空</h2>)
            :(
                comments.map(
                    (comment,index)=>(<Card key={index} title={comment.uniquekey} >
                            <p>{comment.Comments}</p>
                    </Card>)

                )
            )



        return (
            <div style={{padding:'10px'}}>
                {commentList}

                <Form onSubmit={this.handleSubmit}>
                    <FormItem label='您的评论'>
                        {getFieldDecorator('content')(
                            <Input type='textarea' placeholder="请输入评论内容" />
                        )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">
                        提交评论
                    </Button>
                    <Button type="primary" onClick={this.handleClick}>
                        收藏文章
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Form.create()(NewsComments)