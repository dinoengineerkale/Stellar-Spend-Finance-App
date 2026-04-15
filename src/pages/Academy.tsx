"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Beaker, Users, Plus, Calendar, Edit2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useBudget } from "@/context/BudgetContext";

const Academy = () => {
  const { courses, addCourse, updateCourse } = useBudget();
  const [activeYear, setActiveYear] = useState("year-1");
  const [activeSemester, setActiveSemester] = useState("fall");

  const filteredCourses = courses.filter(c => c.year === activeYear && c.semester === activeSemester);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Academy Tracker</h1>
          <p className="text-slate-500">Academic investment & session analysis</p>
        </div>
        <CourseDialog onSave={addCourse} year={activeYear} semester={activeSemester} />
      </div>

      <Tabs defaultValue="year-1" className="w-full" onValueChange={setActiveYear}>
        <TabsList className="grid w-full grid-cols-4 h-12 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl">
          <TabsTrigger value="year-1" className="rounded-xl">Year 1</TabsTrigger>
          <TabsTrigger value="year-2" className="rounded-xl">Year 2</TabsTrigger>
          <TabsTrigger value="year-3" className="rounded-xl">Year 3</TabsTrigger>
          <TabsTrigger value="year-4" className="rounded-xl">Year 4</TabsTrigger>
        </TabsList>

        <Tabs defaultValue="fall" className="w-full mt-6" onValueChange={setActiveSemester}>
          <div className="flex justify-center mb-6">
            <TabsList className="bg-transparent border-b border-slate-200 dark:border-slate-800 rounded-none h-auto p-0 gap-8">
              <TabsTrigger value="fall" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-2 pb-2">Fall Semester</TabsTrigger>
              <TabsTrigger value="winter" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-2 pb-2">Winter Semester</TabsTrigger>
              <TabsTrigger value="summer" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-2 pb-2">Summer Term</TabsTrigger>
            </TabsList>
          </div>

          <div className="space-y-6">
            {filteredCourses.length > 0 ? (
              <div className="grid gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} onEdit={(updates) => updateCourse(course.id, updates)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <BookOpen className="text-slate-400" size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">No courses recorded</h3>
                <p className="text-sm text-slate-500 mt-1">Start tracking your academic ROI for this term.</p>
                <CourseDialog onSave={addCourse} year={activeYear} semester={activeSemester} trigger={
                  <Button variant="outline" className="mt-6 gap-2 rounded-xl"><Plus size={16} /> Add First Course</Button>
                } />
              </div>
            )}
          </div>
        </Tabs>
      </Tabs>
    </div>
  );
};

const CourseCard = ({ course, onEdit }: any) => {
  const totalSessions = course.classesPerWeek * course.weeks;
  const costPerSession = course.totalCost / totalSessions;

  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
      <div className="bg-indigo-600 p-5 text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg"><GraduationCap size={24} /></div>
          <div>
            <h3 className="font-bold text-lg leading-tight">{course.name}</h3>
            <div className="text-[10px] uppercase tracking-widest opacity-80">Academic Investment</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-2xl font-black">${course.totalCost}</div>
          <CourseDialog course={course} onSave={onEdit} trigger={
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20"><Edit2 size={18} /></Button>
          } />
        </div>
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Schedule Details</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm"><Calendar size={16} className="text-indigo-500" /><span className="font-medium">{course.classesPerWeek} classes per week</span></div>
              <div className="flex items-center gap-2 text-sm"><Users size={16} className="text-indigo-500" /><span className="font-medium">{course.weeks} weeks duration</span></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Course Components</div>
            <div className="flex flex-wrap gap-2">
              {course.hasLabs && <Badge className="bg-blue-50 text-blue-700 border-blue-100 gap-1 px-3 py-1 rounded-lg"><Beaker size={12} /> Lab Included</Badge>}
              {course.hasTutorials && <Badge className="bg-purple-50 text-purple-700 border-purple-100 gap-1 px-3 py-1 rounded-lg"><Users size={12} /> Tutorials</Badge>}
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

const CourseDialog = ({ course, onSave, year, semester, trigger }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl"><Plus size={18} /> Add Course</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{course ? 'Edit Course' : 'Add New Course'}</DialogTitle></DialogHeader>
        <form onSubmit={(e: any) => {
          e.preventDefault();
          onSave({
            name: e.target.name.value,
            totalCost: parseFloat(e.target.cost.value),
            classesPerWeek: parseInt(e.target.classes.value),
            weeks: parseInt(e.target.weeks.value),
            hasLabs: e.target.labs.checked,
            hasTutorials: e.target.tutorials.checked,
            year: year || course.year,
            semester: semester || course.semester
          });
          setOpen(false);
        }} className="space-y-4">
          <div className="space-y-2"><Label>Course Name</Label><Input name="name" defaultValue={course?.name} required /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Total Cost ($)</Label><Input name="cost" type="number" defaultValue={course?.totalCost} required /></div>
            <div className="space-y-2"><Label>Weeks</Label><Input name="weeks" type="number" defaultValue={course?.weeks || 12} required /></div>
          </div>
          <div className="space-y-2"><Label>Classes Per Week</Label><Input name="classes" type="number" defaultValue={course?.classesPerWeek || 3} required /></div>
          <div className="flex items-center justify-between">
            <Label>Has Labs</Label>
            <Switch name="labs" defaultChecked={course?.hasLabs} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Has Tutorials</Label>
            <Switch name="tutorials" defaultChecked={course?.hasTutorials} />
          </div>
          <Button type="submit" className="w-full bg-indigo-600">{course ? 'Update Course' : 'Add Course'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Academy;