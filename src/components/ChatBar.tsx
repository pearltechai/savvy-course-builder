
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Ask questions about {subtopicTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask a question about this topic..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="bg-education-primary hover:bg-blue-600">
            Ask
          </Button>
        </form>
        
        {suggestedQuestions.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-sm bg-gray-50 hover:bg-gray-100 text-gray-800"
                  onClick={() => onAskQuestion(q)}
                >
                  {q}
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
