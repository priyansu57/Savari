import { NavLink, useNavigate } from "react-router-dom";
import "./Error.css";

const Error = () => {
  const navigate = useNavigate();

  const handlegoback = () => navigate(-1);

  const status = 404;
  const message = "Oops! The page you’re looking for doesn’t exist.";

  return (
    <section className="error-section">
      <div className="error-content">
        <figure>
          <img
            src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif"
            // "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="error page"
            className="error-gif"
          />
        </figure>
        <h3 className="error-title">
          {status} — {message}
        </h3>
        <div className="button-group">
          <NavLink to="/">
            <button className="button glow">🏠 Back Home</button>
          </NavLink>
          <button className="button glow" onClick={handlegoback}>
            ⬅️ Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default Error;
