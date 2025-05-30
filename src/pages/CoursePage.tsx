
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import SubtopicContent from '@/components/SubtopicContent';
import PaymentRequired from '@/components/PaymentRequired';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useCourseAccess } from '@/hooks/useCourseAccess';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const CoursePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user } = useAuth();
  const course = location.state?.course;
  const isTemporary = location.state?.isTemporary;
  const urlParams = new URLSearchParams(location.search);
  const subtopicFromUrl = urlParams.get('subtopic');
  const [selectedSubtopicId, setSelectedSubtopicId] = useState<string | null>(
    location.state?.selectedSubtopicId || subtopicFromUrl || course?.subtopics?.[0]?.id || null
  );

  const { progress, markComplete } = useUserProgress(courseId);
  const { data: hasAccess, isLoading: isCheckingAccess } = useCourseAccess(courseId || '');

  // Check for payment success/cancel in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const paymentStatus = urlParams.get('payment');
    
    if (paymentStatus === 'success') {
      toast.success('Payment successful! You now have access to this course.');
      // Remove payment param from URL
      navigate(location.pathname, { replace: true, state: location.state });
    } else if (paymentStatus === 'canceled') {
      toast.error('Payment was canceled.');
      navigate(location.pathname, { replace: true, state: location.state });
    }
  }, [location.search, location.pathname, location.state, navigate]);

  React.useEffect(() => {
    if (course?.subtopics?.[0] && !selectedSubtopicId) {
      setSelectedSubtopicId(course.subtopics[0].id);
    }
  }, [course, selectedSubtopicId]);

  // Update selected subtopic when URL changes
  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const subtopicFromUrl = urlParams.get('subtopic');
    if (subtopicFromUrl && subtopicFromUrl !== selectedSubtopicId) {
      setSelectedSubtopicId(subtopicFromUrl);
    }
  }, [location.search, selectedSubtopicId]);

  const handleSubtopicComplete = () => {
    if (!user) {
      toast.error('Please sign in to save your progress.');
      return;
    }
    
    if (selectedSubtopicId && courseId && !isTemporary) {
      markComplete(
        { courseId, subtopicId: selectedSubtopicId },
        {
          onSuccess: () => {
            toast.success('Progress saved!');
          },
          onError: (error) => {
            console.error('Failed to mark subtopic as complete:', error);
            toast.error('Failed to save progress');
          }
        }
      );
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // For temporary courses (non-logged in users), skip access check
  if (!isTemporary && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Sign in required</h2>
            <CardDescription className="mb-4">
              You need to sign in to access saved courses and track your progress.
            </CardDescription>
            <div className="space-y-2">
              <Link to="/auth">
                <Button className="w-full">Sign In</Button>
              </Link>
              <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                Generate New Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading while checking access for saved courses
  if (!isTemporary && isCheckingAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Checking course access...</div>
        </div>
      </div>
    );
  }

  // Show payment required if user doesn't have access to saved course
  if (!isTemporary && !hasAccess) {
    return <PaymentRequired courseId={courseId || ''} courseTitle={course.title} />;
  }

  const selectedSubtopic = course.subtopics.find((st: any) => st.id === selectedSubtopicId);
  const currentIndex = course.subtopics.findIndex((st: any) => st.id === selectedSubtopicId);
  const isCompleted = !isTemporary && progress.some(p => p.subtopic_id === selectedSubtopicId);

  const handleNext = () => {
    if (user && !isTemporary) {
      handleSubtopicComplete();
    }
    if (currentIndex < course.subtopics.length - 1) {
      const nextSubtopicId = course.subtopics[currentIndex + 1].id;
      setSelectedSubtopicId(nextSubtopicId);
      navigate(`/course/${courseId}?subtopic=${nextSubtopicId}`, { 
        state: { 
          course,
          isTemporary,
          selectedSubtopicId: nextSubtopicId
        },
        replace: true 
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevSubtopicId = course.subtopics[currentIndex - 1].id;
      setSelectedSubtopicId(prevSubtopicId);
      navigate(`/course/${courseId}?subtopic=${prevSubtopicId}`, { 
        state: { 
          course,
          isTemporary,
          selectedSubtopicId: prevSubtopicId
        },
        replace: true 
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-white">
        {!isTemporary && <AppSidebar />}
        <SidebarInset className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-6xl">
            <div className="mb-6 flex items-center gap-4">
              {!isTemporary && <SidebarTrigger />}
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
            
            {isTemporary && (
              <Card className="mb-4 bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Temporary Course:</strong> This course is not saved. 
                    <Link to="/auth" className="underline ml-1">Sign in</Link> to save your progress and access it later.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              {selectedSubtopic ? (
                <SubtopicContent
                  subtopic={selectedSubtopic}
                  courseTitle={course.title}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  isPreviousDisabled={currentIndex === 0}
                  isNextDisabled={currentIndex === course.subtopics.length - 1}
                />
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">Select a topic to begin learning</p>
                </div>
              )}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CoursePage;
