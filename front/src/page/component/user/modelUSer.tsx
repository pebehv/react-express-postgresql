// src/ModalEditarCliente.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalUser = ({ show, handleClose, user, onSave }) => {
    console.log('user model', user)
    const [name, setNombre] = useState(user.name);
    const [password, setPass] = useState(user.password);
    const [email, setEmail] = useState(user.email);
    const [isactive, setIsactive] = useState(user.isactive);
    const [mostrarPassword, setMostrarPassword] = useState(false);
    //const [habilitado, setHabilitado] = useState(false);

  const manejarCambioCheckbox = () => {
    console.log("check", !isactive)
    setIsactive(!isactive);
  };


  const mostrarPass = () => {
    setMostrarPassword(!mostrarPassword);
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { ...user, name, email, isactive,password };
        onSave(updatedUser);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name} 
                            onChange={(e) => setNombre(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Clave</Form.Label>
                        <Form.Control 
                            type={mostrarPassword ? 'text' : 'password'}
                            value={password} 
                            onChange={(e) => setPass(e.target.value)} 
                        />
                        <Form.Check
                            type="checkbox"
                            label="Mostrar contraseña"
                            checked={mostrarPassword}
                            onChange={mostrarPass}
                        />
                    </Form.Group>
                    
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Habilitar</Form.Label>
                        <Form.Check
                        type="checkbox"
                        value={isactive} 
                        checked={isactive}
                        //onChange={(e) => setIsactive(e.target.value)} 
                        onChange={manejarCambioCheckbox}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Guardar Cambios
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalUser;