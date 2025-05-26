
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SubTopic } from './CourseOutline';
import { BookOpen, FileText, Check } from 'lucide-react';
import QuizModal from './QuizModal';
import { useState } from 'react';
import { cn, extractCodeBlocks } from '@/lib/utils';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useParams } from 'react-router-dom';

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
  const { courseId } = useParams();
  const { progress, markComplete } = useUserProgress(courseId);
  
  const isCompleted = progress.some(p => p.subtopic_id === subtopic.id);

  const handleMarkComplete = () => {
    if (courseId && subtopic.id) {
      markComplete({ courseId, subtopicId: subtopic.id });
    }
  };

  // Process content to identify code blocks and regular paragraphs
  const processedContent = processContent(subtopic.content);

  return (
    <Card className="w-full border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
              {courseTitle}
            </div>
            <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
              {subtopic.title}
            </CardTitle>
          </div>
          {isCompleted && (
            <div className="flex items-center text-green-600">
              <Check className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">Completed</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 px-4 sm:px-6">
        <div className="prose prose-gray max-w-none">
          {processedContent.map((block, index) => (
            <div key={index} className="mb-4 sm:mb-6">
              {block.type === 'code' ? (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm">
                  <pre className="whitespace-pre-wrap text-gray-800">{block.content}</pre>
                </div>
              ) : (
                <p className="text-gray-700 leading-6 sm:leading-7 text-sm sm:text-base mb-3 sm:mb-4">{block.content}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 my-6 sm:my-8">
          <Button 
            onClick={() => setQuizOpen(true)}
            variant="outline"
            className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium border-blue-300 text-blue-700 hover:bg-blue-50 transition-colors duration-200 text-sm sm:text-base"
          >
            <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Take a Quiz on This Topic</span>
            <span className="sm:hidden">Take Quiz</span>
          </Button>
          
          {!isCompleted && (
            <Button 
              onClick={handleMarkComplete}
              className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
            >
              <Check className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Mark as Complete</span>
              <span className="sm:hidden">Complete</span>
            </Button>
          )}
        </div>
        
        <Separator className="my-6 sm:my-8 bg-gray-200" />
        
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-4 sm:mt-6">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isPreviousDisabled}
            className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base order-2 sm:order-1"
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={isNextDisabled}
            className={cn(
              "bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base order-1 sm:order-2",
              isNextDisabled && "opacity-50 pointer-events-none"
            )}
          >
            <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
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
