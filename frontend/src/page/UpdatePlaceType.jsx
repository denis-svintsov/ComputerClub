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

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	'.MuiInputBase-input': {
		top: "0",
		color: "#000",
		backgroundColor: "#fff",
		border: '2px solid #A6002C',
		padding: '10px 26px 10px 12px',
		borderRadius: "5px"
	},
}));

function UpdatePlaceType() {
	const { placeTypeId } = useParams();
	const navigate = useNavigate('');
	const [id, setId] = useState('');
	const [name, setName] = useState('');
	useEffect(() => {
		if (!AuthService.getCurrentUser()) navigate("/");
		if (AuthService.getCurrentUser() && AuthService.getCurrentUser().role != "ROLE_ADMIN") {
			navigate("/");
		}
	}, [])

	function addPlace() {
		if (name) {
			fetch('http://localhost:8080/place-type/add', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: JSON.stringify({
					"id": id,
					"name": name
				})
			})
				.then((response) => response.json())
				.then((data) => {
					navigate("/admin/place-types");
					alert("Успешно изменено")
				})
				.catch((err) => {
					console.log(err.message);
					alert("Ошибка изменения");
				});
		}
	}

	useEffect(() => {
		axios.get("http://localhost:8080/place-type/get-by-id/" + placeTypeId)
			.then((response) => {
				const place = response.data;
				setId(place.id);
				setName(place.name);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [])

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
					<h1 className="places-page__title admin-page__title">Изменение типа места</h1>
					<Link to={"/admin"}>
						<div className='places-page__button admin-page__button white-button'>Назад</div>
					</Link>
					<div className="places-page__body admin-page__body">
						<div className="form-control">
							<label className='form__label' htmlFor='place-type'>Тип места</label>
							<input className='form__input' type="text" id='place-type' value={name} onChange={(e) => { setName(e.target.value) }} />
						</div>
						<button className='places-page__button admin-page__button white-button' onClick={() => { addPlace() }}>Изменить</button>
					</div>
				</div>
			</main>
		</>
	)
}

export default UpdatePlaceType
