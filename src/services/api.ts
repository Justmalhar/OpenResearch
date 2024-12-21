import { SearchSource, SearchResult } from '../types';
import Configuration from 'openai';
import { OpenAI } from 'openai';

const SERPER_API_KEY = import.meta.env.VITE_SERPER_API_KEY;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const XAI_API_KEY = import.meta.env.VITE_XAI_API_KEY;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAI();

interface APIError {
  message: string;
  code: string;
}

// Add retry logic and better error handling
async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
  throw new Error('All retry attempts failed');
}

export async function searchSerper(query: string, source: SearchSource): Promise<SearchResult[]> {
  try {
    const endpoint = `https://google.serper.dev/${source}`;
    const response = await fetchWithRetry(endpoint, {
      method: 'POST',
      headers: {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: query,
        gl: 'world',
        hl: 'ar',
        num: 10, // Limit results
      }),
    });

    const data = await response.json();
    if ('error' in data) {
      throw new Error(`API Error: ${(data as APIError).message}`);
    }

    return formatResults(data, source);
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('فشل في جلب نتائج البحث - يرجى المحاولة مرة أخرى');
  }
}

export async function generateXAIResponse(query: string, results: SearchResult[], source: SearchSource): Promise<string> {
  const response = await fetch('https://api.x.ai/v1', {
    method: 'POST',
    headers: {
      'X-API-KEY': XAI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'grok-2-1212',
      query,
      results,
      source,
    }),
  });

  if (!response.ok) {
    throw new Error('فشل في إنشاء استجابة الذكاء الاصطناعي' + response.statusText);
  }

  const data = await response.json();
  return data.response;
}

export async function generateAIResponse(query: string, results: SearchResult[], source: SearchSource): Promise<string> {
  try {
    const systemPrompt = `أنت مساعد بحث خبير يقوم بإنشاء ملخصات منسقة بـ markdown. التنسيق يشمل:
      - **غامق** للتأكيد
      - *مائل* للمصطلحات
      - > اقتباسات للنصوص المهمة
      - \`كود\` للمصطلحات التقنية
      - قوائم (- أو 1.) للنقاط المتعددة`;

    const enhancedPrompts: { [key in SearchSource]: string } = {
      search: `تحليل شامل باللغة العربية يتضمن:
        ## نظرة عامة
        ### النقاط الرئيسية
        ### تحليل النتائج
        ### المصادر والموثوقية
        ### الخلاصة والتوصيات`,
      images: `تحليل شامل للصور باللغة العربية يتضمن:
        ## نظرة عامة
        ### النقاط الرئيسية
        ### تحليل النتائج
        ### المصادر والموثوقية
        ### الخلاصة والتوصيات`,
      videos: `تحليل شامل للفيديوهات باللغة العربية يتضمن:
        ## نظرة عامة
        ### النقاط الرئيسية
        ### تحليل النتائج
        ### المصادر والموثوقية
        ### الخلاصة والتوصيات`,
      places: `تحليل شامل للأماكن باللغة العربية يتضمن:
        ## نظرة عامة
        ### النقاط الرئيسية
        ### تحليل النتائج
        ### المصادر والموثوقية
        ### الخلاصة والتوصيات`,
      news: `تحليل شامل للأخبار باللغة العربية يتضمن:
        ## نظرة عامة
        ### النقاط الرئيسية
        ### تحليل النتائج
        ### المصادر والموثوقية
        ### الخلاصة والتوصيات`,
      shopping: `تحليل شامل للتسوق باللغة العربية يتضمن:
        ## نظرة عامة
        ### النقاط الرئيسية
        ### تحليل النتائج
        ### المصادر والموثوقية
        ### الخلاصة والتوصيات`,
      scholar: `تحليل شامل للأبحاث العلمية باللغة العربية يتضمن:
        ## نظرة عامة
        ### النقاط الرئيسية
        ### تحليل النتائج
        ### المصادر والموثوقية
        ### الخلاصة والتوصيات`,
      patents: `تحليل شامل للبراءات باللغة العربية يتضمن:
        ## نظرة عامة
        ### النقاط الرئيسية
        ### تحليل النتائج
        ### المصادر والموثوقية
        ### الخلاصة والتوصيات`,
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // Use latest model
      messages: [
        {
          role: 'system',
          content: `${systemPrompt}\nقم بتقديم تحليل عميق وشامل باللغة العربية مع التركيز على الدقة والموضوعية.`
        },
        {
          role: 'user',
          content: `تحليل "${query}" (${source}):\n${JSON.stringify(results)}\n\nالهيكل المطلوب:\n${enhancedPrompts[source]}`
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
      presence_penalty: 0.3,
      frequency_penalty: 0.3,
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error('فشل في إنشاء استجابة الذكاء الاصطناعي');
    }

    const data = response;
    const content = data.choices[0].message.content;
    if (content === null) {
      throw new Error('AI response content is null');
    }
    return content;
  } catch (error) {
    console.error('AI response error:', error);
    throw new Error('فشل في إنشاء تحليل الذكاء الاصطناعي - يرجى المحاولة مرة أخرى');
  }
}

function formatResults(data: any, source: SearchSource): SearchResult[] {
  switch (source) {
    case 'search':
      return data.organic?.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
      })) ?? [];

    case 'images':
      return data.images?.map((item: any) => ({
        title: item.title,
        link: item.link,
        imageUrl: item.imageUrl,
      })) ?? [];

    case 'videos':
      return data.videos?.map((item: any) => ({
        title: item.title,
        link: item.link,
        thumbnail: item.thumbnail,
        duration: item.duration,
        channel: item.channel,
        views: item.views,
      })) ?? [];

    case 'places':
      return data.places?.map((item: any) => ({
        title: item.title,
        link: item.link,
        address: item.address,
        rating: item.rating,
        reviews: item.reviews,
      })) ?? [];

    case 'news':
      return data.news?.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        imageUrl: item.imageUrl,
      })) ?? [];

    case 'shopping':
      return data.shopping?.map((item: any) => ({
        title: item.title,
        link: item.link,
        price: item.price,
        rating: item.rating,
        imageUrl: item.imageUrl,
      })) ?? [];

    case 'scholar':
    case 'patents':
      return data.organic?.map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        authors: item.authors,
        year: item.year,
        publisher: item.publisher,
      })) ?? [];

    default:
      return [];
  }
}