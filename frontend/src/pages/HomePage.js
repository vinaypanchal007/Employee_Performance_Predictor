import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="page hero">
      <p className="badge">Smart Workforce Analytics</p>
      <h1>Predict employee performance with confidence</h1>
      <p className="subtext">
        Use this tool to estimate performance level from employee profile and workplace indicators.
        Designed for quick internal analysis and better data-driven decisions.
      </p>
      <Link to="/predict" className="cta-link">
        Start Prediction
      </Link>
    </section>
  );
}

export default HomePage;
