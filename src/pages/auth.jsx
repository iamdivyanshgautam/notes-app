import { useState } from "react";
import API from "../api";
import "./auth.css";

function AuthPage({ onLogin }) {
  const [userExist, setUserExist] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [Msg, setMsg] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const route = userExist ? "/auth/login" : "/auth/register";
    try{
    const res = await API.post(route, { username, password });
    setMsg(res.data.message);
    
    if (userExist) onLogin();
    else {
      alert("Registered successfully! Now log in.");
      setUserExist(true);
    }
    }
    catch(error) {
       const errorMessage = error.response?.data?.message || "something went wrong";
       setMsg(errorMessage);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="toggle-bar">
        <span className="toggle-label" onClick={() => setUserExist(true)}>Log In</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={!userExist}
            onChange={() => setUserExist(!userExist)}
          />
          <span className="slider"></span>
        </label>
        <span className="toggle-label" onClick={() => setUserExist(false)}>Sign Up</span>
      </div>

      <div className={`card-container ${userExist ? "" : "flip"}`}>
        <div className="card">
          <div className="front">
            <h2>Login</h2>
            <form className="form" onSubmit={handleSubmit}>
              <input
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            <p>{Msg}</p>
          </div>

          <div className="back">
            <h2>Sign Up</h2>
            <form className="form" onSubmit={handleSubmit}>
              <input
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Sign Up</button>
            </form>
            <p>{Msg}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
