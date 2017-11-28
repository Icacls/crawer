import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {first, without, findWhere} from 'underscore';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleClick(event) {
    event.preventDefault();
    var pwd = this.state.pwd;
    if (this.state.pwd && this.state.pwd === 'kecing') {
        location.href = '/sites'
    }
  }

  render() {
    return (
      <div className='container'>
        <div className="top-content">
            <div className="inner-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3 form-box">
                        	<div className="form-top">
                        		<div className="form-top-left">
                        			<h3>Login to our site</h3>
                            		<p>Enter your  password to log on:</p>
                        		</div>
                        		<div className="form-top-right">
                        			<i className="fa fa-key"></i>
                        		</div>
                            </div>
                            <div className="form-bottom">
			                    <form role="form" action="" method="post" className="login-form">
			                        <div className="form-group">
			                        	<label className="sr-only" >Password</label>
                                        <input type='password' className='form-password form-control'  value={this.state.pwd}
                                  onChange={HomeActions.updatePwd} autoFocus/>
			                        </div>
			                        <button type="button" onClick={this.handleClick.bind(this)} className="btn">Sign in!</button>
			                    </form>
		                    </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    );
  }
}

export default Login;