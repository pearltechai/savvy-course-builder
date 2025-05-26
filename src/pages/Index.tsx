
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/hooks/useCourses';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import SampleTopics from '@/components/SampleTopics';
import UserMenu from '@/components/UserMenu';
import MyCourses from '@/components/MyCourses';
import { CourseStructure } from '@/components/CourseOutline';
import ApiKeyModal from '@/components/ApiKeyModal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings2, Plus, Library } from 'lucide-react';
import { generateCourseContent } from '@/services/openaiService';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { createCourse, isCreating } = useCourses();
  const [isLoading, setIsLoading] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  
  const handleSearch = async (topic: string) => {
    if (!user) {
      toast.error('Please sign in to generate courses.');
      navigate('/auth');
      return;
    }

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
        // Save course to database
        await createCourse({
          title: aiResponse.title || topic,
          description: aiResponse.description || `A comprehensive course about ${topic}`,
          subtopics: aiResponse.subtopics.map(subtopic => ({
            title: subtopic.title,
            description: subtopic.description,
            content: subtopic.content
          }))
        });

        toast.success('Course created and saved!');
        setActiveTab('library');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div></div>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsApiKeyModalOpen(true)}
                  title="OpenAI API Settings"
                  className="text-gray-600 hover:text-gray-900 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Settings2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <UserMenu />
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
        
        {user ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="generate" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Generate Course
              </TabsTrigger>
              <TabsTrigger value="library" className="flex items-center gap-2">
                <Library className="h-4 w-4" />
                My Courses
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate" className="space-y-8">
              <Hero />
              <div className="mt-8 sm:mt-12 lg:mt-16 mb-12 sm:mb-16 lg:mb-20">
                <SearchBar onSearch={handleSearch} isLoading={isLoading || isCreating} />
              </div>
              <SampleTopics onSelectTopic={handleSampleTopicSelect} />
            </TabsContent>
            
            <TabsContent value="library">
              <MyCourses />
            </TabsContent>
          </Tabs>
        ) : (
          <>
            <Hero />
            <div className="mt-8 sm:mt-12 lg:mt-16 mb-12 sm:mb-16 lg:mb-20">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
            <SampleTopics onSelectTopic={handleSampleTopicSelect} />
          </>
        )}
        
        <ApiKeyModal 
          isOpen={isApiKeyModalOpen} 
          onClose={() => setIsApiKeyModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Index;
