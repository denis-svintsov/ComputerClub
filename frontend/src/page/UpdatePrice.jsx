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

function UpdatePrice() {
	const { priceId } = useParams();
	const navigate = useNavigate('');
	const [id, setId] = useState('');
	const [types, setTypes] = useState('');
	const [placeType, setPlaceType] = useState('');
	const [countHours, setCountHours] = useState('');
	const [startHour, setStartHour] = useState('');
	const [endHour, setEndHour] = useState('');
	const [price, setPrice] = useState('');
	useEffect(() => {
		if (!AuthService.getCurrentUser()) navigate("/");
		if (AuthService.getCurrentUser() && AuthService.getCurrentUser().role != "ROLE_ADMIN") {
			navigate("/");
		}
	}, [])

	function getPrice() {
		axios.get("http://localhost:8080/price/get-by-id/" + priceId)
			.then((response) => {
				const price = response.data;
				setId(price.id);
				setPlaceType(price.placeType.id);
				setCountHours(price.countHours);
				setStartHour(price.startHour);
				setEndHour(price.endHour);
				setPrice(price.price);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function addPrice() {
		if (placeType && countHours && endHour && price) {
			fetch('http://localhost:8080/price/add', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: JSON.stringify({
					"id": id,
					"placeType": {
						"id": placeType
					},
					"countHours": countHours,
					"startHour": startHour,
					"endHour": endHour,
					"price": price
				})
			})
				.then((response) => response.json())
				.then((data) => {
					navigate("/admin/prices");
					alert("Успешно изменено")
				})
				.catch((err) => {
					console.log(err.message);
					alert("Ошибка изменения");
				});
		}
	}

	function getTypes() {
		axios.get("http://localhost:8080/place-type/get")
			.then((response) => {
				setTypes(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getTypes();
		getPrice();
	}, [])

	useEffect(() => {
		if (types) {
			setPlaceType(types[0].id);
		}
	}, [types])

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
					<h1 className="places-page__title admin-page__title">Изменение цены</h1>
					<Link to={"/admin"}>
						<div className='places-page__button admin-page__button white-button'>Назад</div>
					</Link>
					<div className="places-page__body admin-page__body">
						<div className="form-control">
							<div className="form__label">Тип места</div>
							<FormControl size="small">
								<Select
									value={placeType}
									onChange={(e) => { setPlaceType(e.target.value); }}
									input={<BootstrapInput />}
								>
									{types && types.map((type) => (
										<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
						<div className="form-control">
							<label className='form__label' htmlFor='computer-processor'>Количество часов</label>
							<input className='form__input' type="text" id='price-count' value={countHours} onChange={(e) => { setCountHours(e.target.value) }} />
						</div>
						<div className="form-control">
							<label className='form__label' htmlFor='computer-graphics'>Часы от</label>
							<input className='form__input' type="text" id='price-start' value={startHour} onChange={(e) => { setStartHour(e.target.value) }} />
						</div>
						<div className="form-control">
							<label className='form__label' htmlFor='computer-ram'>Часы до</label>
							<input className='form__input' type="text" id='price-end' value={endHour} onChange={(e) => { setEndHour(e.target.value) }} />
						</div>
						<div className="form-control">
							<label className='form__label' htmlFor='computer-memory'>Цена</label>
							<input className='form__input' type="text" id='computer-memory' value={price} onChange={(e) => { setPrice(e.target.value) }} />
						</div>
						<button className='places-page__button admin-page__button white-button' onClick={() => { addPrice() }}>Изменить</button>
					</div>
				</div>
			</main>
		</>
	)
}

export default UpdatePrice
