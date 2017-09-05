import React, {Component} from 'react'
import {Link} from 'react-router'
import {Tabs , Card , Col , Row , Upload, Icon, Modal} from 'antd'
import axios from 'axios'


const TabPane = Tabs.TabPane;

export default class UserCenter extends Component {


    state={
        collections:[],
        comments: [],
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    }

    componentDidMount(){
        //    发送请求用户收藏列表
        const userid = localStorage.getItem('userid');
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userid}`;
        axios.get(url)
            .then(response=>{
                const collections = response.data;
                this.setState({collections})
            })
        // ajax请求评论列表数据
        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userid}`
        axios.get(url)
            .then(response => {
                const comments = response.data
                this.setState({comments})
            })
    }
    //这些都是头像上传用的
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({ fileList }) => this.setState({ fileList })

    render() {
        const {collections} = this.state
        //上传列表需要
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        //收藏文章按钮需要
        const collectionList=!collections.length
            ?<h3>没有收藏数据</h3>
            :collections.map((collection,index)=>(
                    <Card key={index} title={collection.uniquekey}  extra={<Link to={`/news_detail/${collection.uniquekey}/top`}>查看</Link>}>
                        {collection.Title}
                    </Card>
            ))


        const {comments} = this.state
        const commentList = !comments.length
            ? <h3>没有任何评论</h3>
            : comments.map((comment, index) => (
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                      extra={<Link to={`/news_detail/${comment.uniquekey}/top`}>查看</Link>}>
                    {comment.Comments}
                </Card>
            ))



        return (
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Tabs>
                        <TabPane key="1" tab="我的收藏列表">
                            {collectionList}
                        </TabPane>
                        <TabPane key="2" tab="我的评论列表">
                            {commentList}
                        </TabPane>
                        <TabPane key="3" tab="头像设置">
                            <div className="clearfix">
                                <Upload
                                    action="http://jsonplaceholder.typicode.com/photos"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {fileList.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={1}></Col>

            </Row>



        )
    }
}