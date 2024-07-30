import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Logo from '../assets/img/Logo.png'
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AuthService from '../service/AuthService';
import InputMask from 'react-input-mask';


function UpdateAdmin() {
	const navigate = useNavigate('');
	const { userId } = useParams();
	const [user, setUser] = useState('');
	const [phone, setPhone] = useState('');
	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');

	function getToken() {
		let error = false;
		console.log("email");
		console.log(email);
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
				alert(a.message);
				throw new Error(a.message);
			}
		};

		return getToken();
	}

	async function sendForm() {
		if (lastName && firstName && phone && phone.length == 18) {
			try {
				await getToken();
				navigate("/admin/employees");
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
		axios.get("http://localhost:8080/account/get-by-phone", { params: { phone: userId } })
			.then((response) => {
				const user = response.data;
				setUser(user);
				setFirstName(user.firstName);
				setLastName(user.lastName);
				setPhone(user.username);
				setEmail(user.email);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [])

	useEffect(() => {
		console.log(user);
	}, [user])

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
					<h1 className="places-page__title admin-page__title">Изменение данных сотрудника</h1>
					<Link to={"/admin/employees"}>
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
						<button className='sign__button button' onClick={sendForm}>Изменить</button>
					</div>
				</div>
			</main>
		</>
	)
}

export default UpdateAdmin
