
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const usePayments = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const paymentsQuery = useQuery({
    queryKey: ['payments', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('No user logged in');
      
      const { data, error } = await supabase
        .from('user_payments')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createPaymentMutation = useMutation({
    mutationFn: async (courseId: string) => {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { courseId },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data.url) {
        window.open(data.url, '_blank');
      }
    },
    onError: (error: any) => {
      toast.error(`Payment failed: ${error.message}`);
    },
  });

  const checkCourseAccessQuery = useQuery({
    queryKey: ['course-access', user?.id],
    queryFn: async () => {
      if (!user) return { canAccess: false, freeCoursesUsed: 0 };
      
      const { data: courses, error } = await supabase
        .from('courses')
        .select('id')
        .eq('user_id', user.id);

      if (error) throw error;
      
      const freeCoursesUsed = courses.length;
      const canAccess = freeCoursesUsed < 3;
      
      return { canAccess, freeCoursesUsed };
    },
    enabled: !!user,
  });

  return {
    payments: paymentsQuery.data || [],
    isLoading: paymentsQuery.isLoading,
    createPayment: createPaymentMutation.mutate,
    isCreatingPayment: createPaymentMutation.isPending,
    courseAccess: checkCourseAccessQuery.data || { canAccess: false, freeCoursesUsed: 0 },
    isLoadingAccess: checkCourseAccessQuery.isLoading,
  };
};
