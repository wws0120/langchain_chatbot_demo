'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: 'api/chatbox',
    onError: (e) => {
      console.log(e);
    },
  });
  const chatParent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  return (
    <main className="flex flex-col w-full h-[calc(100vh-3.5rem)] max-h-dvh bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <header className="p-4 border-b border-blue-200 dark:border-gray-700 w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Aroma Voyage Chatbot
        </h1>
      </header>

      <section className="container px-4 flex-grow mx-auto max-w-3xl overflow-hidden flex flex-col">
        <ul
          ref={chatParent}
          className="flex-grow p-4 rounded-lg overflow-y-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-blue-300 dark:scrollbar-thumb-blue-700 scrollbar-track-blue-100 dark:scrollbar-track-gray-800"
        >
          {messages.map((m, index) => (
            <div key={index}>
              {m.role === 'user' ? (
                <li key={m.id} className="flex flex-row justify-end">
                  <div className="rounded-2xl px-4 py-2 bg-blue-500 text-white shadow-md max-w-[80%]">
                    <p>{m.content}</p>
                  </div>
                </li>
              ) : (
                <li key={m.id} className="flex flex-row justify-start">
                  <div className="rounded-2xl px-4 py-2 bg-white dark:bg-gray-700 shadow-md max-w-[80%]">
                    <p className="text-gray-800 dark:text-gray-200">
                      {m.content}
                    </p>
                  </div>
                </li>
              )}
            </div>
          ))}
        </ul>
      </section>

      <section className="p-4 border-t border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-3xl mx-auto items-center"
        >
          <Input
            className="flex-1 min-h-[50px] bg-blue-50 dark:bg-gray-700 border-blue-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 rounded-l-full"
            placeholder="Type your question here..."
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <Button
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full h-[50px] w-[50px] flex items-center justify-center"
            type="submit"
          >
            <Send size={20} />
          </Button>
        </form>
      </section>
    </main>
  );
}
