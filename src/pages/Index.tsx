
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import SampleTopics from '@/components/SampleTopics';
import CourseCard from '@/components/CourseCard';
import { generateMockCourse } from '@/utils/mockData';
import { CourseStructure } from '@/components/CourseOutline';

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [recentCourses, setRecentCourses] = useState<CourseStructure[]>([]);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      try {
        const newCourse = generateMockCourse(query);
        
        // Add the new course to recent courses
        setRecentCourses(prev => [newCourse, ...prev.slice(0, 3)]);
        
        // Navigate to the course page
        navigate(`/course/${newCourse.id}`, { state: { course: newCourse } });
        
        toast.success(`Course on "${query}" generated successfully!`);
      } catch (error) {
        console.error('Error generating course:', error);
        toast.error('Failed to generate course. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Search Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            What would you like to learn today?
          </h2>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          
          <SampleTopics onTopicSelect={handleSearch} />
        </div>

        {/* Recent Courses Section */}
        {recentCourses.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Your Recent Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  subtopicsCount={course.subtopics.length}
                  onClick={() => navigate(`/course/${course.id}`, { state: { course } })}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
