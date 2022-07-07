import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar , Nav , Button } from 'react-bootstrap';

import logo from '../../imgs/logo-black.png';



const Topnavbar = React.memo((props) => {
	let { modalShow , credentials , setCredentials } = props;
	
  	return (
	    <header id="topnavbar">
	    	<Navbar expand="lg" variant="dark">
		    	<Navbar.Brand href="/">
		    		<img src={ logo } alt="logo" />
		    	</Navbar.Brand>
		    	
		    	<Navbar.Toggle aria-controls="basic-navbar-nav"/>
		    	
		    	<Navbar.Collapse id="navbar-menu" className="justify-content-end">
			    	<NavLink className="px-3" to="/experiments">Experiments</NavLink>
			    	<NavLink className="px-3" to="/developer">Andrea Ciardi</NavLink>
			    	<Nav.Item className="ms-5">
			    		{
			    			credentials == null ?
			    				<Button id="btn-login" variant="primary" onClick={ modalShow }>Login</Button>
			    			:
			    				<Button id="btn-logout" variant="link" onClick={ (e) => setCredentials(null) }>Logout</Button>
			    		}
			    	</Nav.Item>
		    	</Navbar.Collapse>
		    </Navbar>
	    </header>
  	);
});

export default Topnavbar;