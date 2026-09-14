import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    const user = {
      name: email.split("@")[0],
      email,
    };

    localStorage.setItem(
      "estatehub_user",
      JSON.stringify(user)
    );

    navigate("/");
  };

  return (
    <main className="auth-page">
      <div className="auth-page-card">

        <button
          className="auth-back"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Back to home
        </button>

        <div className="auth-brand">
          <span>✓</span>
          <h1>EstateHub</h1>
        </div>

        <h2>Welcome back</h2>

        <p className="auth-page-subtitle">
          Sign in to save properties and manage your searches.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="auth-page-field">
            <label>Email address</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="auth-page-field">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
            />
          </div>

          <div className="auth-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <button type="button">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="auth-page-submit"
          >
            Sign in
          </button>

        </form>

        <div className="auth-page-divider">
          <span>or</span>
        </div>

        <p className="auth-switch-page">
          Don't have an account?
          <Link to="/register">
            Create an account
          </Link>
        </p>

      </div>
    </main>
  );
}

export default SignIn;