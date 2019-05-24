import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import { Link } from 'react-router-dom'
import {
	HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	NavSearch,
	SearchWrapper,
	Addition,
	Button,
	SearchInfo,
	SearchInfoTitle,
	SearchInfoSwitch,
	SearchInfoItem,
	SearchInfoList
} from './style';

class Header extends PureComponent {

	render() {
		const { focused, list, handleInputFocus, handleInputBlur, login, logout } = this.props
		return (
			<HeaderWrapper>
				<Link to='/'>
					<Logo />
				</Link>

				<Nav>
					<NavItem className='left active'>首页</NavItem>
					<NavItem className='left'>下载App</NavItem>
					{
						login ?
							<NavItem className='right' onClick={logout}>退出</NavItem> :
							<Link to='/login'><NavItem className='right'>登录</NavItem></Link>
					}
					<NavItem className='right'>
						<i className='iconfont'>&#xe636;</i>
					</NavItem>

					<SearchWrapper>
						<CSSTransition
							in={focused}
							timeout={200}
							classNames="slide"
						>
							<NavSearch
								className={focused ? 'focused' : ''}
								onFocus={() => handleInputFocus(list)}
								onBlur={handleInputBlur}
							>
							</NavSearch>
						</CSSTransition>
						<i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe637;</i>

						{this.getListArea()}
					</SearchWrapper>

					<Addition>
						<Link to='/write'>
							<Button className='writting'>
								<i className='iconfont'>&#xe61d;</i>
								写文章
							</Button>
						</Link>
						<Button className='reg'>注册</Button>
					</Addition>
				</Nav>
			</HeaderWrapper>
		)
	}

	getListArea() {
		const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;
		const newList = list.toJS();
		const pageList = [];
		if (newList.length) {
			for (let i = (page - 1) * 10; i < page * 10; i++) {
				pageList.push(
					<SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
				)
			}
		}

		if (focused || mouseIn) {
			return (
				<SearchInfo
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>

					<SearchInfoTitle>
						热门搜索
						<SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
							<i ref={(icon) => { this.spinIcon = icon }} className='iconfont spin'>&#xe851;</i>
							换一批
						</SearchInfoSwitch>
					</SearchInfoTitle>
					<SearchInfoList>
						{pageList}
					</SearchInfoList>
				</SearchInfo>
			)
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		focused: state.get('header').get('focused'),
		list: state.get('header').get('list'),
		page: state.get('header').get('page'),
		totalPage: state.get('header').get('totalPage'),
		mouseIn: state.get('header').get('mouseIn'),
		login: state.get('login').get('login'),
	}
}

const mapDispatchToPorps = (dispatch) => {
	return {
		handleInputFocus(list) {
			(list.size === 0 && dispatch(actionCreators.getList()));
			dispatch(actionCreators.searchFocus());
		},

		handleInputBlur() {
			dispatch(actionCreators.searchBlur());
		},

		handleMouseEnter() {
			dispatch(actionCreators.mouseEnter());
		},

		handleMouseLeave() {
			dispatch(actionCreators.mouseLeave());
		},

		handleChangePage(page, totalPage, spin) {
			let originAngle = spin.style.transform.replace(/[^0-9]/ig, '')
			if (originAngle) {
				originAngle = parseInt(originAngle, 10)
			} else {
				originAngle = 0
			}
			spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
			if (page < totalPage) {
				dispatch(actionCreators.changePage(page + 1));
			} else {
				dispatch(actionCreators.changePage(1));
			}
		},

		logout() {
			dispatch(loginActionCreators.logout())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToPorps)(Header);
