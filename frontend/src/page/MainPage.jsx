import { useEffect, useState } from 'react'
import axios from 'axios'
import '../assets/css/Main.css'
import RegistrationPage from './RegistrationPage';
import Header from '../component/Header';
import Background from '../assets/img/Background.jpg'
import Cpu from '../assets/img/cpu.png'
import Graphics from '../assets/img/graphics.png'
import Ram from '../assets/img/ram.png'
import Monitor from '../assets/img/monitor.png'
import Mouse from '../assets/img/mouse.png'
import Chair from '../assets/img/chair.png'
import Footer from '../component/Footer';
import AuthService from '../service/AuthService';

function MainPage() {
	const [modalRegistration, setModalRegistration] = useState(false);
	const [types, setTypes] = useState('');
	const [placeType, setPlaceType] = useState(1);
	const [prices, setPrices] = useState('');

	useEffect(() => {
		if (AuthService.getCurrentUser() && AuthService.getCurrentUser().role == "ROLE_ADMIN") {
			AuthService.logout();
		}
	}, [])

	function getPrices() {
		axios.get("http://localhost:8080/price/get-by-place-type", { params: { placeType: placeType } })
			.then((response) => {
				setPrices(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function getTypes() {
		axios.get("http://localhost:8080/place-type/get")
			.then((response) => {
				setTypes(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getTypes();
	}, [])

	useEffect(() => {
		if (types && types.length > 0) {
			setPlaceType(types[0].id);
			getPrices();
		}
	}, [types])

	useEffect(() => {
		getPrices();
	}, [placeType])

	return (
		<>
			<Header active={modalRegistration} setActive={setModalRegistration} />
			<main className='main-page'>
				<div className="main-page__header main-header">
					<div className="main-header__body">
						<h1 className="main-header__title">Компьютерный Клуб</h1>
						<p className='main-header__description'>Лучший компьютерный клуб Вашего города</p>
						<button className='main-header__button button' onClick={() => { setModalRegistration(true); }}>Забронировать</button>
					</div>
					<div className="main-header__background">
						<img src={Background} />
					</div>
				</div>
				<div className="main-page__price price-block">
					<div className="price-block__container block__container">
						<h2 className="price-block__title block-title">Прайс</h2>
						<div style={{ marginBottom: '15px' }}>
							{types && types.map((type) => (
								<button className={type.id == placeType ? 'places-page__tabs admin-page__button active' : 'places-page__tabs admin-page__button'} onClick={() => { setPlaceType(type.id); }}>{type.name}</button>
							))}
						</div>
						<table className='price-block__table'>
							<thead>
								<tr>
									<th scope="col">Количество часов</th>
									<th scope="col">Время</th>
									<th scope="col">Цена</th>
								</tr>
							</thead>
							<tbody>
								{prices && prices.map((price) => (
									<tr>
										<td className='table-center'>{price.countHours}</td>
										<td>{price.startHour}:00-{price.endHour}:00</td>
										<td className='table-center'>{price.price}₽</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className="main-page__computers computers-block">
					<div className="computers-block__container  block__container">
						<h2 className="computers-block__title block-title">Железо</h2>
						<div className="computers-block__body">
							<div className="computers-block__item item-computers">
								<div className="item-computers__image">
									<img src={Cpu} alt="cpu" />
								</div>
								<div className="item-computers__content">
									<div className="item-computers__title">Процессоры</div>
									<p className='item-computers__text'>Intel Core i5-8400</p>
									<p className='item-computers__text'>Intel Core i5-12400F</p>
								</div>
							</div>
							<div className="computers-block__item item-computers">
								<div className="item-computers__image">
									<img src={Graphics} alt="cpu" />
								</div>
								<div className="item-computers__content">
									<div className="item-computers__title">Видеокарты</div>
									<p className='item-computers__text'>GeForce RTX 2060</p>
									<p className='item-computers__text'>GeForce GTX 3060Ti</p>
								</div>
							</div>
							<div className="computers-block__item item-computers">
								<div className="item-computers__image">
									<img src={Ram} alt="cpu" />
								</div>
								<div className="item-computers__content">
									<div className="item-computers__title">Память</div>
									<p className='item-computers__text'>16GB DDR4</p>
									<p className='item-computers__text'>32GB DDR4</p>
								</div>
							</div>
							<div className="computers-block__item item-computers">
								<div className="item-computers__image">
									<img src={Monitor} alt="cpu" />
								</div>
								<div className="item-computers__content">
									<div className="item-computers__title">Мониторы</div>
									<p className='item-computers__text'>ZOWIE 24" 144 Гц</p>
									<p className='item-computers__text'>DELL 25" 240 Гц</p>
								</div>
							</div>
							<div className="computers-block__item item-computers">
								<div className="item-computers__image">
									<img src={Mouse} alt="cpu" />
								</div>
								<div className="item-computers__content">
									<div className="item-computers__title">Девайсы</div>
									<p className='item-computers__text'>Клавиатуры, мышки и наушники от HyperX, Logitech, SteelSeries и Razer.</p>
								</div>
							</div>
							<div className="computers-block__item item-computers">
								<div className="item-computers__image">
									<img src={Chair} alt="cpu" />
								</div>
								<div className="item-computers__content">
									<div className="item-computers__title">Кресла</div>
									<p className='item-computers__text'>DXRacer</p>
									<p className='item-computers__text'>COUGAR</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
			<RegistrationPage active={modalRegistration} setActive={setModalRegistration} />
		</>
	)
}

export default MainPage
