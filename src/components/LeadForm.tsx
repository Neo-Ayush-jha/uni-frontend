import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";
import type { Course, MessageState, LeadFormData } from "../types/type";

interface Props {
  universityName: string;
  universityId: number;
  courses: Course[];
}

export default function LeadForm({ courses }: Props) {
  const [form, setForm] = useState<LeadFormData>({
    full_name: "",
    email: "",
    phone: "",
    state: "",
    course_interested: "",
    intake_year: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageState | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function validate() {
    if (
      !form.full_name ||
      !form.email ||
      !form.phone ||
      !form.state ||
      !form.course_interested ||
      !form.intake_year
    ) {
      setMessage({ type: "error", text: "Please fill all required fields." });
      return false;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setMessage({ type: "error", text: "Phone must be 10 digits (India)." });
      return false;
    }

    if (!form.consent) {
      setMessage({ type: "error", text: "Please accept consent to proceed." });
      return false;
    }

    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!validate()) return;

    setLoading(true);

    try {
      await axios.post(`${API_BASE}/leads/`, form);
      setMessage({
        type: "success",
        text: "Thank you! Your inquiry has been submitted.",
      });

      setForm({
        full_name: "",
        email: "",
        phone: "",
        state: "",
        course_interested: "",
        intake_year: "",
        consent: false,
      });
    } catch {
      setMessage({ type: "error", text: "Submission failed. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="input"
        name="full_name"
        placeholder="Full Name *"
        value={form.full_name}
        onChange={handleChange}
      />
      <input
        className="input"
        name="email"
        placeholder="Email *"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        className="input"
        name="phone"
        placeholder="Phone (10 digits) *"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        className="input"
        name="state"
        placeholder="State *"
        value={form.state}
        onChange={handleChange}
      />

      {/* Courses Dropdown */}
      <select
        className="input"
        name="course_interested"
        value={form.course_interested}
        onChange={handleChange}
      >
        <option value="">Select Course *</option>
        {courses.map((course) => (
          <option key={course.id} value={course.name}>
            {course.name}
          </option>
        ))}
      </select>

      <input
        className="input"
        name="intake_year"
        placeholder="Intake Year *"
        value={form.intake_year}
        onChange={handleChange}
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={handleChange}
        />
        I agree to be contacted.
      </label>

      <button className="cta-primary w-full">
        {loading ? "Submitting..." : "Submit"}
      </button>

      {message && (
        <div
          className={`p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}
    </form>
  );
}
