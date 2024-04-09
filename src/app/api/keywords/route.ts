import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';
import { ChatOpenAI, ChatOpenAICallOptions } from '@langchain/openai';
import { VectorStoreRetriever } from 'langchain/vectorstores/base';

import { answerTemplate, standaloneQuestionTemplate } from '@/prompt';
import { combineDocuments } from '@/utils/langchain/combineDocument';
import { getLocalRetriever } from '@/utils/langchain/localRetriever';
import { log } from '@/utils/log';

export async function POST(req: Request) {
  // * 바디에서 인풋 가져옵니다.
  const { question } = await req.json();

  // * 오픈AI API 키를 가져옵니다.
  const openAIApiKey = process.env.OPENAI_API_KEY;

  // * 오픈AI 인스턴스를 생성합니다.
  const llm = new ChatOpenAI({
    openAIApiKey,
    modelName: 'gpt-3.5-turbo',
    maxTokens: 200,
  });

  // * 로컬 리트리버를 가져옵니다.
  const retriever = await getLocalRetriever();

  // * 독립적 질문 생성
  const standaloneQuestionChain = createStandaloneQuestionChain(llm);

  // * 리트리버 체인 생성
  const retrieverChain = createRetrieverChain(retriever);

  // * 답변 체인 생성
  const answerChain = createAnswerChain(llm);

  // * 체인 시퀀스 실행
  const chain = RunnableSequence.from([
    {
      standalone_question: standaloneQuestionChain,
      original_input: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      question: ({ original_input }) => original_input.question,
    },
    answerChain,
  ]);

  log('🚀 Invoking the runnable sequence chain...');
  // * 체이닝 실행
  const response = await chain.invoke({
    question,
  });
  log('✅ Runnable sequence chain invoked successfully!');

  return Response.json({ response });
}

// * 독립적 질문 생성 함수
function createStandaloneQuestionChain(llm: ChatOpenAI<ChatOpenAICallOptions>) {
  const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
    standaloneQuestionTemplate,
  );
  return standaloneQuestionPrompt.pipe(llm).pipe(new StringOutputParser());
}

// * 리트리버 체인 생성 함수
function createRetrieverChain(retriever: VectorStoreRetriever<HNSWLib>) {
  return RunnableSequence.from([
    (prevResult) => prevResult.standalone_question,
    retriever,
    combineDocuments,
  ]);
}

// * 답변 체인 생성 함수
function createAnswerChain(llm: ChatOpenAI<ChatOpenAICallOptions>) {
  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);
  return answerPrompt.pipe(llm).pipe(new StringOutputParser());
}
