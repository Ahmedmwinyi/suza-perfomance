import { createContext, useContext, useState, type ReactNode } from "react";
import type {
  PerformanceEvaluation,
  EvaluationCycle,
  Notification,
  DashboardStats,
} from "../types";
import { subDays } from "date-fns";

interface EvaluationContextType {
  evaluations: PerformanceEvaluation[];
  cycles: EvaluationCycle[];
  notifications: Notification[];
  dashboardStats: DashboardStats;
  createEvaluation: (
    evaluation: Omit<PerformanceEvaluation, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateEvaluation: (
    id: string,
    updates: Partial<PerformanceEvaluation>
  ) => void;
  deleteEvaluation: (id: string) => void;
  getEvaluationsByUser: (userId: string) => PerformanceEvaluation[];
  getEvaluationsByStatus: (status: string) => PerformanceEvaluation[];
  markNotificationAsRead: (notificationId: string) => void;
}

const EvaluationContext = createContext<EvaluationContextType | undefined>(
  undefined
);

// Mock data
const mockEvaluations: PerformanceEvaluation[] = [
  {
    id: "1",
    employeeId: "1",
    appraiserId: "2",
    hodId: "3",
    evaluationPeriod: "2024",
    status: "submitted",
    b1_responsibilities: [
      {
        id: "1",
        target: "Teach undergraduate courses",
        indicator: "Student satisfaction rating",
        actualPerformance: "Achieved 4.5/5 rating",
        score: 85,
        employeeComment: "Successfully delivered all assigned courses",
        appraiserComment: "Excellent teaching performance",
      },
    ],
    b2_skills: [
      {
        id: "1",
        skillName: "Communication",
        description: "Effective communication with students and colleagues",
        score: 80,
        employeeComment: "Good interaction with students",
        appraiserComment: "Strong communication skills demonstrated",
      },
    ],
    b3_conduct: [
      {
        id: "1",
        conductArea: "Attendance",
        description: "Regular attendance and punctuality",
        score: 90,
        employeeComment: "Maintained excellent attendance",
        appraiserComment: "Consistently punctual and present",
      },
    ],
    b4_summary: {
      b1Score: 85,
      b2Score: 80,
      b3Score: 90,
      overallScore: 83.5,
      grade: "Very Good",
      strengths: [
        "Excellent teaching",
        "Good communication",
        "Reliable attendance",
      ],
      areasForImprovement: ["Research output", "Community engagement"],
      developmentPlan:
        "Focus on research publications and community outreach programs",
    },
    recommendations: [
      {
        id: "1",
        type: "recognition",
        description: "Recommend for teaching excellence award",
        priority: "high",
        status: "pending",
      },
    ],
    comments: [],
    finalScore: 83.5,
    finalGrade: "Very Good",
    createdAt: subDays(new Date(), 30),
    updatedAt: subDays(new Date(), 5),
    submittedAt: subDays(new Date(), 5),
  },
];

const mockCycles: EvaluationCycle[] = [
  {
    id: "1",
    name: "2024 Annual Performance Review",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    status: "active",
    departments: ["Computer Science", "Mathematics", "Physics"],
    totalEmployees: 150,
    completedEvaluations: 45,
  },
];

const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    title: "Performance Evaluation Due",
    message: "Your annual performance evaluation is due in 7 days.",
    type: "warning",
    read: false,
    createdAt: subDays(new Date(), 2),
    actionUrl: "/employee/evaluation",
  },
  {
    id: "2",
    userId: "2",
    title: "New Evaluation to Review",
    message:
      "Amina Hassan has submitted their performance evaluation for review.",
    type: "info",
    read: false,
    createdAt: subDays(new Date(), 1),
    actionUrl: "/appraiser/evaluations",
  },
];

const mockDashboardStats: DashboardStats = {
  totalEmployees: 150,
  completedEvaluations: 45,
  pendingEvaluations: 105,
  averageScore: 76.5,
  gradeDistribution: {
    "Very Good": 12,
    Good: 20,
    Fair: 10,
    Poor: 3,
  },
  departmentPerformance: [
    {
      department: "Computer Science",
      averageScore: 78.2,
      completedCount: 15,
      totalCount: 40,
    },
    {
      department: "Mathematics",
      averageScore: 75.8,
      completedCount: 18,
      totalCount: 35,
    },
    {
      department: "Physics",
      averageScore: 74.5,
      completedCount: 12,
      totalCount: 30,
    },
  ],
};

export function EvaluationProvider({ children }: { children: ReactNode }) {
  const [evaluations, setEvaluations] =
    useState<PerformanceEvaluation[]>(mockEvaluations);
  const [cycles] = useState<EvaluationCycle[]>(mockCycles);
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [dashboardStats] = useState<DashboardStats>(mockDashboardStats);

  const createEvaluation = (
    evaluationData: Omit<
      PerformanceEvaluation,
      "id" | "createdAt" | "updatedAt"
    >
  ) => {
    const newEvaluation: PerformanceEvaluation = {
      ...evaluationData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setEvaluations((prev) => [...prev, newEvaluation]);
  };

  const updateEvaluation = (
    id: string,
    updates: Partial<PerformanceEvaluation>
  ) => {
    setEvaluations((prev) =>
      prev.map((evaluation) =>
        evaluation.id === id
          ? { ...evaluation, ...updates, updatedAt: new Date() }
          : evaluation
      )
    );
  };

  const deleteEvaluation = (id: string) => {
    setEvaluations((prev) => prev.filter((evaluation) => evaluation.id !== id));
  };

  const getEvaluationsByUser = (userId: string) => {
    return evaluations.filter(
      (evaluation) =>
        evaluation.employeeId === userId ||
        evaluation.appraiserId === userId ||
        evaluation.hodId === userId
    );
  };

  const getEvaluationsByStatus = (status: string) => {
    return evaluations.filter((evaluation) => evaluation.status === status);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <EvaluationContext.Provider
      value={{
        evaluations,
        cycles,
        notifications,
        dashboardStats,
        createEvaluation,
        updateEvaluation,
        deleteEvaluation,
        getEvaluationsByUser,
        getEvaluationsByStatus,
        markNotificationAsRead,
      }}
    >
      {children}
    </EvaluationContext.Provider>
  );
}

export function useEvaluation() {
  const context = useContext(EvaluationContext);
  if (context === undefined) {
    throw new Error("useEvaluation must be used within an EvaluationProvider");
  }
  return context;
}
