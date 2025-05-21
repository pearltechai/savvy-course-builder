
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SubTopic } from './CourseOutline';

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
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubtopicContent;
