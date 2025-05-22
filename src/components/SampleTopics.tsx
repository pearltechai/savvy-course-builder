
import React from 'react';
import { Button } from '@/components/ui/button';

interface SampleTopicsProps {
  onSelectTopic: (topic: string) => void;
}

const SampleTopics: React.FC<SampleTopicsProps> = ({ onSelectTopic }) => {
  const sampleTopics = [
    "Machine Learning",
    "Ancient Rome",
    "Web Development",
    "Quantum Physics",
    "Digital Marketing",
    "Renaissance Art"
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-lg font-medium mb-3 text-center text-muted-foreground">
        Or try one of these topics:
      </h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {sampleTopics.map((topic) => (
          <Button
            key={topic}
            variant="outline"
            onClick={() => onSelectTopic(topic)}
            className="bg-transparent hover:bg-gray-100 text-education-primary border border-education-primary hover:border-education-primary"
          >
            {topic}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SampleTopics;
