export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: string;
  position: string;
  employeeId: string;
  supervisorId?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole =
  | "employee"
  | "appraiser"
  | "hod"
  | "hr"
  | "institution_head";

export interface PerformanceEvaluation {
  id: string;
  employeeId: string;
  appraiserId?: string;
  hodId?: string;
  hrId?: string;
  institutionHeadId?: string;
  evaluationPeriod: string;
  status: EvaluationStatus;
  b1_responsibilities: ResponsibilityItem[];
  b2_skills: SkillItem[];
  b3_conduct: ConductItem[];
  b4_summary: EvaluationSummary;
  recommendations: Recommendation[];
  comments: Comment[];
  finalScore: number;
  finalGrade: Grade;
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  reviewedAt?: Date;
  approvedAt?: Date;
  finalizedAt?: Date;
}

export type EvaluationStatus =
  | "draft"
  | "submitted"
  | "reviewed"
  | "approved"
  | "finalized"
  | "rejected";

export type Grade = "Very Good" | "Good" | "Fair" | "Poor";

export interface ResponsibilityItem {
  id: string;
  target: string;
  indicator: string;
  actualPerformance: string;
  score: number;
  employeeComment?: string;
  appraiserComment?: string;
}

export interface SkillItem {
  id: string;
  skillName: string;
  description: string;
  score: number;
  employeeComment?: string;
  appraiserComment?: string;
}

export interface ConductItem {
  id: string;
  conductArea: string;
  description: string;
  score: number;
  employeeComment?: string;
  appraiserComment?: string;
}

export interface EvaluationSummary {
  b1Score: number;
  b2Score: number;
  b3Score: number;
  overallScore: number;
  grade: Grade;
  strengths: string[];
  areasForImprovement: string[];
  developmentPlan: string;
}

export interface Recommendation {
  id: string;
  type: RecommendationType;
  description: string;
  priority: "high" | "medium" | "low";
  implementationDate?: Date;
  status: "pending" | "approved" | "rejected" | "implemented";
}

export type RecommendationType =
  | "salary_increase"
  | "promotion"
  | "training"
  | "transfer"
  | "warning"
  | "recognition"
  | "no_action";

export interface Comment {
  id: string;
  userId: string;
  userRole: UserRole;
  comment: string;
  timestamp: Date;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  hodId?: string;
  employeeCount: number;
}

export interface EvaluationCycle {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "completed" | "draft";
  departments: string[];
  totalEmployees: number;
  completedEvaluations: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface DashboardStats {
  totalEmployees: number;
  completedEvaluations: number;
  pendingEvaluations: number;
  averageScore: number;
  gradeDistribution: Record<Grade, number>;
  departmentPerformance: Array<{
    department: string;
    averageScore: number;
    completedCount: number;
    totalCount: number;
  }>;
}
