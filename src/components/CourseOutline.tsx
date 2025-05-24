
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface SubTopic {
  id: string;
  title: string;
  description: string;
  content: string;
}

export interface CourseStructure {
  id: string;
  title: string;
  description: string;
  subtopics: SubTopic[];
}

interface CourseOutlineProps {
  course: CourseStructure;
  onSubtopicSelect: (subtopic: SubTopic) => void;
  selectedSubtopicId: string | null;
}

const CourseOutline: React.FC<CourseOutlineProps> = ({ 
  course, 
  onSubtopicSelect,
  selectedSubtopicId
}) => {
  return (
    <Card className="w-full border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
          {course.title}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1 sm:mt-2">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 px-4 sm:px-6">
        <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-2 sm:mb-3">Course Outline</h3>
        <div className="space-y-1">
          {course.subtopics.map((subtopic, index) => (
            <div key={subtopic.id}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-left font-normal h-auto py-2 sm:py-3 px-2 sm:px-3 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                  selectedSubtopicId === subtopic.id
                    ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => onSubtopicSelect(subtopic)}
              >
                <div className="text-xs sm:text-sm leading-relaxed text-left">
                  {index + 1}. {subtopic.title}
                </div>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseOutline;
