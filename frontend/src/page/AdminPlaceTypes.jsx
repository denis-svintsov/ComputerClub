import { useState, useEffect } from 'react'
import '../assets/css/Places.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Logo from '../assets/img/Logo.png'
import AuthService from '../service/AuthService';

function AdminPlaceTypes() {
	const [types, setTypes] = useState('');
	const navigate = useNavigate('');
	useEffect(() => {
		if (!AuthService.getCurrentUser()) navigate("/");
		if (AuthService.getCurrentUser() && AuthService.getCurrentUser().role != "ROLE_ADMIN") {
			navigate("/");
		}
	}, [])

	function deletePlace(id) {
		axios.delete("http://localhost:8080/place-type/delete", { params: { id: id } })
			.then((response) => {
				let array = [...types];
				array = array.filter((item) => {
					return item.id != id;
				});
				setTypes(array);
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
					<h1 className="places-page__title admin-page__title">Типы мест</h1>
					<Link to={"../"}>
						<div className='places-page__button admin-page__button white-button'>Назад</div>
					</Link>
					<Link to={"add"}>
						<div className='places-page__button admin-page__button white-button'>Добавить</div>
					</Link>
					<div className="places-page__body admin-page__body">
						<table className="places-page__table admin-page__table">
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Название</th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody>
								{types && types.map((type, index) => (
									<tr key={type.id}>
										<td>{index + 1}</td>
										<td>{type.name}</td>
										<td>
											<Link className='table__button' to={"update/" + type.id}>Изменить</Link>
											<button className='table__button' onClick={() => { deletePlace(type.id); }}>Удалить</button>
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

export default AdminPlaceTypes
