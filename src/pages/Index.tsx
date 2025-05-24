
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import SampleTopics from '@/components/SampleTopics';
import { CourseStructure } from '@/components/CourseOutline';
import ApiKeyModal from '@/components/ApiKeyModal';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-react';
import { generateCourseContent } from '@/services/openaiService';

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  
  const handleSearch = async (topic: string) => {
    const apiKey = localStorage.getItem('openai_api_key');
    
    if (!apiKey) {
      toast.error('Please add your OpenAI API key in settings to generate courses.');
      setIsApiKeyModalOpen(true);
      return;
    }

    setIsLoading(true);
    
    try {
      const aiResponse = await generateCourseContent(topic);
      if (aiResponse) {
        // Map the API response to our CourseStructure format
        const course: CourseStructure = {
          id: `course-${Date.now()}`,
          title: aiResponse.title || topic,
          description: aiResponse.description || `A comprehensive course about ${topic}`,
          subtopics: aiResponse.subtopics.map((subtopic, index) => ({
            id: `subtopic-${Date.now()}-${index + 1}`,
            title: subtopic.title,
            description: subtopic.description,
            content: subtopic.content
          }))
        };
        
        navigate(`/course/${course.id}`, { state: { course } });
      } else {
        toast.error('Failed to generate course content. Please try again.');
      }
    } catch (error: any) {
      console.error('Failed to generate content with OpenAI:', error);
      toast.error(`Failed to generate course: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleTopicSelect = (topic: string) => {
    handleSearch(topic);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-end mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsApiKeyModalOpen(true)}
            title="OpenAI API Settings"
          >
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>
        
        <Hero />
        
        <div className="mt-12 mb-16">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        <SampleTopics onSelectTopic={handleSampleTopicSelect} />
        
        <ApiKeyModal 
          isOpen={isApiKeyModalOpen} 
          onClose={() => setIsApiKeyModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Index;
