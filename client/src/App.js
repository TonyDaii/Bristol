import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import IsAuth from "./components/IsAuth";
import Home from "./views/Home";
import Bristol from "./views/Bristol";
import Login from "./views/Login";
import Register from "./views/Register";
import Forgot from "./views/Forgot";
import Reset from "./views/Reset";
import Profil from "./views/User/Profil";
import Settings from "./views/User/Settings";
import ProfilLayout from "./components/ProfilLayout";
import axios from "./utils/axios";
import CustomTheme from "./theme";
import Error from "./views/Error";
import ValidateEmail from "./views/ValidateEmail";
import "./App.scss";
export const UserContext = createContext({});

function App() {
	console.log(Error);
	const [user, setUser] = useState({});
	const [isAuthChecked, setIsAuthChecked] = useState(false);

	// Check if user is already authenticate at app launch
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { data } = await axios().get("/auth/is-auth");
				localStorage.setItem("refresh_token", data.refresh);
				setUser(data.user);
				setIsAuthChecked(true);
			} catch (err) {
				console.error("Not logged in");
				setIsAuthChecked(true);
			}
		};
		checkAuth();
	}, []);

	return (
		isAuthChecked && (
			<UserContext.Provider value={{ user, setUser }}>
				<Router>
					<Switch>
						<IsAuth>
							<Route exact path="/">
								<Login />
							</Route>
							<Route exact path="/register">
								<Register />
							</Route>
							<Route exact path="/forgot-password">
								<Forgot />
							</Route>
							<Route path="/reset/:code">
								<Reset />
							</Route>
							<CustomTheme>
								{user.id && (
									<Navbar>
										<Route exact path="/home">
											<Home />
										</Route>
										<Route exact path="/bristol">
											<Bristol />
										</Route>
										<Route
											exact
											path="/user/:page"
											render={({ match }) => (
												<ProfilLayout>
													{match.params.page === "settings" && <Settings />}
													{match.params.page === "profil" && <Profil />}
												</ProfilLayout>
											)}></Route>
									</Navbar>
								)}
								<Route exact path="/validate">
									<ValidateEmail />
								</Route>
							</CustomTheme>
						<Route path="/error">
							<Error />
						</Route> 
						</IsAuth>
					</Switch>
				</Router>
			</UserContext.Provider>
		)
	);
}

export default App;
