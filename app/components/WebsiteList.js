import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';

import Navbar from './Navbar';
import Footer from './Footer';

import WebsiteListStore from '../stores/WebsiteListStore';
import WebsiteListActions from '../actions/WebsiteListActions';

class WebsiteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = WebsiteListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    WebsiteListStore.listen(this.onChange);
    WebsiteListActions.getWebsites(this.props.params);
  }

  componentWillUnmount() {
    WebsiteListStore.unlisten(this.onChange);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.params, this.props.params)) {
      WebsiteListActions.getWebsites(this.props.params);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  handleClick(website) {
    console.log(website)
  }

  handleStatus(status) {
      WebsiteListActions.updateWebsite(status);
  }

  handleDel(siteId) {
    WebsiteListActions.delWebsite(siteId);
  }

  render() {
    let WebsitesList = this.state.websites.map((Website, index) => {
      return (
          <tr key={Website.WebsiteId}>
            <td>{index + 1}</td>
            <td>{Website.name}</td>
            <td>{Website.url}</td>
            <td>{Website.valid?'运行':'暂停'}</td>
            <td>
                <button type="button" onClick={this.handleDel.bind(this, Website)} className="btn">删除</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" onClick={this.handleStatus.bind(this, Website)} className="btn">{Website.valid?'暂停':'运行'}</button>
            </td>
          </tr>  
      );
    });

    return (
        <div>
            <Navbar history={this.props.history} />    
            <div className='container'>
                <table className="table table-striped" style={{width:'100%',background:'#fff'}}>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>网站名称</th>
                            <th>网址</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {WebsitesList}  
                    </tbody>    
                </table>
            </div>
            <Footer /> 
        </div>
    );
  }
}

export default WebsiteList;