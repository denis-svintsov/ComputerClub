import { useEffect, useState } from 'react'
import axios from 'axios'
import '../assets/css/AdminRegistrations.css'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/img/Logo.png'
import AuthService from '../service/AuthService';

function AdminAdmins() {
	const [accounts, setAccounts] = useState('');
	const navigate = useNavigate('');
	useEffect(() => {
		if (!AuthService.getCurrentUser()) navigate("/");
		if (AuthService.getCurrentUser() && AuthService.getCurrentUser().role != "ROLE_ADMIN") {
			navigate("/");
		}
	}, [])

	function deleteAccount(id) {
		axios.delete("http://localhost:8080/account/delete/" + id)
			.then((response) => {
				let array = [...accounts];
				array = array.filter((item) => {
					return item.id != id;
				});
				setAccounts(array);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function getAccounts() {
		axios.get("http://localhost:8080/account/get-by-role", { params: { role: "ROLE_ADMIN" } })
			.then((response) => {
				setAccounts(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getAccounts();
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
			<main className='registrations-page admin-page'>
				<div className="registrations-page__container admin-page__container">
					<h1 className="registrations-page__title admin-page__title">Аккаунты сотрудников</h1>
					<Link to={"/admin"}>
						<div className='registrations-page__button admin-page__button white-button'>Назад</div>
					</Link>
					<Link to={"add"}>
						<div className='places-page__button admin-page__button white-button'>Добавить</div>
					</Link>
					<div className="registrations-page__body admin-page__body">
						<table className="registrations-page__table admin-page__table">
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Фамилия</th>
									<th scope='col'>Имя</th>
									<th scope='col'>Почта</th>
									<th scope='col'>Телефон</th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody>
								{accounts && accounts.map((account, index) => {
									return (
										<tr key={account.id}>
											<td>{index + 1}</td>
											<td>{account.lastName}</td>
											<td>{account.firstName}</td>
											<td>{account.email}</td>
											<td>{account.username}</td>
											<td>
												<Link className='table__button' to={"update/" + account.username}>Изменить</Link>
												<button className='table__button' onClick={() => { deleteAccount(account.id); }}>Удалить</button>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</>
	)
}

export default AdminAdmins
