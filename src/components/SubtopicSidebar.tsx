
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProgress } from '@/hooks/useUserProgress';
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
import { Circle, CheckCircle2 } from 'lucide-react';

interface SubtopicSidebarProps {
  course: any;
  selectedSubtopicId?: string;
  onSubtopicSelect: (subtopicId: string) => void;
  isTemporary?: boolean;
}

export function SubtopicSidebar({ 
  course, 
  selectedSubtopicId, 
  onSubtopicSelect,
  isTemporary = false 
}: SubtopicSidebarProps) {
  const navigate = useNavigate();
  const { progress } = useUserProgress(course?.id);

  const isSubtopicCompleted = (subtopicId: string) => {
    return !isTemporary && progress.some(p => p.subtopic_id === subtopicId);
  };

  const handleSubtopicClick = (subtopicId: string) => {
    onSubtopicSelect(subtopicId);
    navigate(`/course/${course.id}?subtopic=${subtopicId}`, {
      state: {
        course,
        isTemporary,
        selectedSubtopicId: subtopicId
      },
      replace: true
    });
  };

  if (!course) {
    return (
      <Sidebar className="w-64">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Subtopics</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="p-4 text-sm text-gray-500">
                Select a course to view subtopics
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
          <SidebarGroupLabel className="truncate" title={course.title}>
            {course.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {course.subtopics?.map((subtopic, index) => (
                <SidebarMenuItem key={subtopic.id}>
                  <SidebarMenuButton
                    onClick={() => handleSubtopicClick(subtopic.id)}
                    isActive={selectedSubtopicId === subtopic.id}
                    className="w-full justify-start gap-2"
                  >
                    {isSubtopicCompleted(subtopic.id) ? (
                      <CheckCircle2 className="h-3 w-3 text-green-600 flex-shrink-0" />
                    ) : (
                      <Circle className="h-3 w-3 text-gray-400 flex-shrink-0" />
                    )}
                    <span className="truncate text-xs">
                      {index + 1}. {subtopic.title}
                    </span>
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
