import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const user = {
      name,
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

        <h2>Create your account</h2>

        <p className="auth-page-subtitle">
          Register to save properties and create property alerts.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="auth-page-field">
            <label>Full name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          <div className="auth-page-field">
            <label>Confirm password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm your password"
            />
          </div>

          <label className="terms-check">
            <input type="checkbox" required />
            I agree to the Terms and Privacy Policy.
          </label>

          <button
            type="submit"
            className="auth-page-submit"
          >
            Create account
          </button>

        </form>

        <div className="auth-page-divider">
          <span>or</span>
        </div>

        <p className="auth-switch-page">
          Already have an account?
          <Link to="/signin"> Sign in</Link>
        </p>

      </div>
    </main>
  );
}

export default Register;