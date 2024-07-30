import { useEffect, useState } from 'react'
import '../assets/css/Admin.css'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/img/Logo.png'
import AuthService from '../service/AuthService';

function AdminPage() {
	const navigate = useNavigate('');
	useEffect(() => {
		if (!AuthService.getCurrentUser()) navigate("/");
		if (AuthService.getCurrentUser() && AuthService.getCurrentUser().role != "ROLE_ADMIN") {
			navigate("/");
		}
	}, [])

	return (
		<>
			<header className='header'>
				<div className="header__container color">
					<Link to={"/"}>
						<img className='header__logo' src={Logo} alt="КК" />
					</Link>
					<Link to={"/"}>
						<button className='header__sign white-button'>Выйти</button>
					</Link>
				</div>
			</header>
			<main className='admin-page'>
				<div className="admin-page__container">
					<h1 className="admin-page__title">Админ панель</h1>
					<div className="admin-page__body">
						<div className="admin-page__link">
							<Link to={"free-place"}>
								Свободные места
							</Link>
						</div>
						<div className="admin-page__link">
							<Link to={"registrations"}>
								Записи
							</Link>
						</div>
						<div className="admin-page__sublink">
							<Link to={"registration-queue"}>
								Записи на подтверждение
							</Link>
						</div>
						<div className="admin-page__sublink">
							<Link to={"registrations-by-phone"}>
								Записи по телефону
							</Link>
						</div>
						<div className="admin-page__link">
							<Link to={"places"}>
								Места
							</Link>
						</div>
						<div className="admin-page__sublink">
							<Link to={"place-types"}>
								Типы мест
							</Link>
						</div>
						<div className="admin-page__sublink">
							<Link to={"prices"}>
								Цены
							</Link>
						</div>
						<div className="admin-page__link">
							<Link to={"users"}>
								Аккаунты посетителей
							</Link>
						</div>
						<div className="admin-page__link">
							<Link to={"employees"}>
								Аккаунты сотрудников
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default AdminPage
