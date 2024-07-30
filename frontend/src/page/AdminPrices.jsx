import { useState, useEffect } from 'react'
import '../assets/css/Places.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Logo from '../assets/img/Logo.png'
import AuthService from '../service/AuthService';

function AdminPrices() {
	const [prices, setPrices] = useState('');
	const [types, setTypes] = useState('');
	const [placeType, setPlaceType] = useState('');
	const navigate = useNavigate('');
	useEffect(() => {
		if (!AuthService.getCurrentUser()) navigate("/");
		if (AuthService.getCurrentUser() && AuthService.getCurrentUser().role != "ROLE_ADMIN") {
			navigate("/");
		}
	}, [])

	function deletePrice(id) {
		axios.delete("http://localhost:8080/price/delete", { params: { id: id } })
			.then((response) => {
				let array = [...prices];
				array = array.filter((item) => {
					return item.id != id;
				});
				setPrices(array);
			})
			.catch((error) => {
				console.log(error);
			});
	}

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
		if (types) {
			setPlaceType(types[0].id);
			getPrices();
		}
	}, [types])

	useEffect(() => {
		getPrices();
	}, [placeType])

	return (
		<>
			<header className='header'>
				<div className="header__container color">
					<Link to={"/"}>
						<img className='header__logo' src={Logo} alt="КК" />
					</Link>
					<Link to={"/"}>
						<div className='header__sign white-button'>Выйти</div>
					</Link>
				</div>
			</header>
			<main className='places-page admin-page'>
				<div className="places-page__container admin-page__container">
					<h1 className="places-page__title admin-page__title">Цены</h1>
					<Link to={"../"}>
						<div className='places-page__button admin-page__button white-button'>Назад</div>
					</Link>
					<Link to={"add"}>
						<div className='places-page__button admin-page__button white-button'>Добавить</div>
					</Link>
					<div className="places-page__body admin-page__body">
						{types && types.map((type) => (
							<button className={type.id == placeType ? 'places-page__tabs admin-page__button active' : 'places-page__tabs admin-page__button'} onClick={() => { setPlaceType(type.id); }}>{type.name}</button>
						))}
						<table className="places-page__table admin-page__table">
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Количество часов</th>
									<th scope='col'>Часы</th>
									<th scope='col'>Цена</th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody>
								{prices && prices.map((price, index) => (
									<tr key={price.id}>
										<td>{index + 1}</td>
										<td>{price.countHours}</td>
										<td>{price.startHour} - {price.endHour}</td>
										<td>{price.price} ₽</td>
										<td>
											<Link className='table__button' to={"update/" + price.id}>Изменить</Link>
											<button className='table__button' onClick={() => { deletePrice(price.id); }}>Удалить</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</>
	)
}

export default AdminPrices
