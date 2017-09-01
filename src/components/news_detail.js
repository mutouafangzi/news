import React, {Component} from 'react'
export default class NewDetail extends Component {

    render() {
        // console.log(this.props,this.props.params)
        return (<div>新闻详情id:{this.props.params.id}</div>)
    }
}