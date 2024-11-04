import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { signOut } from 'firebase/auth';
import { useAppDispatch } from '../app/hooks';
import { setUserStatus, setToast } from '../app/slices/AppSlice';
import { firebaseAuth } from '../utils/FirebaseConfig';

function Footer() {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
signOut(firebaseAuth);
dispatch(setUserStatus(undefined))
dispatch(setToast('Logged out successfully!'))
  };

  return (
    <footer><div className="block"></div>
    <div className="data"></div>
    <div className="block">
      <MdOutlinePowerSettingsNew onClick={handleLogout} />
    </div>
    </footer>
  )
}

export default Footer