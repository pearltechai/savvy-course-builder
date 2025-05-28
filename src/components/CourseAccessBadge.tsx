
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Crown, Gift } from 'lucide-react';
import { usePayments } from '@/hooks/usePayments';

interface CourseAccessBadgeProps {
  courseIndex: number;
  courseId: string;
}

const CourseAccessBadge: React.FC<CourseAccessBadgeProps> = ({ courseIndex, courseId }) => {
  const { payments, courseAccess } = usePayments();
  
  const isFree = courseIndex < 3;
  const isPaid = payments.some(p => p.course_id === courseId && p.status === 'completed');
  
  if (isFree) {
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        <Gift className="w-3 h-3 mr-1" />
        Free
      </Badge>
    );
  }
  
  if (isPaid) {
    return (
      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
        <Crown className="w-3 h-3 mr-1" />
        Purchased
      </Badge>
    );
  }
  
  return (
    <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
      $1
    </Badge>
  );
};

export default CourseAccessBadge;
