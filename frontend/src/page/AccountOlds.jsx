import axios from 'axios'
import '../assets/css/Account.css'
import Header from '../component/Header';
import Background from '../assets/img/Background.jpg'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthService from '../service/AuthService';

function AccountOlds() {
	const [isLoading, setIsLoading] = useState(false);
	const [registrations, setRegistrations] = useState('');

	useEffect(() => {
		if (!AuthService.getCurrentUser()) {
			navigate('/');
		}
	}, [])

	useEffect(() => {
		setIsLoading(true);
		axios.get("http://localhost:8080/registration/get-olds", { params: { id: AuthService.getCurrentUser().id } })
			.then((response) => {
				const data = response.data;
				setRegistrations(data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
			});
	}, [])

	function formatTime(nums) {
		nums = nums.map((d) => {
			return (d < 10) ? '0' + d.toString() + ':00' : d.toString() + ':00';
		})
		let res = nums.join(", ");
		return res
	}

	return (
		<>
			<Header />
			<main className='account-page main-page'>
				<div className="account-page main-page__header main-header">
					<div className="account-page__body">
						<h1 className='account-page__title'>Архив записей</h1>
						<Link to={"../"}>
							<div className='account-page__button admin-page__button white-button'>Назад</div>
						</Link>
						<div className="account-page__content">
							<table className="registrations-page__table admin-page__table">
								<thead>
									<tr>
										<th scope='col'>#</th>
										<th scope='col'>Дата</th>
										<th scope='col'>Время</th>
										<th scope='col'>Тип места</th>
										<th scope='col'>Количество мест</th>
										<th scope='col'>Сумма</th>
										<th scope='col'>Статус</th>
									</tr>
								</thead>
								<tbody>
									{registrations && registrations.map((registration, index) => {
										let status = '';
										if (registration.status === "WAITING") {
											status = "В ожидании";
										}
										if (registration.status === "CONFIRMED") {
											status = "Принято";
										}
										if (registration.status === "CANCELED") {
											status = "Отменено";
										}
										return (
											<tr key={registration.id}>
												<td>{index + 1}</td>
												<td>{registration.date}</td>
												<td style={{ maxWidth: "100px" }}>{formatTime(registration.time)}</td>
												<td>{registration.place[0].placeType.name}</td>
												<td>{registration.place.length}</td>
												<td>{registration.amount}</td>
												<td>{status}</td>
											</tr>
										)
									})}
								</tbody>
							</table>
							{registrations.length == 0 && (
								<div style={{ fontSize: "28px" }}>Нет записей</div>
							)}
							{isLoading && (
								<div className="registration-modal__loading modal-alert">
									<div className="loader"></div>
								</div>
							)}
						</div>
					</div>
					<div className="main-header__background">
						<img src={Background} />
					</div>
				</div>
			</main>
		</>
	)
}

export default AccountOlds
