import React from 'react';
import ReactMarkdown from 'react-markdown';

interface AIResponseProps {
  response: string;
}

export function AIResponse({ response }: AIResponseProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
      <h2 className="text-xl font-semibold text-[#1877F2] mb-4">Results</h2>
      <div className="prose prose-blue max-w-none">
        <ReactMarkdown
          components={{
            // Enhanced table styling
            table: ({ children }) => (
              <div className="my-6 w-full overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full border-collapse table-auto">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-50 border-b border-gray-200">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-gray-200 bg-white">
                {children}
              </tbody>
            ),
            tr: ({ children, isHeader }) => (
              <tr className={`${isHeader ? '' : 'hover:bg-gray-50'}`}>
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-6 py-4 text-sm text-gray-600 whitespace-normal">
                {children}
              </td>
            ),
            // Style blockquotes
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[#1877F2] pl-4 italic text-gray-700 my-4">
                {children}
              </blockquote>
            ),
            // Style code blocks
            code: ({ inline, children }) => (
              inline ? 
                <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono">
                  {children}
                </code> :
                <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm font-mono">{children}</code>
                </pre>
            ),
            // Style headings
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                {children}
              </h3>
            ),
            // Style links
            a: ({ href, children }) => (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:underline"
              >
                {children}
              </a>
            ),
            // Style lists
            ul: ({ children }) => (
              <ul className="list-disc pl-6 space-y-2 my-4">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 space-y-2 my-4">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-600">
                {children}
              </li>
            ),
            // Style paragraphs
            p: ({ children }) => (
              <p className="text-gray-600 my-4 leading-relaxed">
                {children}
              </p>
            ),
          }}
        >
          {response}
        </ReactMarkdown>
      </div>
    </div>
  );
}