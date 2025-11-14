import { useEffect, useState } from "react";
import axios from "axios";
import LeadForm from "./LeadForm";
import FeeModal from "./FeesModal";
import { API_BASE } from "../config";

import type { University } from "../types/type";

interface Props {
  universityId: number;
  lpTitle: string;
}

export default function UniversityLanding({ universityId, lpTitle }: Props) {
  const [uni, setUni] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE}/universities/${universityId}/`)
      .then((res) => setUni(res.data))
      .catch(() => setUni(null))
      .finally(() => setLoading(false));
  }, [universityId]);

  if (loading) return <p className="text-center py-20 text-xl">Loading...</p>;

  return (
    <section className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl border p-8 md:p-12">

      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800">
          {uni?.name ?? lpTitle}
        </h2>
        <p className="mt-4 text-slate-600 max-w-4xl mx-auto text-lg">
          {uni?.overview ?? "University overview goes here."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-card">
              <h3 className="feature-title">Placements</h3>
              <p className="feature-text">{uni?.placements}</p>
            </div>

            <div className="feature-card">
              <h3 className="feature-title">Facilities</h3>
              <p className="feature-text">{uni?.facilities}</p>
            </div>

            <div className="feature-card">
              <h3 className="feature-title">Website</h3>
              <a
                className="text-blue-600 underline"
                href={uni?.website}
                target="_blank"
              >
                {uni?.website}
              </a>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap pt-4">
            <button onClick={() => setModalOpen(true)} className="cta-primary">
              Check Course-wise Fees
            </button>

            <button
              onClick={() =>
                window.open(
                  `${API_BASE}/universities/${universityId}/brochure/`,
                  "_blank"
                )
              }
              className="cta-secondary"
            >
              Download Brochure
            </button>

            <a href="#lead-form" className="cta-secondary">
              Apply Now
            </a>
          </div>
        </div>

        <aside className="glass-card sticky top-10 rounded-2xl p-6">
          <h4 className="text-2xl font-bold mb-4">Get Admission Details</h4>
          <LeadForm
            universityName={uni?.name ?? lpTitle}
            universityId={universityId}
            courses={uni?.courses || []}
          />
        </aside>
      </div>

      {modalOpen && (
        <FeeModal universityId={universityId} onClose={() => setModalOpen(false)} />
      )}
    </section>
  );
}
