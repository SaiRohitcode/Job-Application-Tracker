import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState(() => {
    const data = localStorage.getItem("jobApplications");
    return data ? JSON.parse(data) : [];
  });

  const [editingJob, setEditingJob] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("jobApplications", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs([...jobs, { ...job, id: Date.now() }]);
  };

  const updateJob = (job) => {
    setJobs(jobs.map((item) => item.id === job.id ? job : item));
    setEditingJob(null);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const updateRound = (jobId, roundIndex, status) => {
    setJobs(jobs.map((job) => {
      if (job.id !== jobId) return job;
      const rounds = [...job.rounds];
      rounds[roundIndex] = { ...rounds[roundIndex], status };
      return { ...job, rounds };
    }));
  };

  const editJob = (job) => {
    setEditingJob(job);
    setTimeout(() => {
      document.getElementById("job-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  const getDateDifference = (date) => {
    const today = new Date();
    const target = new Date(date + "T00:00:00");
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  };

  const alerts = jobs.flatMap((job) =>
    (job.rounds || [])
      .map((round, index) => ({
        ...round,
        job,
        index,
        days: getDateDifference(round.date)
      }))
      .filter(
        (round) =>
          round.status === "Upcoming" &&
          round.date &&
          round.days <= 2
      )
  );

  const filteredJobs = jobs.filter((job) => {
    const searchMatch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.position.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All" || job.status === statusFilter;

    return searchMatch && statusMatch;
  });

  return (
    <>
      <Navbar />

      {alerts.length > 0 && (
        <div className="alert-section">
          <div className="alert-container">
            {alerts.map((alert, i) => {
              const overdue = alert.days < 0;

              return (
                <div className="alert" key={i}>
                  <strong>
                    {overdue
                      ? "Interview Update Required"
                      : "Upcoming Interview"}
                  </strong>

                  <p><b>{alert.job.company}</b></p>
                  <p>{alert.job.position}</p>
                  <p>{alert.name} • {alert.date}</p>

                  {overdue ? (
                    <>
                      <p className="overdue-text">
                        This interview date has passed. Update the result.
                      </p>

                      <div className="alert-buttons">
                        <button
                          className="complete-btn"
                          onClick={() =>
                            updateRound(alert.job.id, alert.index, "Completed")
                          }
                        >
                          Completed
                        </button>

                        <button
                          className="not-attempted-btn"
                          onClick={() =>
                            updateRound(alert.job.id, alert.index, "Not Attempted")
                          }
                        >
                          Not Attempted
                        </button>
                      </div>
                    </>
                  ) : (
                    <p>
                      {alert.days === 0
                        ? "Interview is today."
                        : `Interview in ${alert.days} day${alert.days > 1 ? "s" : ""}.`}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <main className="container">
        <Dashboard jobs={jobs} />

        <div id="job-form">
          <JobForm
            addJob={addJob}
            updateJob={updateJob}
            editingJob={editingJob}
            setEditingJob={setEditingJob}
          />
        </div>

        <div className="filter-section">
          <input
            placeholder="Search company or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>
        </div>

        <JobList
          jobs={filteredJobs}
          deleteJob={deleteJob}
          editJob={editJob}
        />
      </main>
    </>
  );
}

export default App;