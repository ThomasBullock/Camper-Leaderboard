import React, { Component } from 'react';
import './Footer.css';
import fccIcon from '../img/freecodecamp.png';
import github from '../img/github.png';

class Footer extends Component {
	render() {
		return(
<footer className="footer" role="contentinfo">
  <div className="footer__logo">
    <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_square.png" alt="Logo"/>
  </div>
    <ul>
      <li>See this project on <a href="https://github.com/ThomasBullock/Markdown-Previewer">Github</a></li>
      <li>This web app uses <a href="https://github.com/chjj/marked">Marked</a></li>
    </ul>

    <div className="footer-secondary-links">
      <ul>
        <li>Created by Thomas Bullock as part of The Free Code Camp Data Visualisation Certfication</li>
      </ul>

      <ul className="footer-social">
        <li><a href="https://github.com/ThomasBullock">
          <img src={github} alt="Github"/>
          </a></li>
        <li><a href="https://www.freecodecamp.com/thomasbullock">
          <img src={fccIcon} alt="Free Code Camp"/>
        </a></li>
      </ul>
    </div>
</footer>
		)
	}
}

export default Footer;