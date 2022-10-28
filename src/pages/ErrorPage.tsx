import { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { HeartbreakFill } from "react-bootstrap-icons";
import { Link, useRouteError } from "react-router-dom";
import Menu from "../components/Menu";
import { LanguageContext } from "../hooks/useLanguage";

type Error = {
	statusText?: string;
	message?: string;
};

const ErrorPage = () => {
	const routeError: Error = useRouteError() as Error;

	const {language} = useContext(LanguageContext)

	console.log(routeError);
	

	return (
		<>
			<Menu />
			<Container className="page-error d-grid gap-4">
				<h1 className="mx-auto"><HeartbreakFill /> {language.ln.route_error_title}</h1>
				<div className="mx-auto mb-3">{language.ln.route_error_message}</div>
				<div className="mx-auto">
					<Link to={"/"}>
						<Button className="btn-light">{language.ln.go_home}</Button>
					</Link>
				</div>
			</Container>
		</>
	);
};

export default ErrorPage;
