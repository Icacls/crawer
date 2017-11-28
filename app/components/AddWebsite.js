import React from 'react';
import AddWebsiteStore from '../stores/AddWebsiteStore';
import AddWebsiteActions from '../actions/AddWebsiteActions';

import Navbar from './Navbar';
import Footer from './Footer';

const uuidv1 = require('uuid/v1'); 

class AddWebsite extends React.Component {
    constructor(props) {
        super(props);
        this.state = AddWebsiteStore.getState();
        this.onChange = this.onChange.bind(this);
      }
    
      componentDidMount() {
        AddWebsiteStore.listen(this.onChange);
      }
    
      componentWillUnmount() {
        AddWebsiteStore.unlisten(this.onChange);
      }
    
      onChange(state) {
        this.setState(state);
      }
    
      handleSubmit(event) {
        event.preventDefault();
    
        var name = this.state.name.trim();
        var url = this.state.url;
    
        if (!name) {
          AddWebsiteActions.invalidName();
          this.refs.nameTextField.focus();
        }
    
        if (!url) {
          AddWebsiteActions.invalidUrl();
          this.refs.urlTextField.focus();
        }
    
        if (name && url) {
          AddWebsiteActions.addWebsite(name, url);
        }
      }
    
      render() {
        return (
          <div>
            <Navbar history={this.props.history} />
              <div className='container'>
                <div className='row flipInX animated'>
                  <div className='col-sm-8'>
                    <div className='panel panel-default'>
                      <div className='panel-heading'>添加网站</div>
                      <div className='panel-body'>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                          <div className={'form-group ' + this.state.nameValidationState}>
                            <label className='control-label'>网站名称</label>
                            <input type='text' className='form-control' ref='nameTextField' value={this.state.name}
                                  onChange={AddWebsiteActions.updateName} autoFocus/>
                            <span className='help-block'>{this.state.helpBlock}</span>
                          </div>
                          <div className={'form-group ' + this.state.urlValidationState}>
                            <label className='control-label'>网址</label>
                            <input type='text' className='form-control' ref='urlTextField' value={this.state.url}
                                  onChange={AddWebsiteActions.updateUrl} autoFocus/>
                            <span className='help-block'>{this.state.helpBlock}</span>
                          </div>
                          <button type='submit' className='btn btn-primary'>提交</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <Footer /> 
           </div>
        );
      }
}

export default AddWebsite;