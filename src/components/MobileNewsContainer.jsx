import React, {Component} from 'react'
import {Row , Col , Tabs , Carousel } from 'antd'
import MobileNewsBlock from './MobileNewsBlock'


//图片的引入
import carousel_1 from '../images/人生1.jpg'
import carousel_2 from '../images/人生2.jpg'
import carousel_3 from '../images/人生3.jpg'
import carousel_4 from '../images/人生4.jpg'


const TabPane = Tabs.TabPane;

export default class MobileNewsContainer extends Component {
    render() {
        return (
                <Tabs>
                    <TabPane tab="头条" key="1">
                        <div style={{width: '100%'}}>
                            <Carousel autoplay>
                                 <div><img src={carousel_1}/></div>
                                 <div><img src={carousel_2}/></div>
                                 <div><img src={carousel_3}/></div>
                                 <div><img src={carousel_4}/></div>
                             </Carousel>
                        </div>
                        {/*http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=guoji&count=6*/}
                        <MobileNewsBlock type="top" count={21}></MobileNewsBlock>
                        {/* <Card style={{ width: 300 }}>
                         <p>Card content</p>
                         <p>Card content</p>
                         <p>Card content</p>
                         </Card>*/}
                    </TabPane>
                    <TabPane tab="社会" key="shehui">
                        <MobileNewsBlock count={20} type="shehui"/>
                    </TabPane>
                    <TabPane tab="国内" key="guonei">
                        <MobileNewsBlock count={20} type="guonei"/>
                    </TabPane>
                    <TabPane tab="国际" key="guoji">
                        <MobileNewsBlock count={20} type="guoji"/>
                    </TabPane>
                    <TabPane tab="娱乐" key="yule">
                        <MobileNewsBlock count={20} type="yule"/>
                    </TabPane>
                </Tabs>
        )
    }
}