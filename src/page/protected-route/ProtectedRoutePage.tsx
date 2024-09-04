import React, { useEffect } from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { RouterConstants } from '../../common/constant/route.constant';
import { useAuthContext } from '../../context/auth.context';

function ProtectedRoutePage() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated())
    return <Navigate to={RouterConstants.login.index} replace={true} />;
  return <Outlet />;
}

export default ProtectedRoutePage;
