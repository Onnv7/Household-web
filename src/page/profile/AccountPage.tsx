import React, { useEffect } from 'react';
import SideBarProfileComponent from './components/SideBarProfileComponent';
import EditProfileComponent from './components/EditProfileComponent';
import UpdatePasswordComponent from './components/UpdatePasswordComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderManagerComponent from './components/OrderManager/OrderManagerComponent';
type AccountHashType = '#profile' | '#password' | '#history';
const hashComponents: Record<AccountHashType, JSX.Element> = {
  ['#profile']: <EditProfileComponent />,
  ['#password']: <UpdatePasswordComponent />,
  ['#history']: <OrderManagerComponent />,
  // Add more mappings here
};
function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const hash = location.hash;

  const currentComponent = hashComponents[hash as AccountHashType];
  useEffect(() => {
    console.log('🚀 ~ sos');
    if (!currentComponent) {
      navigate('#profile', { replace: true });
    }
  }, [currentComponent]);

  return (
    <div className="w-full bg-gray-2">
      <div className="mx-auto flex w-[80%] gap-4 py-8">
        <div className="grow-[2] rounded-sm bg-white">
          <SideBarProfileComponent />
        </div>
        <div className="grow-[10] rounded-sm bg-white">{currentComponent}</div>
      </div>
    </div>
  );
}

export default AccountPage;
