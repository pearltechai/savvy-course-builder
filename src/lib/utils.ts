
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to extract code blocks from text content
export function extractCodeBlocks(content: string): { text: string[], code: string[] } {
  const codeBlocks: string[] = [];
  const textBlocks: string[] = [];
  
  // Look for markdown code blocks
  const regex = /```(?:\w+)?\s*([\s\S]*?)\s*```/g;
  
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    // Add text before the code block
    const textBefore = content.substring(lastIndex, match.index).trim();
    if (textBefore) textBlocks.push(textBefore);
    
    // Add the code block
    codeBlocks.push(match[1].trim());
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add any remaining text
  const remainingText = content.substring(lastIndex).trim();
  if (remainingText) textBlocks.push(remainingText);
  
  return { text: textBlocks, code: codeBlocks };
}
