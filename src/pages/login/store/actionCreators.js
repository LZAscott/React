import axios from 'axios'
import * as constants from './constants'

const loginSuccess = ()=>({
	type: constants.LOGIN_SUCCESS,
	value: true
})

export const logout = ()=>({
	type: constants.LOGOUT_SUCCESS,
	value: false
})

export const login = (account, pwd) => {
  return (dispatch) => {
		axios.get('/api/login.json?account=' + account + '&password=' + pwd).then((res)=>{
			const result = res.data.data;
			console.log(result);
			if (result){
				dispatch(loginSuccess());
			}else{
				alert('登录失败');
			}
		}).catch(() => {
			alert('失败');
		})
	}
}