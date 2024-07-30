import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Logo from '../assets/img/Logo.png'
import InputMask from 'react-input-mask';
import { jwtDecode } from 'jwt-decode'

function AddAdmin() {
	const navigate = useNavigate('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');

	function getToken() {
		let error = false;
		const auth = fetch('http://localhost:8080/auth/sign-up-admin', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				"firstName": firstName,
				"lastName": lastName,
				"phone": phone,
				"email": email ? email : null,
				"password": password
			})
		})
			.then((response) => {
				const token = response.json();
				if (response.status == 400) {
					error = true;
				}
				return token;
			})
			.catch((err) => {
				console.log(err.message);
			});



		const getToken = async () => {
			const a = await auth;
			if (error) {
				alert(a.message);
				throw new Error(a.message);
			}
		};

		return getToken();
	}

	async function sendForm() {
		if (lastName && firstName && password && phone && phone.length == 18) {
			try {
				await getToken();
				alert("Сотрудник успешно добавлен")
				navigate("/admin");
			} catch (error) {
				console.error('Login failed', error);
			}
		}
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
			<main className='places-page admin-page'>
				<div className="places-page__container admin-page__container">
					<h1 className="places-page__title admin-page__title">Добавление сотрудника</h1>
					<Link to={"/admin"}>
						<div className='places-page__button admin-page__button white-button'>Назад</div>
					</Link>
					<div className="places-page__body admin-page__body">
						<div className="form-control">
							<label className='form__label' htmlFor='sign-up-lastname'>Фамилия</label>
							<input className='registration__input form__input' type="text" id='sign-up-lastname' value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
						</div>
						<div className="form-control">
							<label className='form__label' htmlFor='sign-up-name'>Имя</label>
							<input className='registration__input form__input' type="text" id='sign-up-name' value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
						</div>
						<div className="form-control">
							<label className='form__label' htmlFor='sign-up-phone'>Телефон</label>
							<InputMask
								className='registration__input'
								id='sign-up-phone'
								type='tel'
								mask="+9 (999) 999-99-99"
								maskChar={null}
								value={phone}
								onChange={(e) => { setPhone(e.target.value) }}
							>
							</InputMask>
						</div>
						<div className="form-control">
							<label className='form__label' htmlFor='sign-up-email'>Почта</label>
							<input className='registration__input form__input' type="text" id='sign-up-email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
						</div>
						<div className="form-control">
							<label className='form__label' htmlFor='sign-up-password'>Пароль</label>
							<input className='registration__input form__input' type="text" id='sign-up-password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
						</div>
						<button className='sign__button button' onClick={sendForm}>Зарегестрироваться</button>
					</div>
				</div>
			</main>
		</>
	)
}

export default AddAdmin
