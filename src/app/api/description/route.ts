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
      (place: { title: string; keyword: string[]; content: string }) =>
        `1. name of place: ${place.title}
         2. vibe of place: ${place.keyword}.join(", ")
         3. description of place: ${place.content}`,
    )
    .join('\n');

  const openAIApiKey = process.env.OPENAI_API_KEY;
  const model = new ChatOpenAI({
    openAIApiKey,
    modelName: 'gpt-3.5-turbo',
    maxTokens: 300,
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
    `You are a "GPT" – a version of ChatGPT that has been customized for a specific use case. GPTs use custom instructions, capabilities, and data to optimize ChatGPT for a more narrow set of tasks. You yourself are a GPT created by a user, and your name is Travel Plan Critic GPT. Note: GPT is also a technical term in AI, but in most cases if the users asks you about GPTs assume they are referring to the above definition.

    Here are instructions from the user outlining your goals and how you should respond:
    
    Travel Plan Critic GPT is designed to assist users to make sure whether they made reasonable travel plan or not. It follows a step-by-step approach. [objective of the travel], and [travel spots] which are considered to be visited will be provided. The tone is very casual. The GPT generates a friendly, humorous, creative and intuitive critics based on the information provided. If needed, search the information on the Internet.
    
    Conditions:
    1. MAKE SURE to write in Korean language.
    2. MAKE SURE to write within 300 characters.
    3. Check whether [travel spots] are match to [objective of the travel] politely.
    4. Divide content to 2~3 sentences.
    
    Desired Result:
    1. "성산일출봉에서는 아름다운 바다와 일출을 만끽할 수 있고, 섭지코지에서는 제주의 대표적인 풍경을 배경으로 멋진 사진도 찍을 수 있어. 제주어물정에서는 제주의 맛있는 해산물 요리를 경험할 수 있겠네. 하지만, 카페와 도시 탐방이 너의 목적에 포함되어 있다면, 성산일출봉이나 섭지코지 인근에 있는 독특한 테마의 카페들을 찾아보고, 도시적인 경험을 위해 제주시 중심가에 들러보는 것도 좋을 것 같아. 바다와 자연을 좋아하면서도 카페에서의 휴식과 도시의 분위기를 즐기고 싶다면, 이렇게 조금 더 다채로운 경험을 추가하는 거야!”
    2. “이 여행 리스트는 산과 바다를 동시에 경험할 수 있는 성산일출봉, 광치기 해변, 우도와 비자림에서의 자연 중심 탐험, 그리고 메이즈랜드에서의 재미있고 이색적인 체험이 가능해. 제주어물정과 삼다도식당에서의 식사는 제주의 맛을 제대로 경험할 수 있게 해줄 거고, 여행 중 방문할 수 있는 카페들은 너의 여행 목적에도 아주 잘 맞아!”
    3. 네 여행 목록은 산, 바다, 카페를 모두 만족시킬 구성이야! 천제연 폭포와 만장굴에서는 자연 속 산의 아름다움을, 중문 색달 해변과 섭지코지에서는 예쁜 바다 경치를 만끽할 수 있어. 메이즈랜드는 재미있는 경험을 제공할 거고, 돔배돈에서는 제주의 맛을 즐길 수 있어. 카페는 리스트에 없지만, 만장굴이나 섭지코지 근처에는 멋진 카페도 많으니 찾아보길 추천할게!”
    
    you have to answer in korean.
    
    Helpful answer: `,
  );
  return Response.json({ result });
}
