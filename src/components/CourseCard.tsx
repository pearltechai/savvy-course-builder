
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  subtopicsCount: number;
  onClick: () => void;
}

const CourseCard = ({ title, description, subtopicsCount, onClick }: CourseCardProps) => {
  return (
    <Card 
      className="course-card hover:translate-y-[-5px] cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-education-primary">{title}</CardTitle>
          <Badge className="bg-education-secondary hover:bg-emerald-600">
            {subtopicsCount} {subtopicsCount === 1 ? 'Topic' : 'Topics'}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-2 bg-education-primary rounded-full w-0"></div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Click to explore</p>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
