import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { 
	LoginWrapper,
	LoginBox,
	Input,
	Button,
 } from './style'


class Login extends PureComponent {
	render() {
		const {loginStatus} = this.props;

		if (!loginStatus){
			return (
				<LoginWrapper>
					<LoginBox>
						<Input placeholder='账号' ref={(input)=>{this.account = input}}/>
						<Input placeholder='密码' type='password' ref={(input)=>{this.pwd = input}}/>
	
						<Button onClick={() => this.props.login(this.account, this.pwd)}>登录</Button>
					</LoginBox>
				</LoginWrapper>
			)
		}else{
			return <Redirect to='/'/>
		}
	}
}


const mapState = (state) => ({
	loginStatus: state.getIn(['login', 'login'])
})

const mapDipatch = (dispatch) => ({
	login(accountEle, pwdEle){
		dispatch(actionCreators.login(accountEle.value, pwdEle.value))
	}
})

export default connect(mapState, mapDipatch)(Login)
