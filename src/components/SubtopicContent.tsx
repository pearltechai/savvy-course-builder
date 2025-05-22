
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SubTopic } from './CourseOutline';
import { BookOpen, FileText } from 'lucide-react';
import QuizModal from './QuizModal';
import { useState } from 'react';

interface SubtopicContentProps {
  subtopic: SubTopic;
  courseTitle: string;
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const SubtopicContent: React.FC<SubtopicContentProps> = ({
  subtopic,
  courseTitle,
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  const contentParagraphs = subtopic.content.split('\n').filter(line => line.trim() !== '');
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="text-sm text-muted-foreground">{courseTitle}</div>
        <CardTitle className="text-2xl font-bold">{subtopic.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          {contentParagraphs.map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        <div className="flex justify-center my-6">
          <Button 
            onClick={() => setQuizOpen(true)}
            className="bg-education-primary hover:bg-blue-600"
          >
            <FileText className="mr-2" />
            Take a Quiz on This Topic
          </Button>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isPreviousDisabled}
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={isNextDisabled}
            className="bg-education-primary hover:bg-blue-600"
          >
            <BookOpen className="mr-2" />
            Next
          </Button>
        </div>
        
        {/* Quiz Modal */}
        <QuizModal 
          isOpen={quizOpen} 
          onClose={() => setQuizOpen(false)} 
          subtopic={subtopic}
        />
      </CardContent>
    </Card>
  );
};

export default SubtopicContent;
