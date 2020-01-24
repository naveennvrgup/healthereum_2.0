import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import LoginRegister from './login-register';


class Navbar extends Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <header>
                <Link href="" className="logo">Health<span>Ereum</span></Link>
                <ul>
                    <li>
                        <Link
                            style={{
                                fontWeight: 800,
                                border: "2px solid #78ff00",
                                color: 'white'
                            }} to="#" onClick={this.toggle} >Login/Signup
                        </Link>
                    </li>
                </ul>

                <MDBModal isOpen={this.state.modal} size="lg" toggle={this.toggle} centered>
                    <MDBModalBody style={{ background: "#333" }}>
                        <LoginRegister />
                    </MDBModalBody>

                </MDBModal>

            </header>
        );
    }
}

export default Navbar;