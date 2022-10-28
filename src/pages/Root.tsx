import { useContext } from "react";
import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import Menu from "../components/Menu";
import AppContext from "../hooks/useApp";
import LoginPage from "./LoginPage";

const Root = () => {

	const app = useContext(AppContext)

	if (app.isLoggedIn()) {
		return (
			<div >
				<Menu />
				<Container>
					<Outlet />
				</Container>
			</div>
		)
	} else {
		return (
			<Container>
				<LoginPage />
			</Container>
		)
	}

}

export default Root
