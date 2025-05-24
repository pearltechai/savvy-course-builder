
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CourseOutline, { CourseStructure, SubTopic } from '@/components/CourseOutline';
import SubtopicContent from '@/components/SubtopicContent';
import ChatBar from '@/components/ChatBar';
import { toast } from 'sonner';
import { generateSuggestedQuestions } from '@/services/openaiService';
import { Settings2, Menu, X } from 'lucide-react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      // No course data available
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
            const questions = await generateSuggestedQuestions(
              selectedSubtopic.title,
              selectedSubtopic.content
            );
            setSuggestedQuestions(questions);
          } catch (error) {
            console.error('Error generating questions:', error);
            setSuggestedQuestions(['No API key available. Please add your OpenAI API key to get suggested questions.']);
          }
        } else {
          setSuggestedQuestions(['Add your OpenAI API key in settings to get AI-generated suggested questions.']);
        }
      }
    };
    
    fetchSuggestedQuestions();
  }, [selectedSubtopic]);

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Loading course...</p>
      </div>
    );
  }

  const handleSubtopicSelect = (subtopic: SubTopic) => {
    setSelectedSubtopic(subtopic);
    setAnswerContent(null); // Clear any previous answers
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
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
    const apiKey = localStorage.getItem('openai_api_key');
    
    if (!apiKey) {
      toast.error('Please add your OpenAI API key in settings to ask questions.');
      setIsApiKeyModalOpen(true);
      return;
    }

    // Show loading indicator
    setAnswerContent("Generating answer...");
    setIsLoading(true);
    
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
      setAnswerContent(`Error generating answer: ${error.message}. Please check your API key and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const currentIndex = selectedSubtopic 
    ? course.subtopics.findIndex(s => s.id === selectedSubtopic.id)
    : -1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-7xl">
        {/* Navigation */}
        <div className="flex justify-between mb-4 sm:mb-8 items-center">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 font-medium text-sm sm:text-base"
            >
              ← <span className="hidden sm:inline">Back to Home</span><span className="sm:hidden">Home</span>
            </Button>
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsApiKeyModalOpen(true)}
            title="OpenAI API Settings"
            className="text-gray-600 hover:text-gray-900 h-8 w-8 sm:h-10 sm:w-10"
          >
            <Settings2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column: Course Outline - Mobile Overlay */}
          <div className={`
            lg:col-span-1 
            ${isSidebarOpen ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto lg:relative lg:bg-transparent lg:p-0' : 'hidden lg:block'}
          `}>
            {isSidebarOpen && (
              <div className="flex justify-end mb-4 lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-600"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            )}
            <CourseOutline 
              course={course}
              onSubtopicSelect={handleSubtopicSelect}
              selectedSubtopicId={selectedSubtopic?.id || null}
            />
          </div>
          
          {/* Right Column: Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
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
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl border-0 shadow-sm p-4 sm:p-6 lg:p-8 animate-fade-in">
                    <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-gray-900">Answer:</h3>
                    <div className="prose prose-gray max-w-none">
                      {isLoading ? (
                        <p className="text-gray-500 text-sm sm:text-base">Generating answer...</p>
                      ) : (
                        <p className="text-gray-700 leading-6 sm:leading-7 text-sm sm:text-base">{answerContent}</p>
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
