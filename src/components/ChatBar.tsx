
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChatBarProps {
  subtopicTitle: string;
  suggestedQuestions: string[];
  onAskQuestion: (question: string) => void;
}

const ChatBar: React.FC<ChatBarProps> = ({
  subtopicTitle,
  suggestedQuestions,
  onAskQuestion,
}) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    onAskQuestion(question);
    setQuestion('');
  };

  return (
    <Card className="w-full border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
        <CardTitle className="text-base sm:text-lg font-medium text-gray-900">
          Ask questions about {subtopicTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Input
            type="text"
            placeholder="Ask a question about this topic..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-grow text-sm sm:text-base h-10 sm:h-11"
          />
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white h-10 sm:h-11 px-4 sm:px-6 text-sm sm:text-base whitespace-nowrap"
          >
            Ask
          </Button>
        </form>
        
        {suggestedQuestions.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-gray-700">Suggested questions:</p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
              {suggestedQuestions.map((q, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-xs sm:text-sm bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200 h-auto py-2 px-3 text-left justify-start whitespace-normal break-words min-h-[2.5rem] sm:min-h-[2.25rem]"
                  onClick={() => onAskQuestion(q)}
                >
                  <span className="line-clamp-2 leading-tight">{q}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatBar;
