import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask';

function RegistrationByPhone({ setError, setSuccessByPhone, setIsLoading }) {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');

	function sendForm() {
		if (name && phone && phone.length == 18) {
			setIsLoading(true);
			fetch('http://localhost:8080/registration-by-phone/add', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: JSON.stringify({
					"name": name,
					"phone": phone
				})
			})
				.then((response) => {
					if (response.status == 400) {
						setError(true);
						setIsLoading(false);
					}
					else {
						const data = response.json();
						setSuccessByPhone(true);
						setIsLoading(false);
					}
				})
				.catch((err) => {
					console.log(err.message);
					setError(true);
					setIsLoading(false);
				});
		}
	}

	return (
		<>
			<h2 className='registration__title'>Бронирование места</h2>
			<p className='registration__subtitle'>Заполните форму и наш менеджер перезвонит вам, чтобы подтвердить бронь</p>
			<div className='registration__form'>
				<label className='registration__label' htmlFor="registration-name">Ваше имя</label>
				<input className='registration__input' value={name} id='registration-name' onChange={(e) => { setName(e.target.value) }} />
			</div>
			<div className='registration__form'>
				<label className='registration__label' htmlFor="registration-phone">Ваш телефон</label>
				<InputMask
					className='registration__input'
					id='registration-phone'
					type='tel'
					mask="+9 (999) 999-99-99"
					maskChar={null}
					value={phone}
					onChange={(e) => { setPhone(e.target.value) }}
				>
				</InputMask>
			</div>
			<div className="registration__button">
				<button className='button' onClick={sendForm}>Забронировать</button>
			</div>
		</>
	)
}

export default RegistrationByPhone
