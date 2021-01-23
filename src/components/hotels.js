import React from 'react';
import locationIcon from './images/location.jpg';
import bedIcon from './images/bed.png';

export default class Hotels extends React.Component {
	render() {
		const { name, description, photo, city, country, rooms, price } = this.props;
		return (
			<div className="hotel">
				<div className="hotel_image_container">
					<img className="hotel_image" src={photo} alt="{photo}" />
				</div>
				<div className="hotel_details">
					<div className="hotel_name">{name}</div>
					<div className="hotel_description">{description}</div>
					<div className="hotel_place">
						<div className="hotel_place_icon">
							<img style={{ width: '20px' }} src={locationIcon} alt="{locationIcon}" />
						</div>
						<div className="hotel_place_info">
							{city}, {country}
						</div>
					</div>
					<div className="hotel_rooms">
						<div className="hotel_rooms_icon">
							<img style={{ width: '20px' }} src={bedIcon} alt="{bedIcon}" />
						</div>
						<div className="hotel_rooms_info">{rooms} Habitaciones</div>
						<div className="hotel_price">{price}</div>
					</div>
				</div>
				<div className="hotel_reserve_container">
					<button className="hotel_reserve_button">Reservar</button>
				</div>
			</div>
		);
	}
}
