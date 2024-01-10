import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ redirectPath = '/' ,children}) => {
    return localStorage.getItem('jwt-token')
        ?
        children
        :
        <Navigate to={redirectPath} replace />

};
export default ProtectedRoute;