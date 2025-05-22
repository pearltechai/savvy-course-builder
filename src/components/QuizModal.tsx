
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SubTopic } from './CourseOutline';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { generateQuizQuestions } from '@/services/openaiService';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  subtopic: SubTopic;
}

const mockQuizQuestions = (subtopicTitle: string): QuizQuestion[] => {
  // Generate generic quiz questions based on the subtopic title
  return [
    {
      question: `What is a key concept related to ${subtopicTitle}?`,
      options: [
        `The fundamental principles of ${subtopicTitle}`,
        `The history of developments in ${subtopicTitle}`,
        `The application of ${subtopicTitle} in modern contexts`,
        `The theoretical framework of ${subtopicTitle}`
      ],
      correctAnswer: 0
    },
    {
      question: `Which of the following is true about ${subtopicTitle}?`,
      options: [
        `It originated in ancient Greece`,
        `It was first documented in the 18th century`,
        `It is considered a foundational concept in the field`,
        `It was discovered by accident`
      ],
      correctAnswer: 2
    },
    {
      question: `How does ${subtopicTitle} impact related fields?`,
      options: [
        `It has minimal impact on other domains`,
        `It provides foundational methodologies for many related disciplines`,
        `Its influence is limited to theoretical applications`,
        `It is primarily used in historical contexts`
      ],
      correctAnswer: 1
    }
  ];
};

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, subtopic }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Reset quiz state when modal opens
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setScore(0);
      setQuizCompleted(false);
      setIsLoading(true);
      
      const fetchQuestions = async () => {
        try {
          const apiKey = localStorage.getItem('openai_api_key');
          
          if (apiKey) {
            try {
              // Try to generate questions using OpenAI
              const generatedQuestions = await generateQuizQuestions(subtopic.title, subtopic.content);
              setQuestions(generatedQuestions);
            } catch (error) {
              console.error("Error generating quiz questions:", error);
              // Fall back to mock questions
              setQuestions(mockQuizQuestions(subtopic.title));
            }
          } else {
            // No API key, use mock questions
            setQuestions(mockQuizQuestions(subtopic.title));
          }
        } catch (error) {
          console.error("Failed to set up quiz:", error);
          setQuestions(mockQuizQuestions(subtopic.title));
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchQuestions();
    }
  }, [isOpen, subtopic]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct and update score
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast.success("Correct answer!");
    } else {
      toast.error(`Incorrect. The correct answer was: ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`);
    }
    
    // Move to next question or end quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Quiz: {subtopic.title}</DialogTitle>
          <DialogDescription>
            Test your understanding of this topic with a short quiz.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <p>Loading quiz questions...</p>
          </div>
        ) : quizCompleted ? (
          <div className="py-6 text-center">
            <h3 className="text-xl font-bold mb-4">Quiz Completed!</h3>
            <p className="text-lg mb-6">
              Your score: {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
            </p>
            <Button onClick={handleRestartQuiz} className="mr-2">
              Restart Quiz
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : questions.length > 0 ? (
          <div className="py-4">
            <Card className="p-4 mb-4">
              <p className="text-lg font-medium mb-6">
                Question {currentQuestion + 1} of {questions.length}:
              </p>
              <p className="mb-4">{questions[currentQuestion].question}</p>
              
              <RadioGroup value={selectedAnswer?.toString()} className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`} 
                      onClick={() => handleAnswerSelect(index)}
                    />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </Card>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center">
            <p>Failed to load quiz questions.</p>
            <Button variant="outline" onClick={onClose} className="mt-4">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
