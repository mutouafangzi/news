import React, {Component, PropTypes} from 'react'
import axios from 'axios'
import {Card} from 'antd'
import {Link} from 'react-router'

export default class MobileNewsBlock extends Component {

    static propTypes={
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired
    }
    state = {
        newsArr:null
    }


    componentDidMount(){
        const {type,count}=this.props;
        const url =  `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
        axios.get(url)
            .then(response=>{
                const newsArr = response.data.map(({uniquekey, title})=>({uniquekey, title}))
                //更新状态
                this.setState({newsArr})
                // console.log(this.state.newsArr)
            })
    }



    render() {

        const {newsArr}=this.state;
        const {type} = this.props;
        const contentUI = !newsArr
            ? <h2>没有任何新闻</h2>
            : newsArr.map((news,index)=>(<Card  key={index} className="m_article list-item special_section clearfix">
                <Link to={`news_detail/${news.uniquekey}`}>
                    <div className="m_article_img">
                        <img src={news.thumbnail_pic_s} alt={news.title} />
                    </div>
                    <div className="m_article_info">
                        {/*新闻详细介绍内容*/}
                        <div className="m_article_title">
                            <span>{news.title}</span>
                        </div>
                        <div className="m_article_desc clearfix">
                            <div className="m_article_desc_l">
                                <span className="m_article_channel">{news.realtype}</span>
                                <span className="m_article_time">{news.date}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>))

        return (
            <Card className="topNewsList">
                {/* {console.log(newsArr)}*/}
                {contentUI}
            </Card>
        )
    }
}