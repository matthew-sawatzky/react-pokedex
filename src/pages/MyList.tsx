import Wrapper from '../sections/Wrapper'
import Login from '../assets/Login'
import { useAppSelector } from '../app/hooks'

function MyList() {
  const { userInfo } = useAppSelector(({app}) => app);

  return (
    <div className="list">
      <Login />
    </div>
  )
}

export default Wrapper(MyList);