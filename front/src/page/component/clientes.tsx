import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setClientes(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDatos();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Clientes</h1>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente['id']}>{cliente['name']} </li>
                ))}
            </ul>
        </div>
    );
};

export default Clientes;