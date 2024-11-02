import { FcGoogle } from "react-icons/fc";

function Login() {
  const handleLogin = async () => {};
  return (
    <div className="login">
      <button className="login-btn" onClick={handleLogin}>
        <FcGoogle />
        Login with Google
      </button>
    </div>
  );
}

export default Login;
