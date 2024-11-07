import { SearchSource, SearchResult } from '../types';

const SERPER_API_KEY = import.meta.env.VITE_SERPER_API_KEY;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function searchSerper(query: string, source: SearchSource): Promise<SearchResult[]> {
  const endpoint = `https://google.serper.dev/${source}`;
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'X-API-KEY': SERPER_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: query,
      gl: 'us',
      hl: 'en',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }

  const data = await response.json();
  return formatResults(data, source);
}

export async function generateAIResponse(query: string, results: SearchResult[], source: SearchSource): Promise<string> {
  const prompts = {
    search: `Create a comprehensive markdown summary with:
      ## Summary
      ### Key Findings
      ### Sources
      ### Conclusion`,
    
    images: `Analyze the image collection and create a markdown summary with:
      ## Visual Analysis
      ### Common Themes
      ### Notable Elements
      ### Technical Details (resolution, style, etc)`,
    
    videos: `Analyze the video collection and create a markdown summary with:
      ## Content Overview
      ### Popular Channels
      ### Duration Analysis
      ### View Count Statistics
      ### Key Topics`,
    
    news: `Create a news analysis in markdown with:
      ## News Summary
      ### Main Story
      ### Related Developments
      ### Sources
      ### Timeline`,
    
    shopping: `Create a product analysis in markdown with:
      ## Market Overview
      ### Price Range Analysis
      ### Popular Brands
      ### Key Features
      ### Best Value Options`,
    
    scholar: `Create an academic summary in markdown with:
      ## Research Overview
      ### Key Findings
      ### Methodology Patterns
      ### Research Impact
      ### Future Directions`,
    
    patents: `Create a patent analysis in markdown with:
      ## Innovation Overview
      ### Key Technologies
      ### Patent Holders
      ### Application Areas
      ### Market Impact`,
    
    places: `Create a location analysis in markdown with:
      ## Area Overview
      ### Popular Venues
      ### Ratings Analysis
      ### Location Highlights
      ### Visitor Tips`
  };

  const systemPrompt = `You are an expert research assistant that creates well-formatted markdown summaries. Format with proper markdown:
    - **Bold** for emphasis
    - *Italic* for terminology
    - > Blockquotes for important quotes
    - \`code\` for technical terms
    - Lists (- or 1.) for multiple points
    Include relevant statistics and cite sources using [text](url) format.`;

  const userPrompt = `Create a ${source} analysis for "${query}" using these results: ${JSON.stringify(results)}. 
Follow this structure:

${prompts[source]}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 4000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate AI response');
  }

  const data = await response.json();
  return data.choices[0].message.content;
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