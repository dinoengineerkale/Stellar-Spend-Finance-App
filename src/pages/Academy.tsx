"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Beaker, Users } from "lucide-react";

const Academy = () => {
  const courses = [
    { id: '1', name: 'Advanced Economics', totalCost: 900, classesPerWeek: 3, weeks: 12, hasLabs: true, hasTutorials: false },
    { id: '2', name: 'Data Structures', totalCost: 1200, classesPerWeek: 2, weeks: 12, hasLabs: true, hasTutorials: true },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Academy Tracker</h1>
        <p className="text-slate-500">Cost per class session analysis</p>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => {
          const totalSessions = course.classesPerWeek * course.weeks;
          const costPerSession = course.totalCost / totalSessions;

          return (
            <Card key={course.id} className="overflow-hidden">
              <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <GraduationCap size={24} />
                  <h3 className="font-bold text-lg">{course.name}</h3>
                </div>
                <div className="text-2xl font-bold">${course.totalCost}</div>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm text-slate-500 uppercase font-semibold">Schedule</div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-indigo-500" />
                      <span>{course.classesPerWeek} classes/week</span>
                    </div>
                    <div className="text-sm text-slate-600">{course.weeks} weeks total</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-slate-500 uppercase font-semibold">Components</div>
                    <div className="flex flex-wrap gap-2">
                      {course.hasLabs && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center gap-1">
                          <Beaker size={12} /> Labs
                        </span>
                      )}
                      {course.hasTutorials && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full flex items-center gap-1">
                          <Users size={12} /> Tutorials
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                    <div className="text-xs text-slate-500 uppercase mb-1">Cost Per Class</div>
                    <div className="text-3xl font-black text-indigo-600">${costPerSession.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{totalSessions} total sessions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Academy;