
// OpenAI service for generating course content using the OpenAI API

interface OpenAICompletionResponse {
  choices: Array<{
    text: string;
    message?: {
      content: string;
    };
  }>;
}

interface CourseGenerationResponse {
  title: string;
  description: string;
  subtopics: Array<{
    title: string;
    description: string;
    content: string;
  }>;
}

export const generateCourseContent = async (topic: string): Promise<CourseGenerationResponse | null> => {
  const apiKey = localStorage.getItem('openai_api_key');
  
  if (!apiKey) {
    throw new Error('OpenAI API key is missing. Please add it in settings.');
  }

  try {
    const prompt = `
      Create a comprehensive educational course about "${topic}". 
      The response should be in JSON format with the following structure:
      {
        "title": "Course title",
        "description": "A brief overview of what the course covers",
        "subtopics": [
          {
            "title": "Subtopic title",
            "description": "A brief description of the subtopic",
            "content": "Detailed content for this subtopic (at least 3-4 paragraphs of informative text)"
          }
        ]
      }
      
      Generate 4-5 logical subtopics that would make sense for this subject.
      Ensure content is educational, accurate, and comprehensive.
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an educational content creator specializing in creating structured courses on various topics. Respond only with the requested JSON structure.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3000
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI API error:', data.error);
      throw new Error(`API Error: ${data.error.message || data.error}`);
    }

    const contentStr = data.choices[0]?.message?.content;
    if (!contentStr) {
      throw new Error('Unexpected API response format');
    }

    // Extract the JSON string from the response
    // Sometimes GPT adds markdown code blocks or extra text
    const jsonMatch = contentStr.match(/```json\s*(\{[\s\S]*\})\s*```/) || 
                     contentStr.match(/(\{[\s\S]*\})/);
    
    const jsonStr = jsonMatch ? jsonMatch[1] : contentStr;
    
    try {
      const parsedResponse = JSON.parse(jsonStr.trim());
      return parsedResponse;
    } catch (e) {
      console.error('Failed to parse JSON from API response:', contentStr);
      throw new Error('Failed to parse content from API response');
    }
  } catch (error) {
    console.error('Error generating course content:', error);
    throw error;
  }
};

export const generateSuggestedQuestions = async (subtopicTitle: string, subtopicContent: string): Promise<string[]> => {
  const apiKey = localStorage.getItem('openai_api_key');
  
  if (!apiKey) {
    // Fall back to mock data if no API key is available
    return ['What are the key aspects of this topic?', 
            'How can I apply this knowledge practically?', 
            'What are common misconceptions about this subject?', 
            'What are the latest developments in this field?'];
  }

  try {
    const prompt = `
      Based on the following subtopic in a course:
      
      Title: ${subtopicTitle}
      Content: ${subtopicContent.substring(0, 1000)}
      
      Generate 4 insightful questions that a student might ask about this topic.
      Return just the questions as a JSON array of strings, without any additional text.
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an educational assistant that generates insightful questions about academic topics. Respond only with a JSON array of questions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI API error:', data.error);
      throw new Error(`API Error: ${data.error.message || data.error}`);
    }

    const contentStr = data.choices[0]?.message?.content;
    if (!contentStr) {
      throw new Error('Unexpected API response format');
    }

    // Extract the JSON array from the response
    const jsonMatch = contentStr.match(/```json\s*(\[[\s\S]*\])\s*```/) || 
                     contentStr.match(/(\[[\s\S]*\])/);
    
    const jsonStr = jsonMatch ? jsonMatch[1] : contentStr;
    
    try {
      const parsedQuestions = JSON.parse(jsonStr.trim());
      return Array.isArray(parsedQuestions) ? parsedQuestions : [
        'What are the key principles of this topic?',
        'How can I apply this knowledge practically?',
        'What are common misconceptions about this subject?',
        'How has this field evolved over time?'
      ];
    } catch (e) {
      console.error('Failed to parse JSON from API response:', contentStr);
      return [
        'What are the key principles of this topic?',
        'How can I apply this knowledge practically?',
        'What are common misconceptions about this subject?',
        'How has this field evolved over time?'
      ];
    }
  } catch (error) {
    console.error('Error generating suggested questions:', error);
    // Return fallback questions
    return [
      'What are the key principles of this topic?',
      'How can I apply this knowledge practically?',
      'What are common misconceptions about this subject?',
      'How has this field evolved over time?'
    ];
  }
};
