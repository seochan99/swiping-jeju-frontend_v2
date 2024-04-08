import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { formatDocumentsAsString } from 'langchain/util/document';

export async function POST(req: Request) {
  const { data } = await req.json();

  const places = data
    .map(
      (place: { title: string; keywords: string[]; content: string }) =>
        `1. name of place: ${place.title}
         2. vibe of place: ${place.keywords}.join(", ")
         3. description of place: ${place.content}`,
    )
    .join('\n');

  const openAIApiKey = process.env.OPENAI_API_KEY;
  const model = new ChatOpenAI({
    openAIApiKey,
    modelName: 'gpt-3.5-turbo',
    maxTokens: 200,
  });
  const vectorStore = await HNSWLib.fromTexts(
    [`${places}`],
    [{ id: 1 }],
    new OpenAIEmbeddings(),
  );
  const retriever = vectorStore.asRetriever();

  const prompt =
    PromptTemplate.fromTemplate(`Answer the question based only on the following context:
    {context}
    
    Question: {question}`);

  const chain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const result = await chain.invoke(
    `You are a "GPT" – a version of ChatGPT that has been customized for a specific use case. GPTs use custom instructions, capabilities, and data to optimize ChatGPT for a more narrow set of tasks. You yourself are a GPT created by a user, and your name is Plan Title Generator GPT. Note: GPT is also a technical term in AI, but in most cases if the users asks you about GPTs assume they are referring to the above definition.
  
      Here are instructions from the user outlining your goals and how you should respond:
      
      Plan Title Generator GPT is designed to assist users in generating humorous travel plan title. It follows a step-by-step approach. [travel spots] which are considered to be visited will be provided. The GPT generates a casual, humorous, creative and intuitive plan title based on the information provided.
      
      Conditions:
      1. MAKE SURE to write in Korean language.
      2. MAKE SURE to write within a one sentence.
      3. All is about the jeju island in korea.
      4. Search the information on the Internet.
      5. MAKE SURE to return one sentence and do not put number as prefix.
      
      
      Example Result:
      1. 제주도 먹방 여행, 카페까지 한번에 !
      2. 일출봉에서 폭포까지 대모험 !
      3. 제주도 바다보면서 먹고 자고 나만의 힐링 여행 ! 
      
      you have to answer in korean.
      
      Helpful answer: `,
  );

  return Response.json({ result });
}
