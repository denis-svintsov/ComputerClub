import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import RegistrationPage from './page/RegistrationPage.jsx';
import MainPage from './page/MainPage.jsx';
import AdminPage from './page/AdminPage.jsx';
import FreePlacePage from './page/FreePlacePage.jsx';
import AdminRegistrations from './page/AdminRegistrations.jsx';
import AdminRegistrationsByPhone from './page/AdminRegistrationsByPhone.jsx';
import AdminRegistrationQueue from './page/AdminRegistrationQueue.jsx';
import AdminPlaces from './page/AdminPlaces.jsx';
import AddPlace from './page/AddPlace.jsx';
import UpdatePlace from './page/UpdatePlace.jsx';
import AdminPlaceTypes from './page/AdminPlaceTypes.jsx';
import AddPlaceType from './page/AddPlaceType.jsx';
import UpdatePlaceType from './page/UpdatePlaceType.jsx';
import AdminPrices from './page/AdminPrices.jsx';
import AddPrice from './page/AddPrice.jsx';
import UpdatePrice from './page/UpdatePrice.jsx';
import SignInPage from './page/SignInPage.jsx';
import SignUpPage from './page/SignUpPage.jsx';
import AccountPage from './page/AccountPage.jsx';
import AccountInfo from './page/AccountInfo.jsx';
import AccountActives from './page/AccountActives.jsx';
import AccountOlds from './page/AccountOlds.jsx';
import AdminAccounts from './page/AdminAccounts.jsx';
import AdminAdmins from './page/AdminAdmins.jsx';
import AddAdmin from './page/AddAdmin.jsx';
import AccountEdit from './page/AccountEdit.jsx';
import UpdateAdmin from './page/UpdateAdmin.jsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <MainPage />
			},
			{
				path: "/sign-in",
				element: <SignInPage />
			},
			{
				path: "/sign-up",
				element: <SignUpPage />
			},
			{
				path: "/account",
				children: [
					{
						index: true,
						element: <AccountPage />
					},
					{
						path: "/account/info",
						element: <AccountInfo />
					},
					{
						path: "/account/actives",
						element: <AccountActives />
					},
					{
						path: "/account/archive",
						element: <AccountOlds />
					},
					{
						path: "/account/info/edit",
						element: <AccountEdit />
					}
				]
			},
			{
				path: "/admin",
				children: [
					{
						index: true,
						element: <AdminPage />
					},
					{
						path: "/admin/free-place/",
						element: <FreePlacePage />
					},
					,
					{
						path: "/admin/free-place/:registrationId",
						element: <FreePlacePage />
					},
					{
						path: "/admin/registrations",
						element: <AdminRegistrations />
					},
					{
						path: "/admin/registrations-by-phone",
						element: <AdminRegistrationsByPhone />
					},
					{
						path: "/admin/registration-queue",
						element: <AdminRegistrationQueue />
					},
					{
						path: "/admin/places",
						element: <AdminPlaces />
					},
					{
						path: "/admin/places/add",
						element: <AddPlace />
					},
					{
						path: "/admin/places/update/:placeId",
						element: <UpdatePlace />
					},
					{
						path: "/admin/place-types",
						element: <AdminPlaceTypes />
					},
					{
						path: "/admin/place-types/add",
						element: <AddPlaceType />
					},
					{
						path: "/admin/place-types/update/:placeTypeId",
						element: <UpdatePlaceType />
					},
					{
						path: "/admin/prices",
						element: <AdminPrices />
					},
					{
						path: "/admin/prices/add",
						element: <AddPrice />
					},
					{
						path: "/admin/prices/update/:priceId",
						element: <UpdatePrice />
					},
					{
						path: "/admin/users",
						element: <AdminAccounts />
					},
					{
						path: "/admin/employees",
						element: <AdminAdmins />
					},
					{
						path: "/admin/employees/add",
						element: <AddAdmin />
					},
					{
						path: "/admin/employees/update/:userId",
						element: <UpdateAdmin />
					}
				]

			}
		]
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
