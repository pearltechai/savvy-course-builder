
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowRight } from 'lucide-react';

interface SuggestedQuestionsProps {
  subtopicTitle: string;
  courseTitle: string;
  onQuestionSelect: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  subtopicTitle,
  courseTitle,
  onQuestionSelect,
}) => {
  // Generate relevant questions based on the subtopic
  const generateQuestions = (topic: string) => {
    const questions = [
      `What are the key concepts in ${topic}?`,
      `How can I apply ${topic} in real-world scenarios?`,
      `What are common mistakes to avoid with ${topic}?`,
      `What are the best practices for ${topic}?`,
      `How does ${topic} relate to other concepts in ${courseTitle}?`,
    ];
    return questions;
  };

  const suggestedQuestions = generateQuestions(subtopicTitle);

  return (
    <Card className="mt-6 border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg font-semibold text-blue-800">
          <HelpCircle className="mr-2 h-5 w-5" />
          Explore Further
        </CardTitle>
        <p className="text-sm text-blue-600">
          Ask these questions to deepen your understanding
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-between text-left h-auto p-3 text-sm hover:bg-blue-100 text-blue-700"
              onClick={() => onQuestionSelect(question)}
            >
              <span className="flex-1 text-wrap">{question}</span>
              <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedQuestions;
