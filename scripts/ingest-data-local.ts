import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { OpenAIEmbeddings } from '@langchain/openai';
import fs from 'fs';

import { getSplittedDocs } from '@/utils/langchain/getSplittedDocs';
import { log } from '@/utils/log';

const DATA_STORE_PATH = 'data/keywords.txt';
const VECTOR_STORE_PATH = 'store/keyword_vector_store';

export const run = async () => {
  if (fs.existsSync(VECTOR_STORE_PATH)) {
    log('📚 Data already exists in Supabase, skipping process.\n');
    return;
  } else {
    try {
      const docs = await getSplittedDocs({
        filePath: DATA_STORE_PATH,
        chunkSize: 500,
        chunkOverlap: 100,
      });
      log('🔨 Creating vector store...\n');

      const vectorStore = await HNSWLib.fromDocuments(
        docs,
        new OpenAIEmbeddings(),
      );
      await vectorStore.save(VECTOR_STORE_PATH);
    } catch (error) {
      log('❌ Error', error);
      throw new Error('Failed to ingest your data');
    }
  }
};

(async () => {
  await run();
  log('✅ Ingestion complete\n');
})();
