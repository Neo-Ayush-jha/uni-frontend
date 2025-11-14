export interface Course {
  id: number;
  name: string;
  duration: string;
  fee_range: {
    min: number;
    max: number;
  };
}

export interface University {
  id: number;
  name: string;
  overview: string;
  placements: string;
  facilities: string;
  website: string;
  courses: Course[];
}

export interface LeadFormData {
  full_name: string;
  email: string;
  phone: string;
  state: string;
  course_interested: string;
  intake_year: string;
  consent: boolean;
}

export interface MessageState {
  type: "success" | "error";
  text: string;
}
