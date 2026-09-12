import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("Your email app will open with the project details ready to review.");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const project = String(data.get("project") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    const schedule = String(data.get("schedule") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    if (!name || !email || !project || !details) {
      setStatus("Add your name, email, project name, and scope details before continuing.");
      return;
    }

    const subject = encodeURIComponent(`Bid request: ${project}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Company: ${company || "Not provided"}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Project: ${project}`,
        `Location: ${location || "Not provided"}`,
        `Schedule: ${schedule || "Not provided"}`,
        "",
        "Scope details:",
        details,
      ].join("\n"),
    );

    setStatus("Opening your email app now.");
    window.location.href = `mailto:info@cbpmasonry.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="bid-form" onSubmit={handleSubmit} noValidate>
      <div className="bid-form__pair">
        <label>
          <span>Name *</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Company</span>
          <input name="company" autoComplete="organization" />
        </label>
      </div>
      <div className="bid-form__pair">
        <label>
          <span>Email *</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>
      <div className="bid-form__pair">
        <label>
          <span>Project name *</span>
          <input name="project" required />
        </label>
        <label>
          <span>Project location</span>
          <input name="location" autoComplete="street-address" />
        </label>
      </div>
      <label>
        <span>Anticipated masonry schedule</span>
        <input name="schedule" placeholder="Example: mobilization in October 2026" />
      </label>
      <label>
        <span>Scope details *</span>
        <textarea name="details" rows={7} required placeholder="Include wall systems, material types, bid date, and any known alternates." />
      </label>
      <div className="bid-form__action">
        <button type="submit"><span>Send bid details</span><i aria-hidden="true" /></button>
        <p role="status">{status}</p>
      </div>
    </form>
  );
}
