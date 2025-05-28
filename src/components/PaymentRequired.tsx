
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, CreditCard } from 'lucide-react';
import { usePayments } from '@/hooks/usePayments';

interface PaymentRequiredProps {
  courseId: string;
  courseTitle: string;
}

const PaymentRequired: React.FC<PaymentRequiredProps> = ({ courseId, courseTitle }) => {
  const { createPayment, isCreatingPayment } = usePayments();

  const handlePayment = () => {
    createPayment(courseId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-orange-600" />
          </div>
          <CardTitle className="text-xl">Premium Course</CardTitle>
          <CardDescription>
            You've used your 3 free courses. Unlock "{courseTitle}" for just $1
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">What you get:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Full access to all course content</li>
              <li>• AI tutor chat for personalized help</li>
              <li>• Progress tracking</li>
              <li>• Lifetime access to this course</li>
            </ul>
          </div>
          
          <Button
            onClick={handlePayment}
            disabled={isCreatingPayment}
            className="w-full"
            size="lg"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {isCreatingPayment ? 'Processing...' : 'Pay $1 to Unlock Course'}
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            Secure payment powered by Stripe
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentRequired;
