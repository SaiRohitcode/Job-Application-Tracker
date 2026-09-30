function Dashboard({ jobs }) {
  const total = jobs.length;
  const applied = jobs.filter((job) => job.status === "Applied").length;
  const interview = jobs.filter((job) => job.status === "Interview").length;
  const selected = jobs.filter((job) => job.status === "Selected").length;
  const rejected = jobs.filter((job) => job.status === "Rejected").length;

  return (
    <div className="dashboard">
      <div className="stat-card">
        <h3>{total}</h3>
        <p>Total Applications</p>
      </div>

      <div className="stat-card">
        <h3>{applied}</h3>
        <p>Applied</p>
      </div>

      <div className="stat-card">
        <h3>{interview}</h3>
        <p>Interviews</p>
      </div>

      <div className="stat-card">
        <h3>{selected}</h3>
        <p>Selected</p>
      </div>

      <div className="stat-card">
        <h3>{rejected}</h3>
        <p>Rejected</p>
      </div>
    </div>
  );
}

export default Dashboard;