import { useEffect, useState } from 'react'
import '../assets/css/Sign.css'
import Header from '../component/Header';
import Background from '../assets/img/Background.jpg'
import InputMask from 'react-input-mask';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

function SignUpPage() {
	const navigate = useNavigate('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	function getToken() {
		let error = false;
		const auth = fetch('http://localhost:8080/auth/sign-up', {
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
				if (response.status == 400) {
					error = true;
				}
				const token = response.json();
				return token;
			})
			.catch((err) => {
				console.log(err.message);
			});



		const getToken = async () => {
			const a = await auth;
			if (error) {
				setMessage(a.message);
				throw new Error(a.message);
			} else {
				localStorage.setItem('token', a.token);
			}
		};

		return getToken();
	}

	async function sendForm() {
		if (lastName && firstName && password && phone && phone.length == 18) {
			try {
				await getToken();
				navigate("/");
			} catch (error) {
				console.error('Login failed', error);
			}
		}
	}

	return (
		<>
			<Header />
			<main className='sign-page main-page'>
				<div className="sign-page__header main-page__header main-header">
					<div className="sign-page__body main-header__body">
						<h1 className="sign-page__title">Регистрация</h1>
						<div className="form-control">
							<label className='form__label' htmlFor='sign-up-lastname'>Фамилия *</label>
							<input className='registration__input form__input' type="text" id='sign-up-lastname' value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
						</div>
						<div className="form-control">
							<label className='form__label' htmlFor='sign-up-name'>Имя *</label>
							<input className='registration__input form__input' type="text" id='sign-up-name' value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
						</div>
						<div className="form-control">
							<label className='form__label' htmlFor='sign-up-phone'>Телефон *</label>
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
							<label className='form__label' htmlFor='sign-up-password'>Пароль *</label>
							<input className='registration__input form__input' type="text" id='sign-up-password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
						</div>
						{message && (
							<div style={{ marginBottom: "15px" }}>{message}</div>
						)}
						<button className='sign__button button' onClick={sendForm}>Зарегестрироваться</button>
					</div>
					<div className="sign-page main-header__background">
						<img src={Background} />
					</div>
				</div>
			</main >
		</>
	)
}

export default SignUpPage
