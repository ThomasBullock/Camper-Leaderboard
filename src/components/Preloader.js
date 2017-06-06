import React from 'react';
import spinner from '../img/clock.svg'

const Preloader = () => {
	const imgStyle = {
  background: "#333"
	};
	return (
		<img src={spinner} alt="loader spinner" style={imgStyle}/>
	)
}

export default Preloader;