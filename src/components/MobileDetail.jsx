import React, {Component} from 'react'
import axios from 'axios';
import {Row,Col} from 'antd';
import NewsComments from './news_comments'




export default class MobileDetail extends Component {

    state = {
        news:{}
    }

    componentDidMount (){
        let {uniquekey}=this.props.params;


        console.log(this.props.params);
        const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
        //发送请求，请求当前点击的新闻数据
            .then(response=>{
                //将请求返回的新闻对象中需要的内容拿出来；
                const news = response.data;
                //修改当前状态
                this.setState({news});
            })

    }



    render() {

        const newsdetail = !this.state.news
            ?(<h3>新闻数据不存在</h3>)
            :(<div dangerouslySetInnerHTML={{__html:this.state.news.pagecontent}}></div>)



        // console.log(this.props,this.props.params)
        return (
            <Row>
                <Col span={24}  className='container'>
                    {newsdetail}
                    <NewsComments uniquekey={this.props.params.uniquekey}></NewsComments>
                </Col>
            </Row>

            /*<div>
             {newsdetail}
             </div>*/

        )
    }
}