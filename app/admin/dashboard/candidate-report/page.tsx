"use client"

import { useState } from "react"
import { PageTransition } from "../components/page-transition"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Star } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function CandidateReportPage() {
  const [activeTab, setActiveTab] = useState("result")

  return (
    <PageTransition>
      <div className="p-6">
        {/* Header with candidate info and export button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-gray-200">
              <AvatarImage src="/placeholder-user.jpg" alt="Ruchita Reddy" />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">RR</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Ruchita Reddy</h1>
              <p className="text-gray-500">ruchitareddy@thesmartbridge.com</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">Assessment Report</h2>
            <p className="text-blue-600">Java Backend</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 rounded-none border-b bg-white h-14 mb-6">
            <TabsTrigger
              value="result"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none h-full"
            >
              Result
            </TabsTrigger>
            <TabsTrigger
              value="feedback"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none h-full"
            >
              Feedback
            </TabsTrigger>
            <TabsTrigger
              value="coding-challenges"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none h-full"
            >
              Coding Challenges
            </TabsTrigger>
            <TabsTrigger
              value="mcq-and-others"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none h-full"
            >
              MCQ and others
            </TabsTrigger>
          </TabsList>

          {/* Result Tab Content */}
          <TabsContent value="result" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Assessment Name</h2>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="text-blue-600">Java Backend</span>
                  <span>Date: 20th Sep</span>
                  <span>Time: 11:00AM</span>
                  <span>Duration: 30min</span>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" /> Export Report
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Score Card */}
              <div className="col-span-1">
                <h3 className="text-lg font-semibold mb-4">Score Card</h3>
                <div className="bg-white rounded-lg border p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Coding Challenges</span>
                      <span className="font-semibold">60%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>MCQ and Others</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>MCQ and Others</span>
                      <span className="font-semibold">20%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proctoring */}
              <div className="col-span-1">
                <h3 className="text-lg font-semibold mb-4">Proctoring</h3>
                <div className="bg-white rounded-lg border p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Pasted code</span>
                      <span className="font-semibold">Yes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Leaving tab</span>
                      <span className="font-semibold">4 Times</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>AI face recognition</span>
                      <span className="font-semibold">0 detected</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Circle */}
              <div className="col-span-1">
                <div className="bg-white rounded-lg border p-4 flex flex-col items-center justify-center h-full">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#f0f0f0" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#4ade80"
                        strokeWidth="10"
                        strokeDasharray="283"
                        strokeDashoffset="79"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">72%</span>
                      <span className="text-green-600">Pass</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Overall Score</p>
                </div>
              </div>
            </div>

            {/* Skill Rating */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Skill Rating</h3>
                <Button variant="outline" className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">
                    ✓
                  </span>
                  Mark As Shortlisted
                </Button>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <div className="space-y-6">
                  {[
                    { skill: "C++", level: "Intermediate", rating: 5, color: "bg-green-500" },
                    { skill: "C++", level: "Intermediate", rating: 2, color: "bg-red-500" },
                    { skill: "C++", level: "Intermediate", rating: 3, color: "bg-yellow-500" },
                    { skill: "C++", level: "Intermediate", rating: 3, color: "bg-yellow-500" },
                    { skill: "C++", level: "Intermediate", rating: 5, color: "bg-green-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 2L2 7L12 12L22 7L12 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 17L12 22L22 17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 12L12 17L22 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{item.skill}</span>
                          <span className="text-gray-500">{item.level}</span>
                        </div>
                        <div className="flex gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-2 w-12 rounded-sm ${i < item.rating ? item.color : "bg-gray-200"}`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feedback */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Feedback</h3>
              <div className="space-y-4">
                {["Coding", "Concept Knowledge", "Accuracy"].map((category, index) => (
                  <div key={index} className="bg-white rounded-lg border p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{category}</span>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gray-300" />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Add Comments" className="flex-1" />
                      <Button className="bg-blue-600 hover:bg-blue-700">Submit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Coding Challenges Tab Content */}
          <TabsContent value="coding-challenges" className="mt-0">
            <h2 className="text-xl font-semibold mb-6">Coding Challenges</h2>
            <div className="space-y-6">
              {[
                { title: "Frontend Developer code", level: "Beginner", passed: "3/10", color: "border-l-green-500" },
                { title: "Frontend Developer code", level: "Intermediate", passed: "8/10", color: "border-l-red-500" },
                { title: "Frontend Developer code", level: "Beginner", passed: "5/10", color: "border-l-yellow-500" },
              ].map((challenge, index) => (
                <div key={index} className={`bg-white rounded-lg border ${challenge.color} border-l-4 p-6`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">{challenge.title}</h3>
                      <p className="text-gray-500">{challenge.level} Level</p>
                      <div className="flex gap-2 mt-2 text-sm text-gray-500">
                        <span>Video</span>
                        <span>|</span>
                        <span>HTML</span>
                        <span>|</span>
                        <span>CSS</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Test Cases Passed</span>
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          challenge.passed === "8/10"
                            ? "bg-green-500"
                            : challenge.passed === "5/10"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      >
                        {challenge.passed}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <h3 className="text-lg font-semibold mt-8 mb-4">Skipped Challenges (1)</h3>
              <div className="bg-white rounded-lg border border-l-4 border-l-gray-400 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">Frontend Developer code</h3>
                    <p className="text-gray-500">Beginner Level</p>
                    <div className="flex gap-2 mt-2 text-sm text-gray-500">
                      <span>Video</span>
                      <span>|</span>
                      <span>HTML</span>
                      <span>|</span>
                      <span>CSS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* MCQ and others Tab Content */}
          <TabsContent value="mcq-and-others" className="mt-0">
            <div>
              <h2 className="text-xl font-semibold mb-2">MCQ and others</h2>
              <p className="text-gray-500 mb-6">Beginner Level</p>

              <div className="space-y-6">
                {[
                  {
                    id: 1,
                    question: "What kubectl command can be used to do a deployment update?",
                    answer: "kubectl rollout deploy",
                    status: "Correct",
                  },
                  {
                    id: 2,
                    question: "The FROM keyword in a Dockerfile can appear:",
                    answer: "kubectl rollout deploy",
                    status: "Skipped",
                  },
                  {
                    id: 3,
                    question: "The FROM keyword in a Dockerfile can appear:",
                    answer: "kubectl rollout deploy",
                    status: "Wrong",
                  },
                  {
                    id: 4,
                    question: "What kubectl command can be used to do a deployment update?",
                    answer: "kubectl rollout deploy",
                    status: "Correct",
                  },
                  {
                    id: 5,
                    question: "What kubectl command can be used to do a deployment update?",
                    answer: "kubectl rollout deploy",
                    status: "Correct",
                  },
                  {
                    id: 6,
                    question: "What kubectl command can be used to do a deployment update?",
                    answer: "kubectl rollout deploy",
                    status: "Correct",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg border border-l-4 ${
                      item.status === "Correct"
                        ? "border-l-green-500"
                        : item.status === "Skipped"
                          ? "border-l-gray-400"
                          : "border-l-red-500"
                    } p-6`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="mb-4">
                          <span className="font-medium">{item.id}. </span>
                          {item.question}
                        </p>
                        <div
                          className={`inline-block px-3 py-1 rounded-md text-sm ${
                            item.status === "Correct"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Skipped"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.answer}
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm ${
                          item.status === "Correct"
                            ? "bg-green-100 text-green-800"
                            : item.status === "Skipped"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Feedback Tab Content */}
          <TabsContent value="feedback" className="mt-0">
            <h2 className="text-xl font-semibold mb-6">Feedback</h2>
            <div className="space-y-6">
              {["Coding", "Concept Knowledge", "Accuracy"].map((category, index) => (
                <div key={index} className="bg-white rounded-lg border p-6">
                  <h3 className="font-medium mb-4">{category}</h3>
                  <p className="text-gray-600 text-sm">
                    Work Success with Expert Assessment Creation Services. Tailored, Reliable, Innovative,
                    Results-Driven, and Customized Solutions for Your Unique Needs.
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}
