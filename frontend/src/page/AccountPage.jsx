import { useEffect, useState } from 'react'
import axios from 'axios'
import '../assets/css/Account.css'
import Header from '../component/Header';
import Background from '../assets/img/Background.jpg'
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthService';

function AccountPage() {
	const navigate = useNavigate('');

	useEffect(() => {
		if (!AuthService.getCurrentUser()) {
			navigate('/');
		}
	}, [])

	function logout() {
		AuthService.logout();
		navigate("/");
	}

	return (
		<>
			<Header />
			<main className='account-page main-page'>
				<div className="account-page main-page__header main-header">
					<div className="account-page__body">
						<h1 className='account-page__title'>Личный кабинет</h1>
						<div className="account-page__content">
							<div className="account-page__link">
								<Link to={"info"}>Личная информация</Link>
							</div>
							<div className="account-page__link">
								<Link to={"actives"}>Статус брони</Link>
							</div>
							<div className="account-page__link">
								<Link to={"archive"}>Архив записей</Link>
							</div>
							<button className='button' onClick={() => { logout(); }}>Выйти</button>
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

export default AccountPage
