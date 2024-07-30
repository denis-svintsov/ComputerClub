import { useState, useEffect } from 'react'
import '../assets/css/AdminRegistrationsByPhone.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Logo from '../assets/img/Logo.png'
import AuthService from '../service/AuthService';

function AdminRegistrationsByPhone() {
	const [registrations, setRegistrations] = useState('');
	const navigate = useNavigate('');
	useEffect(() => {
		if (!AuthService.getCurrentUser()) navigate("/");
		if (AuthService.getCurrentUser() && AuthService.getCurrentUser().role != "ROLE_ADMIN") {
			navigate("/");
		}
	}, [])

	function deleteRegistration(id) {
		axios.delete("http://localhost:8080/registration-by-phone/delete", { params: { id: id } })
			.then((response) => {
				let array = [...registrations];
				array = array.filter((item) => {
					return item.id != id;
				});
				setRegistrations(array);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function getRegistrations() {
		axios.get("http://localhost:8080/registration-by-phone/get")
			.then((response) => {
				setRegistrations(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getRegistrations();
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
			<main className='registrations-by-phone-page admin-page'>
				<div className="registrations-by-phone-page__container admin-page__container">
					<h1 className="registrations-by-phone-page__title admin-page__title">Записи по телефону</h1>
					<Link to={"/admin"}>
						<div className='registrations-by-phone-page__button admin-page__button white-button'>Назад</div>
					</Link>
					<div className="registrations-by-phone-page__body admin-page__body">
						<table className="registrations-by-phone-page__table admin-page__table">
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Дата</th>
									<th scope='col'>Время</th>
									<th scope='col'>Имя</th>
									<th scope='col'>Телефон</th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody>
								{registrations && registrations.map((registration, index) => (
									<tr key={registration.id}>
										<td>{index + 1}</td>
										<td>{registration.date}</td>
										<td>{registration.time}</td>
										<td>{registration.name}</td>
										<td>{registration.phone}</td>
										<td>
											<Link className='table__button' to={"/admin/free-place/" + registration.id}>Сделать запись</Link>
											<button className='table__button' onClick={() => { deleteRegistration(registration.id); }}>Отменить</button>
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

export default AdminRegistrationsByPhone
