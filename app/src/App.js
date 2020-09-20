import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg" >
        <Navbar.Brand href="#home">Processo Seletivo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Link className="nav-link" to="/">Início</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container >
        <div className="mt-5">
          <Routes />
        </div>
      </Container>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss />
    </Router>
  );
}

export default App;
