import React, { Component } from 'react';
import classnames from 'classnames'

class Button extends Component {
	constructor(props) {
		super(props)


		this.clickHandler = this.clickHandler.bind(this);

		this.state = {
			active: false
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log(this.props, nextProps)
		if(this.props.active !== nextProps.active) {
			this.setState({
				active: nextProps.active
			})
		}
	}
	clickHandler() {
		this.props.clickFunc();
	}

	render() {
		let classes = classnames({active: this.state.active})
		return(
			<button className={classes} onClick={this.clickHandler}>{this.props.label}</button>
		)
	}
}

export default Button;