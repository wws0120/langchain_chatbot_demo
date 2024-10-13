import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  createStreamDataTransformer,
} from 'ai';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { HttpResponseOutputParser } from 'langchain/output_parsers';

import { JSONLoader } from 'langchain/document_loaders/fs/json';
import { RunnableSequence } from '@langchain/core/runnables';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import path from 'path';

const loader = new JSONLoader(
  path.join(process.cwd(), 'src', 'data', 'data.json')
);

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `Answer the user's questions based only on the following context about a coffee shop menu. Pay special attention to item names, prices (in HKD), and sizes (in oz). Always distinguish between price and size. If the answer is not in the context, reply politely that you do not have that information available.:
==============================
Context: {context}
==============================
Current conversation: {chat_history}

user: {question}
assistant:`;

export async function POST(req: Request) {
  try {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json();

    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);

    const currentMessageContent = messages[messages.length - 1].content;

    const docs = await loader.load();

    // Use CharacterTextSplitter to chunk the documents
    const textSplitter = new CharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    // Split the loaded documents into smaller chunks
    const splitDocs = await textSplitter.splitDocuments(docs);

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOpenAI({
      modelName: 'glm-4-plus', //'glm-4-flash',
      openAIApiKey: process.env.GLM_API_KEY!,
      configuration: {
        basePath: 'https://open.bigmodel.cn/api/paas/v4/',
      },
      maxTokens: 4000,
    });

    /**
     * Chat models stream message chunks rather than bytes, so this
     * output parser handles serialization and encoding.
     */
    const parser = new HttpResponseOutputParser();

    // Format the split documents as a string and limit the size for the model
    const formattedDocs = splitDocs.map((doc) => {
      return doc.pageContent.replace(/"price":/g, 'Price (HKD):');
    });

    const chain = RunnableSequence.from([
      {
        question: (input) => input.question,
        chat_history: (input) => input.chat_history,
        context: () => formattedDocs,
      },
      prompt,
      model,
      parser,
    ]);

    // Convert the response into a friendly text-stream
    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join('\n'),
      question: currentMessageContent,
    });

    // Respond with the stream
    return new StreamingTextResponse(
      stream.pipeThrough(createStreamDataTransformer())
    );
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
