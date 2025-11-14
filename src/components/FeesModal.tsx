import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";
import type { Course } from "../types/type";

interface Props {
  universityId: number;
  onClose: () => void;
}

export default function FeeModal({ universityId, onClose }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/universities/${universityId}/`)
      .then((res) => setCourses(res.data.courses || []));
  }, [universityId]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-xl animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Course-wise Fees</h3>
          <button onClick={onClose} className="text-xl hover:text-red-600 transition">
            ✕
          </button>
        </div>

        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-4 rounded-xl border shadow hover:shadow-lg transition"
            >
              <h4 className="text-lg font-semibold">{course.name}</h4>
              <p className="text-sm text-slate-500">{course.duration}</p>
              <p className="mt-2 text-blue-700 font-semibold">
                ₹{course.fee_range.min.toLocaleString()} - ₹
                {course.fee_range.max.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
