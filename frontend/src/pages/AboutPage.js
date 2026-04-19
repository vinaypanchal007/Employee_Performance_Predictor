function AboutPage() {
  return (
    <section className="page">
      <h2>About This Project</h2>
      <p className="subtext">
        This application combines a React frontend, Node.js API gateway, and Flask machine learning
        service to predict employee performance categories.
      </p>
      <div className="info-card-grid">
        <article className="info-card">
          <h3>Frontend</h3>
          <p>React-based user interface with structured, easy-to-use multi-page navigation.</p>
        </article>
        <article className="info-card">
          <h3>Backend Gateway</h3>
          <p>Node.js service handles API requests and communicates with the ML service.</p>
        </article>
        <article className="info-card">
          <h3>ML Service</h3>
          <p>Flask app preprocesses inputs and runs the trained model for predictions.</p>
        </article>
      </div>
    </section>
  );
}

export default AboutPage;
