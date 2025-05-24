
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
        <CardDescription className="text-base">{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-medium mb-4">Course Outline</h3>
        <div className="space-y-2">
          {course.subtopics.map((subtopic, index) => (
            <div key={subtopic.id}>
              {index > 0 && <Separator className="my-2" />}
              <Button
                variant="ghost"
                className={`w-full justify-start text-left font-normal h-auto py-2 ${
                  selectedSubtopicId === subtopic.id
                    ? 'bg-blue-50 text-education-primary font-medium'
                    : ''
                }`}
                onClick={() => onSubtopicSelect(subtopic)}
              >
                <div className="font-medium">{index + 1}. {subtopic.title}</div>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseOutline;
