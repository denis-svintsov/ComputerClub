import { useEffect, useState } from 'react'
import '../assets/css/Footer.css'
import { Link } from 'react-router-dom';

function Footer() {

	return (
		<>
			<footer className='footer'>
				<div className="footer__container">
					<Link to={""}>
						<div className="footer__link">Контакты</div>
					</Link>
					<div className="footer__body">
						<div className="footer__tel">Телефон: +7 (905) 999-99-99</div>
						<div className="footer__address">Политехническа, Саратов</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer
