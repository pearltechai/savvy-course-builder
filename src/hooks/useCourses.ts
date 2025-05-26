
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Course = Tables<'courses'>;
export type Subtopic = Tables<'subtopics'>;
export type CourseWithSubtopics = Course & { subtopics: Subtopic[] };

export const useCourses = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const coursesQuery = useQuery({
    queryKey: ['courses', user?.id],
    queryFn: async (): Promise<CourseWithSubtopics[]> => {
      if (!user) throw new Error('No user logged in');
      
      const { data: courses, error } = await supabase
        .from('courses')
        .select(`
          *,
          subtopics (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return courses as CourseWithSubtopics[];
    },
    enabled: !!user,
  });

  const createCourseMutation = useMutation({
    mutationFn: async (courseData: {
      title: string;
      description: string;
      subtopics: Array<{
        title: string;
        description: string;
        content: string;
      }>;
    }) => {
      if (!user) throw new Error('No user logged in');

      // Create the course
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .insert({
          title: courseData.title,
          description: courseData.description,
          user_id: user.id,
        })
        .select()
        .single();

      if (courseError) throw courseError;

      // Create subtopics
      const subtopicsToInsert = courseData.subtopics.map((subtopic, index) => ({
        course_id: course.id,
        title: subtopic.title,
        description: subtopic.description,
        content: subtopic.content,
        position: index + 1,
      }));

      const { data: subtopics, error: subtopicsError } = await supabase
        .from('subtopics')
        .insert(subtopicsToInsert)
        .select();

      if (subtopicsError) throw subtopicsError;

      return { ...course, subtopics };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  return {
    courses: coursesQuery.data || [],
    isLoading: coursesQuery.isLoading,
    error: coursesQuery.error,
    createCourse: createCourseMutation.mutate,
    isCreating: createCourseMutation.isPending,
  };
};
