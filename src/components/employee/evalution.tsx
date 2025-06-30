/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Save,
  Send,
  FileText,
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2,
  Upload,
  Download,
} from "lucide-react";
import { Card } from "../common/Card";
import { Badge } from "../common/Badge";
import { useAuth } from "../../contexts/AuthContext";
import { useEvaluation } from "../../contexts/EvaluationContenxt";

const responsibilitySchema = z.object({
  target: z.string().min(1, "Target is required"),
  indicator: z.string().min(1, "Indicator is required"),
  actualPerformance: z.string().min(1, "Actual performance is required"),
  employeeComment: z.string().optional(),
  evidence: z.string().optional(),
});

const skillSchema = z.object({
  skillName: z.string().min(1, "Skill name is required"),
  description: z.string().min(1, "Description is required"),
  employeeComment: z.string().optional(),
  selfRating: z.number().min(1).max(5),
});

const conductSchema = z.object({
  conductArea: z.string().min(1, "Conduct area is required"),
  description: z.string().min(1, "Description is required"),
  employeeComment: z.string().optional(),
  selfRating: z.number().min(1).max(5),
});

const evaluationSchema = z.object({
  responsibilities: z
    .array(responsibilitySchema)
    .min(1, "At least one responsibility is required"),
  skills: z.array(skillSchema).min(1, "At least one skill is required"),
  conduct: z
    .array(conductSchema)
    .min(1, "At least one conduct area is required"),
  overallComments: z.string().optional(),
  developmentGoals: z.string().optional(),
});

