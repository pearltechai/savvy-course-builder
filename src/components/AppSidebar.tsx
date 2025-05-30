
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCourses } from '@/hooks/useCourses';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { BookOpen } from 'lucide-react';

interface AppSidebarProps {
  selectedCourseId?: string;
  onCourseSelect: (courseId: string) => void;
}

export function AppSidebar({ selectedCourseId, onCourseSelect }: AppSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { courses, isLoading } = useCourses();

  const handleCourseClick = (course: any) => {
    onCourseSelect(course.id);
    navigate(`/course/${course.id}`, {
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
    });
  };

  if (!user || isLoading) {
    return (
      <Sidebar className="w-64">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>My Courses</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="p-4 text-sm text-gray-500">
                {!user ? 'Sign in to view your courses' : 'Loading courses...'}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar className="w-64">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Courses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {courses.map((course) => (
                <SidebarMenuItem key={course.id}>
                  <SidebarMenuButton
                    onClick={() => handleCourseClick(course)}
                    isActive={selectedCourseId === course.id}
                    className="w-full justify-start"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span className="truncate">{course.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
