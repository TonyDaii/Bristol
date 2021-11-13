import io from "socket.io-client";

const initialState = {
	user: {
		id: null,
		firstName: "",
		lastName: "",
		email: "",
		socket: null,
	},
};

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case "LOGIN":
			localStorage.setItem("refresh_token", action.refresh);
			return {
				...state,
				user: {
					...action.user,
					socket: io(process.env.REACT_APP_SERVER_URL, {
						query: `id=${action.user.id}`,
					}),
				},
			};
		case "UPDATE_USER_INFO":
			return {
				...state,
				user: {
					...state.user,
					firstName: action.firstName,
					lastName: action.lastName,
				},
			};
		case "UPDATE_USER_EMAIL":
			return {
				...state,
				user: {
					...state.user,
					email: action.email,
				},
			};
		case "LOGOUT":
			localStorage.removeItem("refresh_token");
			return {
				...state,
				user: initialState.user,
			};
		default:
			return state;
	}
};

export default reducer;