// src/services/clienteService.js
import axios from 'axios';

const API_URL = '/users'; 
/*
export const getUser = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
};*/

// Obtener todos los clientes
export const getUser = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Crear un nuevo cliente
export const createCliente = async (nuevoCliente) => {
    const response = await axios.post(API_URL, nuevoCliente);
    return response.data;
};

// Actualizar un cliente existente
export const updateUser = async (id, userActualizado) => {
    console.log("update ", id, userActualizado)
    const response = await axios.put(`${API_URL}/${id}`, userActualizado);
    return response.data;
};

// Eliminar un cliente
export const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};