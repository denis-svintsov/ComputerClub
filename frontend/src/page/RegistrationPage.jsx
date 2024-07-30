import { useEffect, useState } from 'react'
import '../assets/css/Registration.css'
import '../assets/css/Loader.css'
import Close from '../assets/img/close.png';
import RegistrationByAccount from '../component/RegistrationByAccount';
import RegistrationByPhone from '../component/RegistrationByPhone';
import AuthService from '../service/AuthService';

function RegistrationPage({ active, setActive }) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [successByPhone, setSuccessByPhone] = useState(false);
	const [content, setContent] = useState(true);
	const [byAccount, setByAccount] = useState(false);
	const [byPhone, setByPhone] = useState(false);

	useEffect(() => {
		const body = document.getElementsByTagName("body")[0];
		if (active == true) {
			body.classList.add("lock");
		}
		else {
			body.classList.remove("lock");
			setIsLoading(false);
			setError(false);
			setContent(true);
			setByAccount(false);
			setByPhone(false);
			setSuccess(false);
			setSuccessByPhone(false);
		}
	}, [active])

	return (
		<>
			<div className={active ? "registration-modal active" : "registration-modal"} onClick={() => { setActive(false); }}>
				<div className="registration-modal__content" onClick={(e) => { e.stopPropagation(); }}>
					{isLoading && <div className="registration-modal__loading modal-alert">
						<div className="loader"></div>
					</div>}
					{error && <div className="registration-modal__error modal-alert">
						<p>Упс... Что-то пошло не так</p>
						<p>Вернитесь позже</p>
					</div>}
					{success && <div className="registration-modal__error modal-alert">
						<p>Ваша бронь отправлена на модерацию</p>
						<p>Подверждение может занять несколько минут</p>
					</div>}
					{successByPhone && <div className="registration-modal__error modal-alert">
						<p>Ваша заявка принята</p>
						<p>Ваме перезвонит наш оператор через несколько минут</p>
					</div>}
					<div className="registration-close" onClick={() => { setActive(false); }}>
						<img src={Close} alt="Закрыть" />
					</div>
					{content && (
						<>
							<div className='registration__title'>Бронирование места</div>
							<div className='registration__subtitle'>
								Если вы забронируете место через личный кабинет, то сможете участвовать в программе лояльности и получать дополнительные скидки
							</div>
							{!AuthService.getCurrentUser() && (
								<div className="registration__button">
									<button className='button' onClick={() => { setContent(false); setByPhone(true); }}>Забронировать по номеру телефона</button>
								</div>
							)}
							<div className="registration__button">
								<button className='button' onClick={() => { setContent(false); setByAccount(true); }}>Забронировать через личный кабинет</button>
							</div>
						</>
					)}
					{byAccount && <RegistrationByAccount setIsLoading={setIsLoading} setError={setError} setSuccess={setSuccess} byAccount={byAccount} />}
					{byPhone && <RegistrationByPhone setError={setError} setSuccessByPhone={setSuccessByPhone} setIsLoading={setIsLoading} />}
				</div>
			</div >
		</>
	)
}

export default RegistrationPage
