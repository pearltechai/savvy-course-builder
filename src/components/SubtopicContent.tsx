
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SubTopic } from './CourseOutline';
import { BookOpen, FileText } from 'lucide-react';
import QuizModal from './QuizModal';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
  const [quizOpen, setQuizOpen] = useState(false);

  // Process content to identify code blocks and regular paragraphs
  const processedContent = processContent(subtopic.content);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="text-sm text-muted-foreground">{courseTitle}</div>
        <CardTitle className="text-2xl font-bold">{subtopic.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          {processedContent.map((block, index) => (
            <div key={index} className="mb-6">
              {block.type === 'code' ? (
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto font-mono text-sm">
                  <pre className="whitespace-pre-wrap">{block.content}</pre>
                </div>
              ) : (
                <p className="leading-7 text-gray-700 dark:text-gray-300">{block.content}</p>
              )}
            </div>
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
            className={cn(
              "bg-education-primary hover:bg-blue-600",
              isNextDisabled && "opacity-50 pointer-events-none"
            )}
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

// Helper function to process content and identify code blocks
const processContent = (content: string): Array<{type: 'text' | 'code', content: string}> => {
  const blocks: Array<{type: 'text' | 'code', content: string}> = [];
  
  // Split content by code block markers (```), commonly used in markdown
  const parts = content.split(/```([^`]+)```/);
  
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].trim() === '') continue;
    
    // Even indices are regular text, odd indices are code blocks
    if (i % 2 === 0) {
      // Process regular text paragraphs
      const paragraphs = parts[i].split('\n').filter(p => p.trim().length > 0);
      paragraphs.forEach(p => blocks.push({ type: 'text', content: p.trim() }));
    } else {
      // This is a code block
      blocks.push({ type: 'code', content: parts[i].trim() });
    }
  }
  
  return blocks;
};

export default SubtopicContent;
