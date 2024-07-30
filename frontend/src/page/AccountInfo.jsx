import axios from 'axios'
import '../assets/css/Account.css'
import Header from '../component/Header';
import Background from '../assets/img/Background.jpg'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthService from '../service/AuthService';

function AccountInfo() {
	const [user, setUser] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!AuthService.getCurrentUser()) {
			navigate('/');
		}
	}, [])

	useEffect(() => {
		setIsLoading(true);
		axios.get("http://localhost:8080/account/get-by-phone", { params: { phone: AuthService.getCurrentUser().username } })
			.then((response) => {
				const user = response.data;
				setUser(user);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
			});
	}, [])

	return (
		<>
			<Header />
			<main className='account-page main-page'>
				<div className="account-page main-page__header main-header">
					<div className="account-page__body">
						<h1 className='account-page__title'>Личная информация</h1>
						<Link to={"../"}>
							<div className='account-page__button admin-page__button white-button'>Назад</div>
						</Link>
						<div className="account-page__content">
							<div className="account-page__link">
								Фамилия: {user.lastName}
							</div>
							<div className="account-page__link">
								Имя: {user.firstName}
							</div>
							<div className="account-page__link">
								Почта: {user.email}
							</div>
							<div className="account-page__link">
								Телефон: {user.username}
							</div>
							<Link to={"edit"} className='button'>Редактировать</Link>
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

export default AccountInfo
