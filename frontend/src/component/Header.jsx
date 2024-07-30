import { useContext, useEffect, useState } from 'react'
import '../assets/css/Header.css'
import Logo from '../assets/img/Logo.png'
import { Link } from 'react-router-dom';
import AuthService from '../service/AuthService';

function Header({ active, setActive }) {
	const [color, setColor] = useState(false);
	const [user, setUser] = useState('');

	const changeNavbarColor = () => {
		if (window.scrollY > 100) {
			setColor(true)
		}
		else {
			setColor(false)
		}
	};

	window.addEventListener("scroll", changeNavbarColor);

	useEffect(() => {
		setUser(AuthService.getCurrentUser());
	}, [])

	return (
		<>
			<header className='header'>
				<div className={color ? "header__container color" : "header__container"}>
					<Link className='header__logo' to={"/"}>
						<img src={Logo} alt="КК" />
					</Link>
					{setActive && <button className='header__button' onClick={() => { setActive(true); }}>Забронировать</button>}
					{user ?
						<Link to={"/account"} className='header__sign white-button'>Личный кабинет</Link>
						:
						<Link to={"/sign-in"} className='header__sign white-button'>Войти</Link>
					}
				</div>
			</header>
		</>
	)
}

export default Header
