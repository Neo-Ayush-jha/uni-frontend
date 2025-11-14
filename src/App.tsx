import UniversityLanding from "./components/UniversityLanding";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-2 py-1 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="AdmissionHub Logo"
              className="w-28 h-20"
            />
            <h1 className="text-lg md:text-xl font-semibold text-slate-800">
              AdmissionHub
            </h1>
          </div>

        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-12">
        <UniversityLanding
          universityId={1}
          lpTitle="LP-1 — Horizon University"
        />
        <UniversityLanding
          universityId={2}
          lpTitle="LP-2 — Summit University"
        />
      </main>

      <footer className="text-center py-6 text-slate-600 text-xs md:text-sm">
        Built with React + Tailwind (Vite)
      </footer>
    </div>
  );
}
