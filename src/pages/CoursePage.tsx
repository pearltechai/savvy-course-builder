
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CourseOutline, { CourseStructure, SubTopic } from '@/components/CourseOutline';
import SubtopicContent from '@/components/SubtopicContent';
import ChatBar from '@/components/ChatBar';
import { getSuggestedQuestions } from '@/utils/mockData';
import { toast } from 'sonner';

const CoursePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseStructure | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<SubTopic | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [answerContent, setAnswerContent] = useState<string | null>(null);

  // Load course data
  useEffect(() => {
    // Check if course data was passed via location state
    if (location.state && location.state.course) {
      setCourse(location.state.course);
      // Select the first subtopic by default
      if (location.state.course.subtopics.length > 0) {
        setSelectedSubtopic(location.state.course.subtopics[0]);
      }
    } else {
      // In a real app, we would fetch course data from an API
      // For now, just redirect back to home
      toast.error('Course not found');
      navigate('/');
    }
  }, [location.state, navigate]);

  // Update suggested questions when a subtopic is selected
  useEffect(() => {
    if (selectedSubtopic) {
      const questions = getSuggestedQuestions(selectedSubtopic.title);
      setSuggestedQuestions(questions);
    }
  }, [selectedSubtopic]);

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading course...</p>
      </div>
    );
  }

  const handleSubtopicSelect = (subtopic: SubTopic) => {
    setSelectedSubtopic(subtopic);
    setAnswerContent(null); // Clear any previous answers
  };

  const handlePreviousSubtopic = () => {
    if (!selectedSubtopic || !course) return;
    
    const currentIndex = course.subtopics.findIndex(s => s.id === selectedSubtopic.id);
    if (currentIndex > 0) {
      setSelectedSubtopic(course.subtopics[currentIndex - 1]);
      setAnswerContent(null);
    }
  };

  const handleNextSubtopic = () => {
    if (!selectedSubtopic || !course) return;
    
    const currentIndex = course.subtopics.findIndex(s => s.id === selectedSubtopic.id);
    if (currentIndex < course.subtopics.length - 1) {
      setSelectedSubtopic(course.subtopics[currentIndex + 1]);
      setAnswerContent(null);
    }
  };

  const handleAskQuestion = (question: string) => {
    // Simulate AI response generation
    toast.info(`Generating answer for: ${question}...`);
    
    // Show loading indicator
    setAnswerContent("Thinking...");
    
    // Simulate API call delay
    setTimeout(() => {
      const answer = generateMockAnswer(question, selectedSubtopic?.title || "");
      setAnswerContent(answer);
    }, 1000);
  };

  // Mock function to generate answers
  const generateMockAnswer = (question: string, subtopicTitle: string): string => {
    const responses = [
      `The question about ${question} related to ${subtopicTitle} is an interesting one. In this context, we should consider multiple perspectives. First, the fundamental principles suggest that this involves a complex interplay of factors. Research has shown that there are several key aspects to consider, including historical precedents, theoretical frameworks, and practical applications. Experts generally agree that while there's no one-size-fits-all answer, the most effective approach depends on specific circumstances and objectives.`,
      `Regarding ${question} in the context of ${subtopicTitle}, it's important to understand the underlying concepts. This topic has evolved significantly over time, with various schools of thought contributing different perspectives. Modern understanding synthesizes these views, recognizing that contextual factors play a crucial role. While debates continue in some areas, there's consensus on the core principles that form the foundation of this subject. Recent advancements have further refined our understanding, though some questions remain open for further research.`,
      `When we examine ${question} in ${subtopicTitle}, we find that it represents a critical aspect of the broader discipline. Historical developments have shaped current practices, with notable contributions from key figures in the field. The practical implications are significant across various domains, including real-world applications and theoretical research. Current trends suggest growing interest in innovative approaches, though traditional methods retain value in specific contexts. The integration of new technologies has opened additional avenues for exploration and implementation.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const currentIndex = selectedSubtopic 
    ? course.subtopics.findIndex(s => s.id === selectedSubtopic.id)
    : -1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/')}>
            ← Back to Home
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Course Outline */}
          <div className="lg:col-span-1">
            <CourseOutline 
              course={course}
              onSubtopicSelect={handleSubtopicSelect}
              selectedSubtopicId={selectedSubtopic?.id || null}
            />
          </div>
          
          {/* Right Column: Content */}
          <div className="lg:col-span-2 space-y-6">
            {selectedSubtopic && (
              <>
                {/* Subtopic Content */}
                <SubtopicContent
                  subtopic={selectedSubtopic}
                  courseTitle={course.title}
                  onPrevious={handlePreviousSubtopic}
                  onNext={handleNextSubtopic}
                  isPreviousDisabled={currentIndex <= 0}
                  isNextDisabled={currentIndex >= course.subtopics.length - 1}
                />
                
                {/* Chat Bar */}
                <ChatBar
                  subtopicTitle={selectedSubtopic.title}
                  suggestedQuestions={suggestedQuestions}
                  onAskQuestion={handleAskQuestion}
                />
                
                {/* Answer Display */}
                {answerContent && (
                  <div className="bg-white rounded-lg border p-6 animate-fade-in">
                    <h3 className="font-medium text-lg mb-2">Answer:</h3>
                    <div className="prose max-w-none">
                      <p>{answerContent}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
