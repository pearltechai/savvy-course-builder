import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CourseOutline, { CourseStructure, SubTopic } from '@/components/CourseOutline';
import SubtopicContent from '@/components/SubtopicContent';
import ChatBar from '@/components/ChatBar';
import { getSuggestedQuestions } from '@/utils/mockData';
import { toast } from 'sonner';
import { generateSuggestedQuestions } from '@/services/openaiService';
import { Settings2 } from 'lucide-react';
import ApiKeyModal from '@/components/ApiKeyModal';

const CoursePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseStructure | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<SubTopic | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [answerContent, setAnswerContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

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
    const fetchSuggestedQuestions = async () => {
      if (selectedSubtopic) {
        const apiKey = localStorage.getItem('openai_api_key');
        
        if (apiKey) {
          try {
            // Using OpenAI to generate questions
            const questions = await generateSuggestedQuestions(
              selectedSubtopic.title,
              selectedSubtopic.content
            );
            setSuggestedQuestions(questions);
          } catch (error) {
            console.error('Error generating questions:', error);
            // Fallback to mock questions
            const mockQuestions = getSuggestedQuestions(selectedSubtopic.title);
            setSuggestedQuestions(mockQuestions);
          }
        } else {
          // No API key, use mock data
          const questions = getSuggestedQuestions(selectedSubtopic.title);
          setSuggestedQuestions(questions);
        }
      }
    };
    
    fetchSuggestedQuestions();
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

  const handleAskQuestion = async (question: string) => {
    // Show loading indicator
    setAnswerContent("Thinking...");
    setIsLoading(true);
    
    try {
      const apiKey = localStorage.getItem('openai_api_key');
      
      if (apiKey) {
        // Use OpenAI for generating an answer
        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'gpt-4o',
              messages: [
                {
                  role: 'system',
                  content: `You are an educational assistant answering questions about ${selectedSubtopic?.title}. 
                  Provide accurate, educational responses.`
                },
                {
                  role: 'user',
                  content: `Based on this topic: ${selectedSubtopic?.title}
                  
                  With this content: ${selectedSubtopic?.content.substring(0, 1000)}
                  
                  Please answer this question: ${question}`
                }
              ],
              temperature: 0.7,
              max_tokens: 800
            })
          });
          
          const data = await response.json();
          
          if (data.error) {
            throw new Error(`API Error: ${data.error.message || data.error}`);
          }
          
          const answer = data.choices[0]?.message?.content || "Sorry, I couldn't generate an answer.";
          setAnswerContent(answer);
        } catch (error: any) {
          console.error('OpenAI API error:', error);
          // Fall back to mock answer
          setAnswerContent(generateMockAnswer(question, selectedSubtopic?.title || ""));
        }
      } else {
        // No API key, use mock answer
        setTimeout(() => {
          const answer = generateMockAnswer(question, selectedSubtopic?.title || "");
          setAnswerContent(answer);
        }, 1000);
      }
    } catch (error) {
      console.error('Error generating answer:', error);
      setAnswerContent("Sorry, an error occurred while generating the answer. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function to generate answers (fallback)
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
        <div className="flex justify-between mb-6 items-center">
          <Button variant="ghost" onClick={() => navigate('/')}>
            ← Back to Home
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsApiKeyModalOpen(true)}
            title="OpenAI API Settings"
          >
            <Settings2 className="h-5 w-5" />
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
                      {isLoading ? (
                        <p className="text-muted-foreground">Generating answer...</p>
                      ) : (
                        <p>{answerContent}</p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        <ApiKeyModal 
          isOpen={isApiKeyModalOpen} 
          onClose={() => setIsApiKeyModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default CoursePage;
