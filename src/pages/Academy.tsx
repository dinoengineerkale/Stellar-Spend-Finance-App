"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Beaker, Users, Plus, Calendar, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Academy = () => {
  const [activeYear, setActiveYear] = useState("year-1");
  
  const academicData = {
    "year-1": {
      "fall": [
        { id: '1', name: 'Intro to Economics', totalCost: 850, classesPerWeek: 3, weeks: 12, hasLabs: false, hasTutorials: true },
        { id: '2', name: 'Calculus I', totalCost: 900, classesPerWeek: 4, weeks: 12, hasLabs: true, hasTutorials: true },
      ],
      "winter": [
        { id: '3', name: 'Macroeconomics', totalCost: 850, classesPerWeek: 3, weeks: 12, hasLabs: false, hasTutorials: true },
      ]
    },
    "year-2": {
      "fall": [
        { id: '4', name: 'Advanced Economics', totalCost: 900, classesPerWeek: 3, weeks: 12, hasLabs: true, hasTutorials: false },
        { id: '5', name: 'Data Structures', totalCost: 1200, classesPerWeek: 2, weeks: 12, hasLabs: true, hasTutorials: true },
      ],
      "winter": []
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Academy Tracker</h1>
          <p className="text-slate-500">Academic investment & session analysis</p>
        </div>
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl">
          <Plus size={18} /> Add Course
        </Button>
      </div>

      <Tabs defaultValue="year-1" className="w-full" onValueChange={setActiveYear}>
        <TabsList className="grid w-full grid-cols-4 h-12 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl">
          <TabsTrigger value="year-1" className="rounded-xl">Year 1</TabsTrigger>
          <TabsTrigger value="year-2" className="rounded-xl">Year 2</TabsTrigger>
          <TabsTrigger value="year-3" className="rounded-xl">Year 3</TabsTrigger>
          <TabsTrigger value="year-4" className="rounded-xl">Year 4</TabsTrigger>
        </TabsList>

        {Object.keys(academicData).map((yearKey) => (
          <TabsContent key={yearKey} value={yearKey} className="mt-6 space-y-8">
            <Tabs defaultValue="fall" className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="bg-transparent border-b border-slate-200 dark:border-slate-800 rounded-none h-auto p-0 gap-8">
                  <TabsTrigger value="fall" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-2 pb-2">Fall Semester</TabsTrigger>
                  <TabsTrigger value="winter" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-2 pb-2">Winter Semester</TabsTrigger>
                  <TabsTrigger value="summer" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-2 pb-2">Summer Term</TabsTrigger>
                </TabsList>
              </div>

              {["fall", "winter", "summer"].map((semester) => (
                <TabsContent key={semester} value={semester} className="space-y-6">
                  {/* @ts-ignore */}
                  {academicData[yearKey]?.[semester]?.length > 0 ? (
                    <div className="grid gap-6">
                      {/* @ts-ignore */}
                      {academicData[yearKey][semester].map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                      <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <BookOpen className="text-slate-400" size={24} />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white">No courses recorded</h3>
                      <p className="text-sm text-slate-500 mt-1">Start tracking your academic ROI for this term.</p>
                      <Button variant="outline" className="mt-6 gap-2 rounded-xl">
                        <Plus size={16} /> Add First Course
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const CourseCard = ({ course }: any) => {
  const totalSessions = course.classesPerWeek * course.weeks;
  const costPerSession = course.totalCost / totalSessions;

  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
      <div className="bg-indigo-600 p-5 text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <GraduationCap size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">{course.name}</h3>
            <div className="text-[10px] uppercase tracking-widest opacity-80">Academic Investment</div>
          </div>
        </div>
        <div className="text-2xl font-black">${course.totalCost}</div>
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Schedule Details</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-indigo-500" />
                <span className="font-medium">{course.classesPerWeek} classes per week</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-indigo-500" />
                <span className="font-medium">{course.weeks} weeks duration</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Course Components</div>
            <div className="flex flex-wrap gap-2">
              {course.hasLabs ? (
                <Badge className="bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100 gap-1 px-3 py-1 rounded-lg">
                  <Beaker size={12} /> Lab Included
                </Badge>
              ) : (
                <Badge variant="outline" className="text-slate-400 border-slate-200 px-3 py-1 rounded-lg">No Labs</Badge>
              )}
              {course.hasTutorials && (
                <Badge className="bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100 gap-1 px-3 py-1 rounded-lg">
                  <Users size={12} /> Tutorials
                </Badge>
              )}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl text-center border border-slate-100 dark:border-slate-800 shadow-inner">
            <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Cost Per Session</div>
            <div className="text-3xl font-black text-indigo-600">${costPerSession.toFixed(2)}</div>
            <div className="text-[10px] text-slate-400 mt-1 font-medium">{totalSessions} total sessions</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Academy;