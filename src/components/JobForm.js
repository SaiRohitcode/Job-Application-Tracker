import { useEffect, useState } from "react";

function JobForm({ addJob, updateJob, editingJob, setEditingJob }) {
  const empty = {
    company: "", position: "", location: "", status: "Applied",
    appliedDate: "", link: "", rounds: []
  };

  const [form, setForm] = useState(empty);
  const [roundCount, setRoundCount] = useState(0);

  useEffect(() => {
    if (editingJob) {
      setForm(editingJob);
      setRoundCount(editingJob.rounds?.length || 0);
    }
  }, [editingJob]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const changeRoundCount = (e) => {
    const count = Number(e.target.value);
    setRoundCount(count);
    const rounds = Array.from({ length: count }, (_, i) => ({
      name: form.rounds?.[i]?.name || `Round ${i + 1}`,
      date: form.rounds?.[i]?.date || "",
      status: form.rounds?.[i]?.status || "Upcoming"
    }));
    setForm({ ...form, rounds });
  };

  const changeRound = (index, field, value) => {
    const rounds = [...form.rounds];
    rounds[index] = { ...rounds[index], [field]: value };
    setForm({ ...form, rounds });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.company || !form.position || !form.location || !form.appliedDate) {
      alert("Please fill all required fields.");
      return;
    }

    editingJob ? updateJob(form) : addJob(form);
    setForm(empty);
    setRoundCount(0);
  };

  const cancel = () => {
    setEditingJob(null);
    setForm(empty);
    setRoundCount(0);
  };

  return (
    <div className="form-section">
      <h2>{editingJob ? "Edit Application" : "Add Job Application"}</h2>

      <form onSubmit={submit}>
        <div className="form-grid">
          <input name="company" placeholder="Company Name *" value={form.company} onChange={change} />
          <input name="position" placeholder="Job Position *" value={form.position} onChange={change} />
          <input name="location" placeholder="Location *" value={form.location} onChange={change} />

          <select name="status" value={form.status} onChange={change}>
            <option>Applied</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>

          <input type="date" name="appliedDate" value={form.appliedDate} onChange={change} />
          <input type="url" name="link" placeholder="Job Link" value={form.link} onChange={change} />

          <select value={roundCount} onChange={changeRoundCount}>
            <option value="0">Number of Interview Rounds</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {form.rounds.length > 0 && (
          <div className="rounds-form">
            <h3>Interview Rounds</h3>
            {form.rounds.map((round, i) => (
              <div className="round-row" key={i}>
                <input value={round.name} placeholder={`Round ${i + 1}`} onChange={(e) => changeRound(i, "name", e.target.value)} />
                <input type="date" value={round.date} onChange={(e) => changeRound(i, "date", e.target.value)} />
                <select value={round.status} onChange={(e) => changeRound(i, "status", e.target.value)}>
                  <option>Upcoming</option>
                  <option>Completed</option>
                  <option>Not Attempted</option>
                </select>
              </div>
            ))}
          </div>
        )}

        <div className="form-buttons">
          <button className="primary-btn">
            {editingJob ? "Update Application" : "Add Application"}
          </button>
          {editingJob && (
            <button type="button" className="cancel-btn" onClick={cancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default JobForm;