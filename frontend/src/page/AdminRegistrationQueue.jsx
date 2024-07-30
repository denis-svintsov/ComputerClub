import { useState, useEffect } from 'react'
import '../assets/css/AdminRegistrationsByPhone.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Logo from '../assets/img/Logo.png'
import AuthService from '../service/AuthService';

function AdminRegistrationQueue() {
	const [registrations, setRegistrations] = useState('');
	const navigate = useNavigate('');
	useEffect(() => {
		if (!AuthService.getCurrentUser()) navigate("/");
		if (AuthService.getCurrentUser() && AuthService.getCurrentUser().role != "ROLE_ADMIN") {
			navigate("/");
		}
	}, [])

	function addRegistration(registration) {
		fetch('http://localhost:8080/registration/add', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				"id": registration.id,
				"user": { "id": registration.user.id },
				"name": registration.name,
				"phone": registration.phone,
				"date": registration.date,
				"time": registration.time,
				"place": registration.place,
				"status": registration.status,
				"amount": registration.amount
			})
		})
			.then((response) => response.json())
			.then((data) => {
				let array = [...registrations];
				array = array.filter((item) => {
					return item.id != registration.id;
				});
				setRegistrations(array);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}

	function deleteRegistration(id) {
		axios.delete("http://localhost:8080/registration/cancel", { params: { id: id } })
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
		axios.get("http://localhost:8080/queue-registration/get")
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

	function formatTime(nums) {
		nums = nums.map((d) => {
			return (d < 10) ? '0' + d.toString() + ':00' : d.toString() + ':00';
		})
		let res = nums.join(", ");
		return res
	}

	function formatPlace(places) {
		let array = [];
		places.forEach((place) => {
			array.push(place.id);
		})
		return array.join(", ");
	}

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
			<main className='registration-queue-page admin-page'>
				<div className="registration-queue-page__container admin-page__container">
					<h1 className="registration-queue-page__title admin-page__title">Записи на подтверждение</h1>
					<Link to={"/admin"}>
						<div className='registration-queue-page__button admin-page__button white-button'>Назад</div>
					</Link>
					<div className="registration-queue-page__body admin-page__body">
						<table className="registration-queue-page__table admin-page__table">
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Дата</th>
									<th scope='col'>Время</th>
									<th scope='col'>Тип места</th>
									<th scope='col'>Места</th>
									<th scope='col'>Фамилия</th>
									<th scope='col'>Имя</th>
									<th scope='col'>Телефон</th>
									<th scope='col'>Почта</th>
									<th scope='col'>Сумма</th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody>
								{registrations && registrations.map((registration, index) => (
									<tr key={registration.id}>
										<td>{index + 1}</td>
										<td>{registration.date}</td>
										<td style={{ maxWidth: "100px" }}>{formatTime(registration.time)}</td>
										<td>{registration.place[0].placeType.name}</td>
										<td>{formatPlace(registration.place)}</td>
										<td>{registration.user ? registration.user.lastName : {}}</td>
										<td>{registration.user ? registration.user.firstName : registration.name}</td>
										<td>{registration.user ? registration.user.username : registration.phone}</td>
										<td>{registration.user ? registration.user.email : {}}</td>
										<td>{registration.amount}</td>
										<td>
											<button className='table__button' onClick={() => { addRegistration(registration) }}>Подтвердить</button>
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

export default AdminRegistrationQueue
