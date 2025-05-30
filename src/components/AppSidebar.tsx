
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCourses } from '@/hooks/useCourses';
import { useUserProgress } from '@/hooks/useUserProgress';
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BookOpen, ChevronRight, Circle, CheckCircle2 } from 'lucide-react';

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { courses, isLoading } = useCourses();
  const { progress } = useUserProgress();

  const isSubtopicCompleted = (courseId: string, subtopicId: string) => {
    return progress.some(p => p.course_id === courseId && p.subtopic_id === subtopicId);
  };

  const handleCourseClick = (course: any) => {
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

  const handleSubtopicClick = (course: any, subtopicId: string) => {
    navigate(`/course/${course.id}?subtopic=${subtopicId}`, {
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
        },
        selectedSubtopicId: subtopicId
      }
    });
  };

  if (!user || isLoading) {
    return (
      <Sidebar>
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Courses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {courses.map((course) => (
                <Collapsible key={course.id} defaultOpen>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full">
                        <BookOpen className="h-4 w-4" />
                        <span className="truncate">{course.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {course.subtopics.map((subtopic, index) => (
                          <SidebarMenuSubItem key={subtopic.id}>
                            <SidebarMenuSubButton
                              onClick={() => handleSubtopicClick(course, subtopic.id)}
                              className="flex items-center gap-2"
                            >
                              {isSubtopicCompleted(course.id, subtopic.id) ? (
                                <CheckCircle2 className="h-3 w-3 text-green-600" />
                              ) : (
                                <Circle className="h-3 w-3 text-gray-400" />
                              )}
                              <span className="truncate">{index + 1}. {subtopic.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
