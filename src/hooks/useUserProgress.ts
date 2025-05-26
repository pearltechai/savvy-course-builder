
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tables } from '@/integrations/supabase/types';

export type UserProgress = Tables<'user_progress'>;

export const useUserProgress = (courseId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const progressQuery = useQuery({
    queryKey: ['user_progress', user?.id, courseId],
    queryFn: async (): Promise<UserProgress[]> => {
      if (!user) throw new Error('No user logged in');
      
      let query = supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (courseId) {
        query = query.eq('course_id', courseId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const markCompleteMutation = useMutation({
    mutationFn: async ({ courseId, subtopicId }: { courseId: string; subtopicId: string }) => {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          subtopic_id: subtopicId,
        })
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user_progress'] });
    },
  });

  return {
    progress: progressQuery.data || [],
    isLoading: progressQuery.isLoading,
    error: progressQuery.error,
    markComplete: markCompleteMutation.mutate,
    isMarking: markCompleteMutation.isPending,
  };
};