export function MyEvaluation() {
  const { user } = useAuth();
  const { getEvaluationsByUser, createEvaluation, updateEvaluation } =
    useEvaluation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("responsibilities");
  const [saveType, setSaveType] = useState<"draft" | "submit">("draft");

  const userEvaluations = getEvaluationsByUser(user?.id || "");
  const currentEvaluation = userEvaluations.find(
    (e) => e.status === "draft" || e.status === "submitted"
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      responsibilities: currentEvaluation?.b1_responsibilities?.map((item) => ({
        target: item.target,
        indicator: item.indicator,
        actualPerformance: item.actualPerformance,
        employeeComment: item.employeeComment || "",
        evidence: "",
      })) || [
        {
          target: "",
          indicator: "",
          actualPerformance: "",
          employeeComment: "",
          evidence: "",
        },
      ],
      skills: currentEvaluation?.b2_skills?.map((item) => ({
        skillName: item.skillName,
        description: item.description,
        employeeComment: item.employeeComment || "",
        selfRating: 3,
      })) || [
        {
          skillName: "Communication Skills",
          description: "",
          employeeComment: "",
          selfRating: 3,
        },
        {
          skillName: "Problem Solving",
          description: "",
          employeeComment: "",
          selfRating: 3,
        },
        {
          skillName: "Teamwork",
          description: "",
          employeeComment: "",
          selfRating: 3,
        },
        {
          skillName: "Leadership",
          description: "",
          employeeComment: "",
          selfRating: 3,
        },
      ],
      conduct: currentEvaluation?.b3_conduct?.map((item) => ({
        conductArea: item.conductArea,
        description: item.description,
        employeeComment: item.employeeComment || "",
        selfRating: 3,
      })) || [
        {
          conductArea: "Attendance & Punctuality",
          description: "",
          employeeComment: "",
          selfRating: 3,
        },
        {
          conductArea: "Professional Ethics",
          description: "",
          employeeComment: "",
          selfRating: 3,
        },
        {
          conductArea: "Workplace Behavior",
          description: "",
          employeeComment: "",
          selfRating: 3,
        },
      ],
      overallComments: "",
      developmentGoals: "",
    },
  });

  const {
    fields: responsibilityFields,
    append: appendResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({
    control,
    name: "responsibilities",
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const {
    fields: conductFields,
    append: appendConduct,
    remove: removeConduct,
  } = useFieldArray({
    control,
    name: "conduct",
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const evaluationData = {
        employeeId: user?.id || "",
        evaluationPeriod: "2024",
        status:
          saveType === "submit" ? ("submitted" as const) : ("draft" as const),
        b1_responsibilities: data.responsibilities.map(
          (item: any, index: number) => ({
            id: (index + 1).toString(),
            target: item.target,
            indicator: item.indicator,
            actualPerformance: item.actualPerformance,
            score: 0,
            employeeComment: item.employeeComment,
          })
        ),
        b2_skills: data.skills.map((item: any, index: number) => ({
          id: (index + 1).toString(),
          skillName: item.skillName,
          description: item.description,
          score: item.selfRating * 20, // Convert 1-5 rating to percentage
          employeeComment: item.employeeComment,
        })),
        b3_conduct: data.conduct.map((item: any, index: number) => ({
          id: (index + 1).toString(),
          conductArea: item.conductArea,
          description: item.description,
          score: item.selfRating * 20, // Convert 1-5 rating to percentage
          employeeComment: item.employeeComment,
        })),
        b4_summary: {
          b1Score: 0,
          b2Score:
            (data.skills.reduce(
              (sum: number, skill: any) => sum + skill.selfRating,
              0
            ) /
              data.skills.length) *
            20,
          b3Score:
            (data.conduct.reduce(
              (sum: number, conduct: any) => sum + conduct.selfRating,
              0
            ) /
              data.conduct.length) *
            20,
          overallScore: 0,
          grade: "Inaridhisha" as const,
          strengths: [],
          areasForImprovement: [],
          developmentPlan: data.developmentGoals || "",
        },
        recommendations: [],
        comments: data.overallComments
          ? [
              {
                id: "1",
                userId: user?.id || "",
                userRole: "employee" as const,
                comment: data.overallComments,
                timestamp: new Date(),
              },
            ]
          : [],
        finalScore: 0,
        finalGrade: "Inaridhisha" as const,
        submittedAt: saveType === "submit" ? new Date() : undefined,
      };

      if (currentEvaluation) {
        updateEvaluation(currentEvaluation.id, evaluationData);
      } else {
        createEvaluation(evaluationData);
      }

      // Show success message
      alert(
        saveType === "submit"
          ? "Evaluation submitted successfully!"
          : "Evaluation saved as draft!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = (type: "draft" | "submit") => {
    setSaveType(type);
    handleSubmit(onSubmit)();
  };

  const tabs = [
    {
      id: "responsibilities",
      label: "B1: Job Responsibilities (60%)",
      icon: FileText,
    },
    { id: "skills", label: "B2: Skills & Abilities (30%)", icon: CheckCircle },
    {
      id: "conduct",
      label: "B3: Conduct & Discipline (10%)",
      icon: AlertCircle,
    },
    { id: "summary", label: "Summary & Goals", icon: FileText },
  ];

  const renderStarRating = (
    value: number,
    onChange: (value: number) => void
  ) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`w-6 h-6 ${
              star <= value ? "text-yellow-400" : "text-gray-300"
            } hover:text-yellow-400 transition-colors`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">My Performance Evaluation</h1>
        <p className="text-blue-100">
          Complete your self-assessment for the 2024 evaluation period
        </p>
        {currentEvaluation && (
          <div className="mt-4 flex items-center space-x-4">
            <Badge
              variant={
                currentEvaluation.status === "draft" ? "warning" : "info"
              }
            >
              Status: {currentEvaluation.status.toUpperCase()}
            </Badge>
            {currentEvaluation.submittedAt && (
              <span className="text-blue-100 text-sm">
                Submitted: {currentEvaluation.submittedAt.toLocaleDateString()}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Evaluation Progress
          </h3>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
              <Download className="w-4 h-4" />
              <span>Download Template</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-1 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm">
              <Upload className="w-4 h-4" />
              <span>Upload Evidence</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {tabs.map((tab, index) => (
            <div key={tab.id} className="text-center">
              <div
                className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <p className="text-xs text-gray-600">{tab.label.split(":")[0]}</p>
            </div>
          ))}
        </div>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tab Navigation */}
        <Card>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* B1: Job Responsibilities */}
            {activeTab === "responsibilities" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Job Responsibilities (60% Weight)
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      List your key job responsibilities, performance
                      indicators, and actual achievements.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      appendResponsibility({
                        target: "",
                        indicator: "",
                        actualPerformance: "",
                        employeeComment: "",
                        evidence: "",
                      })
                    }
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Responsibility</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {responsibilityFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">
                          Responsibility #{index + 1}
                        </h4>
                        {responsibilityFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeResponsibility(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target/Responsibility *
                          </label>
                          <textarea
                            {...register(`responsibilities.${index}.target`)}
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your key responsibility or target..."
                          />
                          {errors.responsibilities?.[index]?.target && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.responsibilities[index]?.target?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Performance Indicator *
                          </label>
                          <textarea
                            {...register(`responsibilities.${index}.indicator`)}
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="How is this responsibility measured?"
                          />
                          {errors.responsibilities?.[index]?.indicator && (
                            <p className="text-red-500 text-sm mt-1">
                              {
                                errors.responsibilities[index]?.indicator
                                  ?.message
                              }
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Actual Performance *
                          </label>
                          <textarea
                            {...register(
                              `responsibilities.${index}.actualPerformance`
                            )}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe what you actually achieved with specific examples and metrics..."
                          />
                          {errors.responsibilities?.[index]
                            ?.actualPerformance && (
                            <p className="text-red-500 text-sm mt-1">
                              {
                                errors.responsibilities[index]
                                  ?.actualPerformance?.message
                              }
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Supporting Evidence
                          </label>
                          <input
                            {...register(`responsibilities.${index}.evidence`)}
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Link to documents, reports, or other evidence..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Comments
                          </label>
                          <textarea
                            {...register(
                              `responsibilities.${index}.employeeComment`
                            )}
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Any additional comments about this responsibility..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* B2: Skills & Abilities */}
            {activeTab === "skills" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Skills & Abilities (30% Weight)
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Assess your professional skills and abilities relevant to
                      your position.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      appendSkill({
                        skillName: "",
                        description: "",
                        employeeComment: "",
                        selfRating: 3,
                      })
                    }
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Skill</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {skillFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">
                          Skill #{index + 1}
                        </h4>
                        {skillFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Skill Name *
                          </label>
                          <input
                            {...register(`skills.${index}.skillName`)}
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Communication Skills, Technical Expertise..."
                          />
                          {errors.skills?.[index]?.skillName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.skills[index]?.skillName?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Self-Assessment Description *
                          </label>
                          <textarea
                            {...register(`skills.${index}.description`)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your proficiency in this skill and provide specific examples..."
                          />
                          {errors.skills?.[index]?.description && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.skills[index]?.description?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Self-Rating (1-5 stars)
                          </label>
                          {renderStarRating(
                            watch(`skills.${index}.selfRating`) || 3,
                            (value) =>
                              setValue(`skills.${index}.selfRating`, value)
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            1 = Beginner, 2 = Basic, 3 = Intermediate, 4 =
                            Advanced, 5 = Expert
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Comments
                          </label>
                          <textarea
                            {...register(`skills.${index}.employeeComment`)}
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Any additional comments about this skill..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* B3: Conduct & Discipline */}
            {activeTab === "conduct" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Conduct & Discipline (10% Weight)
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Assess your professional conduct and adherence to
                      workplace standards.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      appendConduct({
                        conductArea: "",
                        description: "",
                        employeeComment: "",
                        selfRating: 3,
                      })
                    }
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Conduct Area</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {conductFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">
                          Conduct Area #{index + 1}
                        </h4>
                        {conductFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeConduct(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Conduct Area *
                          </label>
                          <input
                            {...register(`conduct.${index}.conductArea`)}
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Attendance & Punctuality, Professional Ethics..."
                          />
                          {errors.conduct?.[index]?.conductArea && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.conduct[index]?.conductArea?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Self-Assessment *
                          </label>
                          <textarea
                            {...register(`conduct.${index}.description`)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Assess your conduct in this area with specific examples..."
                          />
                          {errors.conduct?.[index]?.description && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.conduct[index]?.description?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Self-Rating (1-5 stars)
                          </label>
                          {renderStarRating(
                            watch(`conduct.${index}.selfRating`) || 3,
                            (value) =>
                              setValue(`conduct.${index}.selfRating`, value)
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            1 = Poor, 2 = Below Average, 3 = Average, 4 = Good,
                            5 = Excellent
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Comments
                          </label>
                          <textarea
                            {...register(`conduct.${index}.employeeComment`)}
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Any additional comments..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary & Goals */}
            {activeTab === "summary" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Summary & Development Goals
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Provide an overall summary and set your development goals
                    for the next period.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overall Comments
                    </label>
                    <textarea
                      {...register("overallComments")}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Provide an overall summary of your performance, achievements, and challenges during this evaluation period..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Development Goals for Next Period
                    </label>
                    <textarea
                      {...register("developmentGoals")}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="What are your goals for professional development in the next evaluation period? Include specific skills you want to develop, training you'd like to receive, or career objectives..."
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Evaluation Summary
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700">Responsibilities:</span>{" "}
                        {responsibilityFields.length} items
                      </div>
                      <div>
                        <span className="text-blue-700">Skills:</span>{" "}
                        {skillFields.length} items
                      </div>
                      <div>
                        <span className="text-blue-700">Conduct:</span>{" "}
                        {conductFields.length} items
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <Card>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              {currentEvaluation?.status === "submitted" ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    Evaluation submitted successfully and is under review
                  </span>
                </div>
              ) : currentEvaluation?.status === "draft" ? (
                <div className="flex items-center space-x-2 text-yellow-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>Draft saved - remember to submit for review</span>
                </div>
              ) : (
                <span>Complete all sections and submit for review</span>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleSave("draft")}
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>
                  {isSubmitting && saveType === "draft"
                    ? "Saving..."
                    : "Save Draft"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSave("submit")}
                disabled={
                  isSubmitting || currentEvaluation?.status === "submitted"
                }
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting && saveType === "submit"
                    ? "Submitting..."
                    : "Submit for Review"}
                </span>
              </button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}
