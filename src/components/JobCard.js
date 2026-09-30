function JobCard({ job, deleteJob, editJob }) {
  return (
    <div className="job-card">
      <div className="job-info">
        <h3>{job.position}</h3>
        <h4>{job.company}</h4>
        <p>Location: {job.location}</p>
        <p>Applied: {job.appliedDate}</p>
        <span className={`status ${job.status.toLowerCase()}`}>{job.status}</span>

        {job.rounds?.length > 0 && (
          <div className="rounds">
            <h4>Interview Rounds</h4>
            {job.rounds.map((round, i) => (
              <div className="round" key={i}>
                <span>{round.name}</span>
                <span>{round.date || "No date"}</span>
                <span className={
                  round.status === "Completed"
                    ? "done"
                    : round.status === "Not Attempted"
                    ? "not-attempted"
                    : "upcoming"
                }>
                  {round.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="job-actions">
        {job.link && <a href={job.link} target="_blank" rel="noreferrer" className="view-btn">View Job</a>}
        <button className="edit-btn" onClick={() => editJob(job)}>Edit</button>
        <button className="delete-btn" onClick={() => deleteJob(job.id)}>Delete</button>
      </div>
    </div>
  );
}

export default JobCard;