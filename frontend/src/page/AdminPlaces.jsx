import { useState, useEffect } from 'react'
import '../assets/css/Places.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Logo from '../assets/img/Logo.png'
import AuthService from '../service/AuthService';

function AdminPlaces() {
	const [places, setPlaces] = useState('');
	const [types, setTypes] = useState('');
	const [placeType, setPlaceType] = useState('');
	const navigate = useNavigate('');
	useEffect(() => {
		if (!AuthService.getCurrentUser()) navigate("/");
		if (AuthService.getCurrentUser() && AuthService.getCurrentUser().role != "ROLE_ADMIN") {
			navigate("/");
		}
	}, [])

	function deletePlace(id) {
		axios.delete("http://localhost:8080/place/delete", { params: { id: id } })
			.then((response) => {
				let array = [...places];
				array = array.filter((item) => {
					return item.id != id;
				});
				setPlaces(array);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function getPlaces() {
		axios.get("http://localhost:8080/place/get-by-place-type", { params: { placeType: placeType } })
			.then((response) => {
				setPlaces(response.data);
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
			getPlaces();
		}
	}, [types])

	useEffect(() => {
		getPlaces();
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
					<h1 className="places-page__title admin-page__title">Места</h1>
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
									<th scope='col'>Процессор</th>
									<th scope='col'>Видеокарта</th>
									<th scope='col'>Тип места</th>
									<th scope='col'>RAM</th>
									<th scope='col'>Память</th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody>
								{places && places.map((place, index) => (
									<tr key={place.id}>
										<td>{index + 1}</td>
										<td>{place.processor}</td>
										<td>{place.graphics}</td>
										<td>{place.ram}</td>
										<td>{place.memory}</td>
										<td>
											<Link className='table__button' to={"update/" + place.id}>Изменить</Link>
											<button className='table__button' onClick={() => { deletePlace(place.id); }}>Удалить</button>
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

export default AdminPlaces
