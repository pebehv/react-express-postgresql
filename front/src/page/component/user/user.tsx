// src/User.jsx
import React, { useEffect, useState } from 'react';

//import TablaClientes from './TablaClientes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createCliente, deleteUser, getUser, updateUser } from '../../services/userService';
import TablaUser from './tableUser';
import ModalUser from './modelUSer';


const User = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userSelected, setUserSeleccionado] = useState(null);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const data = await getUser();
                setUser(data);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                // Manejo de errores
            } finally {
                setLoading(false);
            }
        };

        fetchDatos();
    }, []);

    const handleCreate = (userSelected) => {
        console.log('handleCreate cliente:', userSelected);
        setUserSeleccionado(userSelected);
        setShowModal(true);
       // handleEdit2(userSelected);
    };
    const handleEdit = (userSelected) => {
        console.log('Editar cliente:', userSelected);
        setUserSeleccionado(userSelected);
        setShowModal(true);
       // handleEdit2(userSelected);
    };
    const handleSave = async (userActualizado) => {
        console.log('handleSave', userActualizado)
        if(userActualizado.id != 0){

            await updateUser(userActualizado.id, userActualizado);
            setUser(prev => prev.map(c => (c.id === userActualizado.id ? userActualizado : c)));
        }else{
            await createCliente( userActualizado);
            setUser([...user, userActualizado]);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setUserSeleccionado(null);
    };
    /*const handleEdit2 = (userSelected) => {
        // Lógica para editar el cliente
        const data =  updateUser(userSelected.id , userSelected);
        console.log('Editar cliente:', userSelected);
    };*/

    const handleDelete = async (userSelected) => {
        // Lógica para eliminar el cliente
        console.log('Eliminar cliente con ID:', userSelected);
        await deleteUser(userSelected.id);
        setUser(user.filter(usuario => usuario.id !== userSelected.id));
    };

    if (loading) {
        return <div className="container mt-4">Cargando...</div>;
    }

    return (<>
            <button 
                className="btn btn-warning me-2"
                onClick={() => handleCreate({id : 0,name : '', email:'', password: '', isactive: false})}
            >
                Crear
            </button>
            <TablaUser user={user} onEdit={handleEdit} onDelete={handleDelete}  />
            {userSelected && (
                <ModalUser 
                    show={showModal} 
                    handleClose={handleCloseModal} 
                    user={userSelected} 
                    onSave={handleSave} 
                    
                />
            )}

        </> )
};

export default User;