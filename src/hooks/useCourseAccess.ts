
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useCourseAccess = (courseId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['course-access', user?.id, courseId],
    queryFn: async () => {
      if (!user) return false;
      
      const { data, error } = await supabase.rpc('user_has_course_access', {
        p_user_id: user.id,
        p_course_id: courseId,
      });

      if (error) {
        console.error('Error checking course access:', error);
        return false;
      }
      
      return data;
    },
    enabled: !!user && !!courseId,
  });
};
