import { useEffect, useState } from 'react'
import '../assets/css/Sign.css'
import Header from '../component/Header';
import Background from '../assets/img/Background.jpg'
import InputMask from 'react-input-mask';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import AuthService from '../service/AuthService';

function SignInPage() {
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate('');

	async function sendForm() {
		try {
			await AuthService.login(phone, password);
			if (AuthService.getCurrentUser().role == "ROLE_ADMIN") {
				navigate("/admin");
			}
			else {
				navigate("/");
			}
		} catch (error) {
			alert("Неправильный логин или пароль");
			console.error('Login failed', error);
		}
	}

	return (
		<>
			<Header />
			<main className='sign-page main-page'>
				<div className="sign-page__header main-page__header main-header">
					<div className="sign-page__body main-header__body">
						<h1 className="sign-page__title">Вход в личный кабинет</h1>
						<div className="form-control">
							<label className='form__label' htmlFor='sign-in-phone'>Телефон</label>
							<InputMask
								className='registration__input'
								id='sign-in-phone'
								type='tel'
								mask="+9 (999) 999-99-99"
								maskChar={null}
								value={phone}
								onChange={(e) => { setPhone(e.target.value) }}
							>
							</InputMask>
						</div>
						<div className="form-control">
							<label className='form__label' htmlFor='sign-in-password'>Пароль</label>
							<input className='registration__input form__input' type="password" id='sign-in-password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
						</div>
						<Link to={"/sign-up"}>
							<div className='sign__link'>Регистрация</div>
						</Link>
						<button className='sign__button button' onClick={sendForm}>Войти</button>
					</div>
					<div className="sign-page main-header__background">
						<img src={Background} />
					</div>
				</div>
			</main >
		</>
	)
}

export default SignInPage
