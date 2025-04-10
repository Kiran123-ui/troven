"use client"

import { useState } from "react"
import { PageTransition } from "../components/page-transition"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, Plus, Edit, Trash2, ChevronDown, ChevronLeft, ChevronRight, Upload, X } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CatalogPage() {
  const [mainTab, setMainTab] = useState("skill-based")
  const [skillBasedTab, setSkillBasedTab] = useState("assessment")
  const [roleBasedTab, setRoleBasedTab] = useState("role-bases-assessment")
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(4)

  // Modal states
  const [createSkillOpen, setCreateSkillOpen] = useState(false)
  const [createRoleOpen, setCreateRoleOpen] = useState(false)
  const [uploadQuestionOpen, setUploadQuestionOpen] = useState(false)
  const [createSkillAssessmentOpen, setCreateSkillAssessmentOpen] = useState(false)
  const [createRoleAssessmentOpen, setCreateRoleAssessmentOpen] = useState(false)

  // Selected skills for Create Role modal
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["HTML", "JAVA", "PHP"])

  // Mock data for questionbank
  const questionCategories = [
    { name: "Python", count: 5 },
    { name: "Reasoning", count: 5 },
    { name: "CSS", count: 5 },
    { name: "Javascript", count: 5 },
    { name: "React", count: 5 },
  ]

  // Mock data for reasoning questions
  const reasoningQuestions = [
    { id: 1, text: "This is question 1 of the reasoning section?" },
    { id: 2, text: "This is question 1 of the reasoning section?" },
    { id: 4, text: "This is question 1 of the reasoning section?" },
    { id: 5, text: "This is question 1 of the reasoning section?" },
  ]

  // Mock data for skills
  const skills = [
    {
      id: 1,
      icon: "⚛️",
      name: "React",
      difficulty: "Beginner",
      questionbank: "Python",
      parentSkill: "Python",
      totalQuestion: "Coding:2   MCQ:2",
    },
    {
      id: 2,
      icon: "☕",
      name: "Java",
      difficulty: "Beginner",
      questionbank: "Java",
      parentSkill: "Java",
      totalQuestion: "Coding:2   MCQ:2",
    },
    {
      id: 3,
      icon: "🐍",
      name: "Python",
      difficulty: "Intermediate",
      questionbank: "Python",
      parentSkill: "Python",
      totalQuestion: "Coding:2   MCQ:2",
    },
    {
      id: 4,
      icon: "🌐",
      name: "HTML",
      difficulty: "Expert",
      questionbank: "HTML",
      parentSkill: "HTML",
      totalQuestion: "Coding:2   MCQ:2",
    },
  ]

  // Mock data for roles
  const roles = [
    {
      id: 1,
      name: "Software engineer",
      skillSet: ["HTML", "PHP", "CSS", "React", "Angular", "Python", "Javascript", "SQL"],
      totalSkills: 11,
    },
    {
      id: 2,
      name: "Software engineer",
      skillSet: ["HTML", "PHP", "CSS", "React", "Angular", "Python", "Javascript", "SQL"],
      totalSkills: 11,
    },
    {
      id: 3,
      name: "Software engineer",
      skillSet: ["HTML", "PHP", "CSS", "React", "Angular", "Python", "Javascript", "SQL"],
      totalSkills: 11,
    },
    {
      id: 4,
      name: "Software engineer",
      skillSet: ["HTML", "PHP", "CSS", "React", "Angular", "Python", "Javascript", "SQL"],
      totalSkills: 11,
    },
    {
      id: 5,
      name: "Software engineer",
      skillSet: ["HTML", "PHP", "CSS", "React", "Angular", "Python", "Javascript", "SQL"],
      totalSkills: 11,
    },
  ]

  // Mock data for assessments
  const assessments = [
    {
      id: 1,
      title: "Python Quiz Test | Interview",
      company: "Google Backend - Python Team",
      author: "Sanjay",
      date: "Aug 03 2023",
      difficulty: "Expert",
      duration: 20,
      totalQuestions: 20,
      mcq: 10,
      coding: 5,
      other: 5,
    },
    {
      id: 2,
      title: "Python Quiz Test | Interview",
      company: "Google Backend - Python Team",
      author: "Sanjay",
      date: "Aug 03 2023",
      difficulty: "Beginner",
      duration: 20,
      totalQuestions: 20,
      mcq: 10,
      coding: 5,
      other: 5,
    },
    {
      id: 3,
      title: "Python Quiz Test | Interview",
      company: "Google Backend - Python Team",
      author: "Sanjay",
      date: "Aug 03 2023",
      difficulty: "Beginner",
      duration: 20,
      totalQuestions: 20,
      mcq: 10,
      coding: 5,
      other: 5,
    },
    {
      id: 4,
      title: "Python Quiz Test | Interview",
      company: "Google Backend - Python Team",
      author: "Sanjay",
      date: "Aug 03 2023",
      difficulty: "Expert",
      duration: 20,
      totalQuestions: 20,
      mcq: 10,
      coding: 5,
      other: 5,
    },
  ]

  // Stats data
  const stats = [
    { icon: "👑", value: "305", label: "Total Assessments" },
    { icon: "👥", value: "4502", label: "Skill based Asmt." },
    { icon: "🎓", value: "2540", label: "Role based Asmt." },
    { icon: "📷", value: "50", label: "Total Roles" },
  ]

  // Remove a skill from selected skills
  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill))
  }

  return (
    <PageTransition>
      <div className="p-0">
        {/* Main Tabs */}
        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 rounded-none border-b bg-white h-14">
            <TabsTrigger
              value="role-based"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none h-full"
            >
              Role Based
            </TabsTrigger>
            <TabsTrigger
              value="skill-based"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none h-full"
            >
              Skill Based
            </TabsTrigger>
          </TabsList>

          {/* Role Based Content */}
          <TabsContent value="role-based" className="mt-0">
            {/* Stats Cards */}
            <div className="bg-white p-6 border-b">
              <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full text-2xl">{stat.icon}</div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Based Tabs */}
            <Tabs value={roleBasedTab} onValueChange={setRoleBasedTab} className="w-full">
              <div className="flex justify-between items-center p-4 bg-white">
                <TabsList className="bg-white p-0 h-auto">
                  <TabsTrigger
                    value="role-bases-assessment"
                    className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2"
                  >
                    Role Based Assessment
                  </TabsTrigger>
                  <TabsTrigger
                    value="roles-list"
                    className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none px-4 py-2"
                  >
                    Roles List
                  </TabsTrigger>
                </TabsList>

                <div className="flex gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCreateRoleAssessmentOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Create Assessment
                  </Button>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input className="pl-10 bg-white w-[300px]" placeholder="Search Assessment" />
                  </div>
                </div>
              </div>

              <TabsContent value="role-bases-assessment" className="mt-0 p-4">
                {/* Assessment Cards */}
                <div className="space-y-4">
                  {assessments.map((assessment) => (
                    <div key={assessment.id} className="bg-white rounded-lg border p-4">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{assessment.title}</h3>
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-medium ${
                                assessment.difficulty === "Expert"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {assessment.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{assessment.company}</p>
                          <p className="text-xs text-gray-500">
                            By {assessment.author} · {assessment.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-lg font-semibold">
                              {assessment.duration}
                              <span className="text-xs text-gray-500">min</span>
                            </div>
                            <div className="text-xs text-gray-500">Duration</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{assessment.totalQuestions}</div>
                            <div className="text-xs text-gray-500">Total Questions</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{assessment.mcq}</div>
                            <div className="text-xs text-gray-500">MCQ</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{assessment.coding}</div>
                            <div className="text-xs text-gray-500">Coding</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{assessment.other}</div>
                            <div className="text-xs text-gray-500">Other</div>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Action <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="roles-list" className="mt-0">
                <div className="bg-gray-50 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div></div>
                    <div className="flex gap-3">
                      <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCreateRoleOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Create Role
                      </Button>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input className="pl-10 bg-white w-[300px]" placeholder="Search Role" />
                      </div>
                    </div>
                  </div>

                  <table className="w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left">#</th>
                        <th className="py-3 px-4 text-left">Role Name</th>
                        <th className="py-3 px-4 text-left">Skill Set</th>
                        <th className="py-3 px-4 text-left">Total Skills</th>
                        <th className="py-3 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roles.map((role) => (
                        <tr key={role.id} className="border-b">
                          <td className="py-3 px-4">{role.id}</td>
                          <td className="py-3 px-4">{role.name}</td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {role.skillSet.map((skill, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs">
                                  {skill}
                                </span>
                              ))}
                              <span className="px-2 py-1 bg-blue-600 text-white rounded-md text-xs">+5 Others</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{role.totalSkills}</td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center gap-2">
                              <Button variant="outline" size="icon" className="rounded-full text-blue-600">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="rounded-full text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex justify-center mt-4">
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline">1</Button>
                      <Button variant="outline">2</Button>
                      <Button className="bg-blue-600 text-white">3</Button>
                      <Button variant="outline">4</Button>
                      <Button variant="outline">5</Button>
                      <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Skill Based Content */}
          <TabsContent value="skill-based" className="mt-0">
            <Tabs value={skillBasedTab} onValueChange={setSkillBasedTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3 rounded-none border-b bg-white h-14">
                <TabsTrigger
                  value="assessment"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none h-full"
                >
                  Assessment
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none h-full"
                >
                  Skills
                </TabsTrigger>
                <TabsTrigger
                  value="questionbank"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none h-full"
                >
                  Questionbank
                </TabsTrigger>
              </TabsList>

              {/* Assessment Tab Content */}
              <TabsContent value="assessment" className="mt-0">
                <div className="flex justify-between items-center p-4 bg-white">
                  <div></div>
                  <div className="flex gap-3">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => setCreateSkillAssessmentOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Create Assessment
                    </Button>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input className="pl-10 bg-white w-[300px]" placeholder="Search Assessment" />
                    </div>
                  </div>
                </div>

                {/* Assessment Cards */}
                <div className="p-4 space-y-4">
                  {assessments.map((assessment) => (
                    <div key={assessment.id} className="bg-white rounded-lg border p-4">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{assessment.title}</h3>
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-medium ${
                                assessment.difficulty === "Expert"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {assessment.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{assessment.company}</p>
                          <p className="text-xs text-gray-500">
                            By {assessment.author} · {assessment.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-lg font-semibold">
                              {assessment.duration}
                              <span className="text-xs text-gray-500">min</span>
                            </div>
                            <div className="text-xs text-gray-500">Duration</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{assessment.totalQuestions}</div>
                            <div className="text-xs text-gray-500">Total Questions</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{assessment.mcq}</div>
                            <div className="text-xs text-gray-500">MCQ</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{assessment.coding}</div>
                            <div className="text-xs text-gray-500">Coding</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold">{assessment.other}</div>
                            <div className="text-xs text-gray-500">Other</div>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Action <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Skills Tab Content */}
              <TabsContent value="skills" className="mt-0">
                <div className="flex justify-between items-center p-4 bg-white">
                  <div></div>
                  <div className="flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCreateSkillOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" /> Create Skill
                    </Button>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input className="pl-10 bg-white w-[300px]" placeholder="Search Role" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4">
                  <table className="w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left">#</th>
                        <th className="py-3 px-4 text-left">Skill</th>
                        <th className="py-3 px-4 text-left">Difficulty</th>
                        <th className="py-3 px-4 text-left">Questionbank</th>
                        <th className="py-3 px-4 text-left">Parent Skill</th>
                        <th className="py-3 px-4 text-left">Total Question</th>
                        <th className="py-3 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skills.map((skill) => (
                        <tr key={skill.id} className="border-b">
                          <td className="py-3 px-4">{skill.id}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{skill.icon}</span>
                              {skill.name}
                            </div>
                          </td>
                          <td className="py-3 px-4">{skill.difficulty}</td>
                          <td className="py-3 px-4">{skill.questionbank}</td>
                          <td className="py-3 px-4">{skill.parentSkill}</td>
                          <td className="py-3 px-4">{skill.totalQuestion}</td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center gap-2">
                              <Button variant="outline" size="icon" className="rounded-full text-blue-600">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="rounded-full text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex justify-center mt-4">
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline">1</Button>
                      <Button variant="outline">2</Button>
                      <Button className="bg-blue-600 text-white">3</Button>
                      <Button variant="outline">4</Button>
                      <Button variant="outline">5</Button>
                      <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Questionbank Tab Content */}
              <TabsContent value="questionbank" className="mt-0">
                <div className="flex">
                  {/* Left Panel - Categories */}
                  <div className="w-1/3 p-4 border-r">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Questionbank</h3>
                      <Button className="bg-blue-600 hover:bg-blue-700">Add Bank</Button>
                    </div>

                    <div className="space-y-2">
                      {questionCategories.map((category, index) => (
                        <div
                          key={index}
                          className={`p-3 border rounded-md flex justify-between items-center ${
                            category.name === "Reasoning" ? "border-blue-600 bg-blue-50" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{category.name}</span>
                            <span className="text-gray-500">({category.count})</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Panel - Questions */}
                  <div className="w-2/3 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Reasoning (5)</h3>
                      <div className="flex gap-2">
                        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setUploadQuestionOpen(true)}>
                          Import Questions
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">Add Question</Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {reasoningQuestions.map((question) => (
                        <div key={question.id} className="border rounded-md overflow-hidden">
                          <div className="p-3 flex justify-between items-center border-b">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{question.id}</span>
                              <span>{question.text}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  setExpandedQuestion(expandedQuestion === question.id ? null : question.id)
                                }
                              >
                                {expandedQuestion === question.id ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {expandedQuestion === question.id && (
                            <div className="p-4 bg-gray-50">
                              <RadioGroup defaultValue="option-1">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex items-center space-x-2 border bg-white rounded-md p-3">
                                    <RadioGroupItem value="option-1" id="option-1" checked />
                                    <Label htmlFor="option-1">Django</Label>
                                  </div>
                                  <div className="flex items-center space-x-2 border bg-white rounded-md p-3">
                                    <RadioGroupItem value="option-2" id="option-2" />
                                    <Label htmlFor="option-2">Django</Label>
                                  </div>
                                  <div className="flex items-center space-x-2 border bg-white rounded-md p-3">
                                    <RadioGroupItem value="option-3" id="option-3" />
                                    <Label htmlFor="option-3">Django</Label>
                                  </div>
                                  <div className="flex items-center space-x-2 border bg-white rounded-md p-3">
                                    <RadioGroupItem value="option-4" id="option-4" />
                                    <Label htmlFor="option-4">Django</Label>
                                  </div>
                                </div>
                              </RadioGroup>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Skill Modal */}
      <Dialog open={createSkillOpen} onOpenChange={setCreateSkillOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex justify-between items-center">
              Create Skill
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCreateSkillOpen(false)}
                className="h-6 w-6 rounded-full text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input placeholder="Enter Skill Name" className="w-full" />

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Import Question Via Questionbank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Parent Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <div className="text-blue-600 mb-2">
                  <Upload className="h-8 w-8" />
                </div>
                <p className="text-sm font-medium">Upload Logo</p>
                <p className="text-xs text-gray-500">Drag or Drop</p>
              </div>
              <div className="bg-blue-600 rounded-md p-4 flex items-center justify-center relative">
                <img src="/placeholder.svg?height=80&width=80" alt="Python Logo" className="h-16 w-16" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white text-gray-700"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCreateSkillOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Role Modal */}
      <Dialog open={createRoleOpen} onOpenChange={setCreateRoleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex justify-between items-center">
              Create Subscription
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCreateRoleOpen(false)}
                className="h-6 w-6 rounded-full text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input placeholder="Name" className="w-full" />

            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700 h-10 w-10 p-0">
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <div key={skill} className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1">
                  <span className="text-sm">{skill}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 rounded-full bg-red-500 text-white p-0"
                    onClick={() => removeSkill(skill)}
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCreateRoleOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Question List Modal */}
      <Dialog open={uploadQuestionOpen} onOpenChange={setUploadQuestionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex justify-between items-center">
              Upload Question List
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setUploadQuestionOpen(false)}
                className="h-6 w-6 rounded-full text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center">
              <div className="text-blue-600 mb-2">
                <Upload className="h-10 w-10" />
              </div>
              <p className="text-base font-medium">Upload only CSV file</p>
              <p className="text-sm text-gray-500">Drag or Drop</p>
            </div>
            <div className="text-center mt-4">
              <Button variant="link" className="text-blue-600">
                Download sample file
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 w-full">Upload</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Skill Based Assessment Modal */}
      <Dialog open={createSkillAssessmentOpen} onOpenChange={setCreateSkillAssessmentOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Create Skill Based Assessment</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Input placeholder="Enter Assessment Name" className="w-full" />

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="20">20 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="60">60 min</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <span className="font-medium">HTML - Questions</span>
                    <span className="text-gray-500">Coding (5)</span>
                    <span className="text-gray-500">MCQ (5)</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-green-600 hover:bg-green-700">Import Questions</Button>
                  <Button className="bg-green-600 hover:bg-green-700">Add Question</Button>
                </div>
              </div>

              <div className="space-y-2">
                {reasoningQuestions.map((question) => (
                  <div key={question.id} className="border rounded-md p-3 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{question.id}</span>
                        <span>{question.text}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                        >
                          {expandedQuestion === question.id ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {expandedQuestion === question.id && (
                      <div className="mt-4">
                        <RadioGroup defaultValue="option-1">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2 border bg-white rounded-md p-3">
                              <RadioGroupItem value="option-1" id={`q${question.id}-option-1`} checked />
                              <Label htmlFor={`q${question.id}-option-1`}>Django</Label>
                            </div>
                            <div className="flex items-center space-x-2 border bg-white rounded-md p-3">
                              <RadioGroupItem value="option-2" id={`q${question.id}-option-2`} />
                              <Label htmlFor={`q${question.id}-option-2`}>Django</Label>
                            </div>
                            <div className="flex items-center space-x-2 border bg-white rounded-md p-3">
                              <RadioGroupItem value="option-3" id={`q${question.id}-option-3`} />
                              <Label htmlFor={`q${question.id}-option-3`}>Django</Label>
                            </div>
                            <div className="flex items-center space-x-2 border bg-white rounded-md p-3">
                              <RadioGroupItem value="option-4" id={`q${question.id}-option-4`} />
                              <Label htmlFor={`q${question.id}-option-4`}>Django</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCreateSkillAssessmentOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Create Assessment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Role Based Assessment Modal */}
      <Dialog open={createRoleAssessmentOpen} onOpenChange={setCreateRoleAssessmentOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Create Role Based Assessment</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Input placeholder="Enter Assessment Name" className="w-full" />

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software-engineer">Software Engineer</SelectItem>
                  <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                  <SelectItem value="backend-developer">Backend Developer</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="20">20 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="60">60 min</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Software Engineer</h3>
                  <Button className="bg-green-600 hover:bg-green-700">Add Skill</Button>
                </div>

                <div className="space-y-2">
                  {["Python", "SQL", "CSS", "Javascript", "React"].map((skill, index) => (
                    <div key={index} className="border rounded-md p-3 flex justify-between items-center">
                      <span>{skill} (5)</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium">Reasoning (5)</h3>
                  <div className="flex gap-2">
                    <Button className="bg-green-600 hover:bg-green-700">Import Questions</Button>
                    <Button className="bg-green-600 hover:bg-green-700">Add Question</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {reasoningQuestions.map((question) => (
                    <div key={question.id} className="border rounded-md p-3 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{question.id}</span>
                          <span>{question.text}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                          >
                            {expandedQuestion === question.id ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {expandedQuestion === question.id && (
                        <div className="mt-4">
                          <RadioGroup defaultValue="option-1">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2 border bg-white rounded-md p-3">
                                <RadioGroupItem value="option-1" id={`q${question.id}-option-1`} checked />
                                <Label htmlFor={`q${question.id}-option-1`}>Django</Label>
                              </div>
                              <div className="flex items-center space-x-2 border bg-white rounded-md p-3">
                                <RadioGroupItem value="option-2" id={`q${question.id}-option-2`} />
                                <Label htmlFor={`q${question.id}-option-2`}>Django</Label>
                              </div>
                              <div className="flex items-center space-x-2 border bg-white rounded-md p-3">
                                <RadioGroupItem value="option-3" id={`q${question.id}-option-3`} />
                                <Label htmlFor={`q${question.id}-option-3`}>Django</Label>
                              </div>
                              <div className="flex items-center space-x-2 border bg-white rounded-md p-3">
                                <RadioGroupItem value="option-4" id={`q${question.id}-option-4`} />
                                <Label htmlFor={`q${question.id}-option-4`}>Django</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCreateRoleAssessmentOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Create Assessment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransition>
  )
}
