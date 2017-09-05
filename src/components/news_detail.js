import React, {Component} from 'react'
import axios from 'axios';
import {Row,Col,Form} from 'antd';
import NewsComments from './news_comments'
import NewsImageBlock from "./news_image_block";


export default class NewsDetail extends Component {

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
        let {type} = this.props.params
        // 如果没有指定, 默认指定为top
       /* if(!type) {
            type = 'top'
        }*/

        const newsdetail = !this.state.news
        ?(<h3>新闻数据不存在</h3>)
        :(<div dangerouslySetInnerHTML={{__html:this.state.news.pagecontent}}></div>)



        // console.log(this.props,this.props.params)
        return (
            <Row>
                <Col span={1}></Col>
                <Col span={16}  className='container'>
                    {newsdetail}
                    <NewsComments uniquekey={this.props.params.uniquekey}></NewsComments>
                </Col>
                <Col span={6}>
                    <NewsImageBlock type={type} count={40} cardWidth='100%' imageWidth='150px' cardTitle="相关新闻"/>
                </Col>
                <Col span={1}></Col>
            </Row>

            /*<div>
                {newsdetail}
            </div>*/

        )
    }
}