import React, { Fragment } from 'react';
import Hotels from './hotels';
import hotelsData from './data';
import Header from './header';

export default class Forms extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredHotels: hotelsData,
		};
	}

	handleInputs() {
		var dateFrom = parseInt(Date.parse(document.getElementById('date1').value)) + 104000000; //los 104 millones son para ajustar un desfase que
		var dateTo = parseInt(Date.parse(document.getElementById('date2').value)) + 104000000; //impide reservar para el mismo dia de disponibilidad
		var country = document.getElementById('country');
		var selectedCountry = country.options[country.selectedIndex].text;
		var price = document.getElementById('price');
		var selectedPrice = price.options[price.selectedIndex].text;
		var size = document.getElementById('size');
		var selectedSize = size.options[size.selectedIndex].text;

		//estos if impiden que desaparezcan todos los hoteles cuando
		//el usuario tiene una fecha seleccionada y la otra vacia

		if (Number.isNaN(dateFrom)) {
			dateFrom = 9007199254740991;
		}
		if (Number.isNaN(dateTo)) {
			dateTo = -9007199254740991;
		}

		//filtra fecha disponible con fecha ingresada por el usuario
		var dateFromFilter = hotelsData.filter((filter) => filter.availabilityFrom <= dateFrom);

		//filtra fecha disponible con fecha ingresada por el usuario
		var dateToFilter = dateFromFilter.filter((filter) => filter.availabilityTo >= dateTo);

		//filtra el pais
		var countryFilter = '';
		if (selectedCountry === 'Todos los paises') {
			countryFilter = dateToFilter;
		} else {
			countryFilter = dateToFilter.filter((filter) => filter.country === selectedCountry);
		}

		//filtra el precio
		var priceFilter = '';
		if (selectedPrice === 'Cualquier precio') {
			priceFilter = countryFilter;
		} else {
			selectedPrice === '$'
				? (selectedPrice = 1)
				: selectedPrice === '$$'
				? (selectedPrice = 2)
				: selectedPrice === '$$$'
				? (selectedPrice = 3)
				: selectedPrice === '$$$$'
				? (selectedPrice = 4)
				: (selectedPrice = 0);
			priceFilter = countryFilter.filter((filter) => filter.price === selectedPrice);
		}

		//filtra el tamaño
		var sizeFilter = '';
		if (selectedSize === 'Cualquier tamaño') {
			sizeFilter = priceFilter;
		} else {
			selectedSize === 'Hotel pequeño'
				? (sizeFilter = priceFilter.filter((filter) => filter.rooms <= 10))
				: selectedSize === 'Hotel mediano'
				? (sizeFilter = priceFilter.filter((filter) => filter.rooms > 10 && filter.rooms <= 20))
				: selectedSize === 'Hotel grande'
				? (sizeFilter = priceFilter.filter((filter) => filter.rooms > 20))
				: (selectedSize = 0);
		}

		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

		var headerDate1 = new Date(
			parseInt(Date.parse(document.getElementById('date1').value)) + 104000000
		).toLocaleDateString('es-CO', options);

		var headerDate2 = new Date(
			parseInt(Date.parse(document.getElementById('date2').value)) + 104000000
		).toLocaleDateString('es-CO', options);

		if (headerDate1 === 'Invalid Date' && headerDate2 !== 'Invalid Date') {
			headerDate1 = headerDate2;
		}

		if (headerDate2 === 'Invalid Date' && headerDate1 !== 'Invalid Date') {
			headerDate2 = headerDate1;
		}

		this.setState({
			filteredHotels: sizeFilter,
			headerDate1: headerDate1,
			headerDate2: headerDate2,
		});
	}
	render() {
		const hotels =
			this.state.filteredHotels.length > 0 ? (
				this.state.filteredHotels.map((hotels) => (
					<Hotels
						key={hotels.slug}
						photo={hotels.photo}
						name={hotels.name}
						description={hotels.description}
						city={hotels.city}
						country={hotels.country}
						rooms={hotels.rooms}
						price={
							hotels.price === 1
								? '$'
								: hotels.price === 2
								? '$$'
								: hotels.price === 3
								? '$$$'
								: hotels.price === 4
								? '$$$$'
								: ''
						}
					/>
				))
			) : (
				<h1>No hay hoteles disponibles con las caracteristicas seleccionadas</h1>
			);

		/* Aqui se genera la fecha actual en un formato YYYY-MM-DD para 
		meterla como valor minimo esperado (min) en los dos input date
		y asi evitar que el usuario meta una fecha menor a la actual */
		var time = new Date();
		var year = time.getFullYear();
		var month = time.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}
		var day = time.getDate();
		if (day < 10) {
			day = '0' + day;
		}
		var date = year + '-' + month + '-' + day;

		return (
			<>
				<Header date1={this.state.headerDate1} date2={this.state.headerDate2} />
				<section className="filters">
					<form className="form">
						<span className="form_span">Fecha ida</span>
						<input min={date} onChange={this.handleInputs.bind(this)} id="date1" type="date" />
					</form>
					<form className="form">
						<span className="form_span">Fecha regreso</span>
						<input min={date} onChange={this.handleInputs.bind(this)} id="date2" type="date" />
					</form>
					<form className="form">
						<select id="country" onChange={this.handleInputs.bind(this)}>
							<option selected>Todos los paises</option>
							<option>Argentina</option>
							<option>Brasil</option>
							<option>Chile</option>
							<option>Uruguay</option>
						</select>
					</form>
					<form className="form">
						<select id="price" onChange={this.handleInputs.bind(this)}>
							<option selected>Cualquier precio</option>
							<option>$</option>
							<option>$$</option>
							<option>$$$</option>
							<option>$$$$</option>
						</select>
					</form>
					<form className="form">
						<select id="size" onChange={this.handleInputs.bind(this)}>
							<option selected>Cualquier tamaño</option>
							<option>Hotel pequeño</option>
							<option>Hotel mediano</option>
							<option>Hotel grande</option>
						</select>
					</form>
				</section>
				<div className="hotels">{hotels}</div>
			</>
		);
	}
}
