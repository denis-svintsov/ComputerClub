import axios from 'axios'
import '../assets/css/Account.css'
import Header from '../component/Header';
import Background from '../assets/img/Background.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthService from '../service/AuthService';
import InputMask from 'react-input-mask';

function AccountEdit() {
	const navigate = useNavigate('');
	const [user, setUser] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [phone, setPhone] = useState('');
	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	function getToken() {
		let error = false;
		const auth = fetch('http://localhost:8080/auth/edit-user', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				"id": user.id,
				"firstName": firstName ? firstName : null,
				"lastName": lastName ? lastName : null,
				"phone": phone ? phone : null,
				"email": email ? email : null,
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
				axios.defaults.headers.common['Authorization'] = `Bearer ${a.token}`;
			}
		};

		return getToken();
	}

	async function sendForm() {
		if (lastName && firstName && phone && phone.length == 18) {
			try {
				await getToken();
				navigate("/account/info");
			} catch (error) {
				console.error('Login failed', error);
			}
		}
	}

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
				setFirstName(user.firstName);
				setLastName(user.lastName);
				setPhone(user.username);
				setEmail(user.email);
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
						<h1 className='account-page__title'>Редактирование информации</h1>
						<Link to={"../info"}>
							<div className='account-page__button admin-page__button white-button'>Назад</div>
						</Link>
						<div className="account-page__content">
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
							{message && (
								<div style={{ marginBottom: "15px" }}>{message}</div>
							)}
							<button className='sign__button button' onClick={sendForm}>Изменить</button>
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

export default AccountEdit
