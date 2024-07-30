import { jwtDecode } from 'jwt-decode';
import axios from 'axios'

class AuthService {
	login(phone, password) {
		const auth = fetch('http://localhost:8080/auth/sign-in', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify({
				"phone": phone,
				"password": password
			})
		})
			.then((response) => {
				const data = response.json();
				return data;
			})
			.catch((err) => {
				console.log(err.message);
			});

		const getToken = async () => {
			const a = await auth;
			localStorage.setItem('token', a.token);
			axios.defaults.headers.common['Authorization'] = `Bearer ${a.token}`;
		};

		return getToken();
	}

	logout() {
		localStorage.removeItem('token');
		delete axios.defaults.headers.common['Authorization'];
	}

	getCurrentUser() {
		const token = localStorage.getItem('token');
		if (!token) return null;

		const decodedToken = jwtDecode(token);
		return {
			username: decodedToken.sub,
			id: decodedToken.id,
			role: decodedToken.role ? decodedToken.role : "none",
			exp: decodedToken.exp ? decodedToken.exp : "none",
		};
	}

	isTokenExpired() {
		if (!localStorage.getItem('token')) {
			return true;
		}
		const exp = this.getCurrentUser().exp;
		const currentTime = Date.now() / 1000; // current time in seconds
		return exp < currentTime;
	}

	getUsername() {
		const currentUser = this.getCurrentUser();
		return currentUser ? currentUser.username : null;
	}

	getRole() {
		const currentUser = this.getCurrentUser();
		return currentUser ? currentUser.role : null;
	}

	getUserId() {
		const currentUser = this.getCurrentUser();
		console.log(currentUser);
		return currentUser ? currentUser.id : null;
	}
}

export default new AuthService();