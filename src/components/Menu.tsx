import { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Power } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import AppContext from "../hooks/useApp";
import { LanguageContext } from "../hooks/useLanguage";

const Menu = () => {

	const [expanded, setExpanded] = useState(false)

	const app = useContext(AppContext);

	const {language} = useContext(LanguageContext)

	const toggle = () => {
		setExpanded(!expanded);
	}

	return (
		<Navbar collapseOnSelect 
				expand="lg" fixed="top" bg="light" 
				className="bg-opacity-75" 
				expanded={expanded}>
			<Container fluid>
				<Navbar.Brand>
					<Link className="navbar-brand" to={`/`}>
						<img className="d-inline-block align-text-top" src="/logo.png" alt={language.ln.app_name} height={24} width={24} />
						{' '}{language.ln.app_name}
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggle} />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto" onClick={toggle}>
						<Nav.Item>
							<Link className="nav-link" to={`lists`}>{language.ln.lists}</Link>
						</Nav.Item>
						<Nav.Item>
							<Link className="nav-link" to={`mygroups`}>{language.ln.my_groups}</Link>
						</Nav.Item>
						<Nav.Item>
							<Link className="nav-link" to={`groups`}>{language.ln.groups_management}</Link>
						</Nav.Item>
					</Nav>
					<Nav>
						<Nav.Item onClick={toggle}>
							<Link className="nav-link" to={`profile`}>
								<img src="/profile.png" alt={language.ln.items} height={24} width={24} style={{	marginTop: '-4px' }} />
                                {' '}
								{app.me && app.me.firstName} {app.me && app.me.lastName}
							</Link>
						</Nav.Item>
						<Nav.Item>{' '}</Nav.Item>
						<Nav.Item>
							<div className="mt-1 icon-link" onClick={() => app.logout()} title={language.ln.logout}>
								<Power size={28} />
							</div>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
