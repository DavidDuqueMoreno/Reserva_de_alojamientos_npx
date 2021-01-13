import React, { Fragment } from 'react';
import logo from './images/logo.jpg';

export default class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<section>
					<img className="header_logo" src={logo} alt="Logo Tu Alojamiento" />
				</section>
				<section className="date_header">
					<p>
						Hoteles desde el <strong>{this.props.date1}</strong>
						<br />
						hasta el <strong>{this.props.date2}</strong>
					</p>
				</section>
			</div>
		);
	}
}
