import React, {Component} from 'react'
import {Row , Col , Tabs , Carousel , Card} from 'antd'
import NewsBlock from './news_block'
import NewsProducts from './news_products'
import NewsImageBlock from './news_image_block'

//图片的引入
import carousel_1 from '../images/人生1.jpg'
import carousel_2 from '../images/人生2.jpg'
import carousel_3 from '../images/人生3.jpg'
import carousel_4 from '../images/人生4.jpg'


const TabPane = Tabs.TabPane;

export default class NewsContainer extends Component {

    render() {
        return (
        <div>
            <Row className='container'>
                <Col span={1}></Col>
                <Col span={22}>
                    {/*轮播图*/}
                    <div className='leftContainer' style={{width:"35%"}}>
                        <Carousel autoplay>
                            <div><img src={carousel_1}/></div>
                            <div><img src={carousel_2}/></div>
                            <div><img src={carousel_3}/></div>
                            <div><img src={carousel_4}/></div>
                        </Carousel>
                        <NewsImageBlock type="guoji" count={6} cardTitle="国际新闻" cardWidth="100%" imageWidth='112px'></NewsImageBlock>
                    </div>

                    {/*中间的新闻页签*/}
                    <Tabs defaultActiveKey="1"  className='tabs_news' style={{width:"35%"}}>
                        <TabPane tab="头条新闻" key="1">
                            {/*http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=guoji&count=6*/}
                            <NewsBlock type="top" count={21}></NewsBlock>
                           {/* <Card style={{ width: 300 }}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>*/}
                        </TabPane>
                        <TabPane tab="国际新闻" key="2">
                            <NewsBlock type="guoji" count={21}></NewsBlock>
                        </TabPane>
                    </Tabs>

                    {/*右边的产品介绍*/}
                    <Tabs defaultActiveKey="1" className='tabs_news' style={{width:"30%"}}>
                        <TabPane tab="React News产品" key="1">
                            <NewsProducts></NewsProducts>
                        </TabPane>
                    </Tabs>

                    {/*最下面的新闻图片列表，轮播图下面也有*/}
                    <div>
                        <NewsImageBlock type="guonei" count={8} cardTitle="国内新闻" cardWidth="100%" imageWidth='132px'></NewsImageBlock>
                        <NewsImageBlock type="yule" count={16} cardTitle="娱乐新闻" cardWidth="100%" imageWidth='132px'></NewsImageBlock>
                    </div>


                </Col>
                <Col span={1}></Col>
            </Row>
        </div>)
    }
}