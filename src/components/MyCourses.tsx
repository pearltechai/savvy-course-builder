
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '@/hooks/useCourses';
import { useUserProgress } from '@/hooks/useUserProgress';
import CourseCard from './CourseCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Trophy } from 'lucide-react';

const MyCourses = () => {
  const navigate = useNavigate();
  const { courses, isLoading } = useCourses();
  const { progress } = useUserProgress();

  const getProgressPercentage = (courseId: string, subtopicsCount: number) => {
    const completedSubtopics = progress.filter(p => p.course_id === courseId).length;
    return Math.round((completedSubtopics / subtopicsCount) * 100);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-600">Loading your courses...</div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <CardTitle className="text-xl mb-2">No courses yet</CardTitle>
          <CardDescription>
            Generate your first course using the search bar above!
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center p-4">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">{courses.length}</p>
              <p className="text-sm text-gray-600">Total Courses</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <Clock className="h-8 w-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">
                {courses.filter(course => getProgressPercentage(course.id, course.subtopics.length) > 0 && getProgressPercentage(course.id, course.subtopics.length) < 100).length}
              </p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-4">
            <Trophy className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold">
                {courses.filter(course => getProgressPercentage(course.id, course.subtopics.length) === 100).length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="relative">
            <CourseCard
              id={course.id}
              title={course.title}
              description={course.description || ''}
              subtopicsCount={course.subtopics.length}
              onClick={() => navigate(`/course/${course.id}`, { 
                state: { 
                  course: {
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    subtopics: course.subtopics.map(st => ({
                      id: st.id,
                      title: st.title,
                      description: st.description,
                      content: st.content
                    }))
                  }
                }
              })}
            />
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage(course.id, course.subtopics.length)}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {getProgressPercentage(course.id, course.subtopics.length)}% complete
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
