import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  return (
    <div className={cn('prose prose-sm max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom components for enhanced styling
          h1: ({ children, ...props }) => (
            <h1 {...props} className="text-xl font-bold text-gray-900 mb-4 mt-0 border-b border-gray-200 pb-2">
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 {...props} className="text-lg font-semibold text-gray-800 mb-3 mt-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-400 rounded-full"></span>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 {...props} className="text-base font-medium text-gray-800 mb-2 mt-3">
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p {...props} className="text-gray-700 leading-relaxed mb-3">
              {children}
            </p>
          ),
          strong: ({ children, ...props }) => (
            <strong {...props} className="font-semibold text-gray-900">
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em {...props} className="text-gray-800 italic">
              {children}
            </em>
          ),
          code: ({ children, ...props }) => (
            <code {...props} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">
              {children}
            </code>
          ),
          pre: ({ children, ...props }) => (
            <pre {...props} className="bg-gray-50 p-3 rounded-lg overflow-x-auto border border-gray-200 my-3">
              {children}
            </pre>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote {...props} className="border-l-4 border-blue-200 pl-4 italic text-gray-600 my-3 bg-blue-50 py-2 rounded-r">
              {children}
            </blockquote>
          ),
          ul: ({ children, ...props }) => (
            <ul {...props} className="list-disc pl-6 space-y-1 my-3">
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol {...props} className="list-decimal pl-6 space-y-1 my-3">
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li {...props} className="text-gray-700">
              {children}
            </li>
          ),
          a: ({ children, href, ...props }) => (
            <a 
              href={href} 
              {...props} 
              className="text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700 hover:decoration-blue-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table {...props} className="border-collapse w-full">
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th {...props} className="border border-gray-300 px-3 py-2 bg-gray-50 text-left font-semibold text-gray-700">
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td {...props} className="border border-gray-300 px-3 py-2 text-gray-700">
              {children}
            </td>
          ),
          hr: ({ ...props }) => (
            <hr {...props} className="border-gray-200 my-4" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer; 