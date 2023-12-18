import { axiosAuthorized, axiosRequest } from "../../axios";
import { APIRoutes } from "../../const/API-routes";

export const editUserNameDataRequest = async (values) => {
	let user = null;

	try {
		const data = await axiosAuthorized.patch(
			process.env.REACT_APP_API_URL + APIRoutes.user_editUserNameData,
			{
				userId: values.userId,
				name: values.name,
				surname: values.surname,
				login: values.login,
			},
		);

		user = data.data.response;
	} catch (error) {
		console.warn(error);
	}
	return user;
};

export const getUserRequest = async (id) => {
	let user = null;

	try {
		const data = await axiosAuthorized.get(
			process.env.REACT_APP_API_URL + APIRoutes.user_getUser + id,
			{},
		);

		user = data.data.response;
	} catch (error) {
		console.warn(error);
	}
	return user;
};

export const changeUserPasswordRequest = async (values) => {
	let user = null;

	try {
		const data = await axiosAuthorized.post(
			process.env.REACT_APP_API_URL + APIRoutes.user_changePassword,
			{
				userId: values.userId,
				actualPassword: values.actualPassword,
				newPassword: values.newPassword,
			},
		);

		user = data.data.response;
	} catch (error) {
		console.warn(error);
	}
	return user;
};

export const userSignUpRequest = async (values) => {
	let isSuccess;

	try {
		await axiosRequest.post(
			process.env.REACT_APP_API_URL + APIRoutes.auth_signup,
			values,
		);

		isSuccess = true;
	} catch (error) {
		console.warn(error);
	}

	return isSuccess;
};

export const userLoginRequest = async (values) => {
	let response;

	try {
		const data = await axiosRequest.post(
			process.env.REACT_APP_API_URL + APIRoutes.auth_login,
			values,
		);

		response = data;
	} catch (error) {
		console.warn(error);
	}

	return response;
};

export const getUsersRatingPaginationRequest = async (page) => {
	let response;

	try {
		const { data } = await axiosAuthorized.get(
			process.env.REACT_APP_API_URL +
				APIRoutes.user_getUsersRatingPagination +
				page,
		);

		response = data.response;
	} catch (error) {
		console.warn(error);
	}

	return response;
};
