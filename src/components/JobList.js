import JobCard from "./JobCard";

function JobList({ jobs, deleteJob, editJob }) {
  return (
    <div className="job-list">
      <h2>My Applications</h2>
      {jobs.length === 0 ? (
        <div className="empty">
          <p>No job applications found.</p>
        </div>
      ) : (
        <div className="jobs">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              deleteJob={deleteJob}
              editJob={editJob}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;