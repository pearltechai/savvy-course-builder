
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SubTopic } from './CourseOutline';
import { BookOpen, FileText } from 'lucide-react';
import QuizModal from './QuizModal';
import { useState } from 'react';
import { cn, extractCodeBlocks } from '@/lib/utils';

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
    <Card className="w-full border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
          {courseTitle}
        </div>
        <CardTitle className="text-2xl font-semibold text-gray-900 leading-tight">
          {subtopic.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="prose prose-gray max-w-none">
          {processedContent.map((block, index) => (
            <div key={index} className="mb-6">
              {block.type === 'code' ? (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 overflow-x-auto font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-gray-800">{block.content}</pre>
                </div>
              ) : (
                <p className="text-gray-700 leading-7 text-base mb-4">{block.content}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center my-8">
          <Button 
            onClick={() => setQuizOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200"
          >
            <FileText className="mr-2 h-4 w-4" />
            Take a Quiz on This Topic
          </Button>
        </div>
        
        <Separator className="my-8 bg-gray-200" />
        
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isPreviousDisabled}
            className="px-6 py-2.5 rounded-lg font-medium border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={isNextDisabled}
            className={cn(
              "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200",
              isNextDisabled && "opacity-50 pointer-events-none"
            )}
          >
            <BookOpen className="mr-2 h-4 w-4" />
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
