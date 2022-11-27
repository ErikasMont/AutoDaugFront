import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoutes=({requireAdmin}) =>{

  const user = JSON.parse(localStorage.getItem('user'));
  if(user){
    if((requireAdmin && user.isAdmin) || (!requireAdmin && !user.isAdmin)){
        return <Outlet/>
    }
    if(requireAdmin && !user.isAdmin){
      return <Navigate to="/main"/>
    }
  } 
  return <Navigate to="/login"/>
}

export default ProtectedRoutes;