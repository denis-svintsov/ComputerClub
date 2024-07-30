
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useDebounce from '../hook/Debounce'
import AuthService from '../service/AuthService';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	'.MuiInputBase-input': {
		top: "0",
		color: "#000",
		border: '2px solid #A6002C',
		padding: '10px 26px 10px 12px',
		borderRadius: "5px"
	},
}));

function RegistrationByAccount({ setIsLoading, setError, setSuccess, byAccount }) {
	const navigate = useNavigate('');
	const [user, setUser] = useState('');
	const [type, setType] = useState(1);
	const [types, setTypes] = useState('');
	const [countPlace, setCountPlace] = useState(1);
	const [freePlaces, setFreePlaces] = useState('');
	const [dates, setDates] = useState('');
	const [places, setPlaces] = useState([]);
	const [maxCount, setMaxCount] = useState(1);
	const [selects, setSelects] = useState([]);
	const [amountLoading, setAmountLoading] = useState(true);
	const [amount, setAmount] = useState(0);
	const debouncedPlaces = useDebounce(places, 500);

	useEffect(() => {
		const user = AuthService.getCurrentUser();
		if (user) {
			setUser(user);
		}
		else {
			navigate("/sign-in");
		}
	}, [])

	useEffect(() => {
		setAmountLoading(true);
		const price = fetch('http://localhost:8080/price/get-price', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				"placeType": type,
				"countPlaces": countPlace,
				"places": places
			})
		})
			.then((response) => {
				const data = response.json();
				setAmountLoading(false);
				return data;
			})
			.catch((error) => {
				console.log(error);
				setAmountLoading(false);;
			});

		const getPrice = async () => {
			const a = await price;
			setAmount(a);
		};

		getPrice();
	},
		[debouncedPlaces, type, countPlace]
	);

	function handleChange(value) {
		if (places.includes(value)) {
			const index = places.indexOf(value);
			if (index > -1) {
				let new_array = [...places];
				new_array.splice(index, 1);
				setPlaces(new_array);
			}
		}
		else {
			let new_array = [...places];
			new_array.push(value);
			setPlaces(new_array);
		}
	}

	function getFreePlaces() {
		setIsLoading(true);
		setError(false);
		return axios.get("http://localhost:8080/place/free-place", { params: { placeType: type } })
			.then((response) => {
				const data = response.data["freePlaces"];
				setFreePlaces(data);
				let array_days = Object.keys(data);
				let new_array = [];
				array_days.map((item) => {
					let date = new Date(item);
					new_array.push(date);
				})
				new_array = new_array.sort(function (a, b) {
					return a - b;
				});
				new_array = new_array.map((item) => {
					let new_date = item.toLocaleDateString();
					new_date = new_date.split(".")[2] + '-' + new_date.split(".")[1] + '-' + new_date.split(".")[0]
					return new_date;
				})
				setDates(new_array);
				setMaxCount(1);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
				setError(true);
			});
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
	}, [])

	useEffect(() => {
		setCountPlace(1);
		getFreePlaces();
	}, [type, byAccount])
	function formatDate(date) {
		let array = date.split("-");
		return array[2] + "." + array[1];
	}

	function sendForm() {
		if (places.length > 0 && type && countPlace && !amountLoading) {
			setIsLoading(true);
			fetch('http://localhost:8080/queue-registration/add', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: JSON.stringify({
					"userId": user.id,
					"placeType": type,
					"countPlaces": countPlace,
					"places": places
				})
			})
				.then((response) => response.json())
				.then((data) => {
					setSuccess(true);
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err.message);
					setError(true);
					setIsLoading(false);
				});
		}

	}

	function getTimes() {
		let times = []
		for (let i = 0; i < 24; i++) {
			times.push(i);
		}
		return times;
	}

	useEffect(() => {
		let new_array = [];
		for (let i = 1; i <= maxCount; i++) {
			new_array.push(i);
		}
		setSelects(new_array);
	}, [maxCount])

	function pad(d) {
		return (d < 10) ? '0' + d.toString() : d.toString();
	}

	return (
		<>
			<h2 className='registration__title'>Бронирование места</h2>
			<p className='registration__subtitle'>Заполните форму</p>
			<div className="registration-selects">
				<div className="registration-selects__select">
					<div className="registration-selects__label">Тип места</div>
					<FormControl size="small">
						<Select
							value={type}
							onChange={(e) => { setType(e.target.value); }}
							input={<BootstrapInput />}
						>
							{types && types.map((type) => (
								<MenuItem value={type.id}>{type.name}</MenuItem>
							))}
							{!types && (<MenuItem value={1}></MenuItem>)}
						</Select>
					</FormControl>
				</div>
				<div className="registration-selects__select">
					<div className="registration-selects__label">Количество мест</div>
					<FormControl size="small">
						<Select
							className='place-count-select-label'
							value={countPlace}
							width="150px"
							onChange={(e) => { setCountPlace(e.target.value); }}
							input={<BootstrapInput />}
						>
							{selects.map((item) => (
								<MenuItem value={item} key={item}>{item}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</div>
			<div className="registration-dates">
				<div className="registration-dates__times">
					{getTimes().map((time) => (
						<div key={time} className='registration-time'>{pad(time)}:00→{pad(time + 1)}:00</div>
					))}
				</div>
				<div className="registration-dates__dates">
					{dates && dates.map((date, index) => (
						<div key={index} className='registration-date__row'>
							<span className='registration-date__date'>{formatDate(date)}</span>
							{freePlaces[date].map((count, index) => {
								if (count > maxCount) {
									setMaxCount(count);
								}
								if (count == -1) {
									return (
										<div className='custom-checkbox-wrapper' key={index}>
											<input type="checkbox" className="custom-checkbox disabled-range" id={date + "-" + index} name={date + "-" + index} value={date + "-" + index} checked={false} onChange={(e) => { handleChange(e.target.value) }} disabled />
											<label htmlFor={date + "-" + index}  ><div className='custom-checkbox__label'></div></label>
										</div>
									)
								}
								else if (count == 0) {
									if (places.includes(date + "-" + index)) {
										handleChange(date + "-" + index)
									}
									return (
										<div className='custom-checkbox-wrapper' key={index}>
											<input type="checkbox" className="custom-checkbox disabled" id={date + "-" + index} name={date + "-" + index} value={date + "-" + index} checked={false} onChange={(e) => { handleChange(e.target.value) }} disabled />
											<label htmlFor={date + "-" + index}  ><div className='custom-checkbox__label'></div></label>
										</div>
									)
								}
								else if (countPlace > count) {
									if (places.includes(date + "-" + index)) {
										handleChange(date + "-" + index)
									}
									return (
										<div className='custom-checkbox-wrapper' key={index}>
											<input type="checkbox" className="custom-checkbox disabled-range" id={date + "-" + index} name={date + "-" + index} value={date + "-" + index} checked={false} onChange={(e) => { handleChange(e.target.value) }} disabled />
											<label htmlFor={date + "-" + index}  ><div className='custom-checkbox__label'>{count}</div></label>
										</div>
									)
								}
								else {
									return (
										<div className='custom-checkbox-wrapper' key={index}>
											<input type="checkbox" className="custom-checkbox" id={date + "-" + index} name={date + "-" + index} value={date + "-" + index} onChange={(e) => { handleChange(e.target.value) }} />
											<label htmlFor={date + "-" + index}  ><div className='custom-checkbox__label'>{count}</div></label>
										</div>
									)
								}
							})}
						</div>
					))}
				</div>
			</div>
			<div className="registration__amount">
				Сумма: {amountLoading ? <span className="loader__amount"></span> : amount + ' ₽'}
			</div>
			<div className="registration__button">
				<button className='button' onClick={sendForm}>Забронировать</button>
			</div>
		</>
	)
}

export default RegistrationByAccount
