// src/Tablauser.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaUser = ({ user, onEdit, onDelete }) => {
    return (
        <div className="container mt-4">
            <h2>user</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Habilitado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {user.length > 0 ? (
                        user.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.isactive ? 'Si': 'No'}</td>
                                <td>
                                    <button 
                                        className="btn btn-warning me-2"
                                        onClick={() => onEdit(u)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => onDelete(u)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No hay user disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TablaUser;