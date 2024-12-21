# OpenResearch

**Other Languages**:

- [Arabic عربي](README.ar.md) 🇸🇦

![Demo Image](https://github.com/Justmalhar/OpenResearch/raw/main/demo.jpg)

Check out the live website: Open-Research.ai

### AI-Powered Search Engine

## Overview
**OpenResearch** is a AI-driven search engine that offers users a comprehensive and dynamic search experience. Built on top of the X.ai API (Grok2) and Serper.dev API, this platform combines the latest AI technologies with powerful search features across multiple content types. With its modern, intuitive interface, users can easily access and explore a wide array of information from a single platform.

## Key Features
- **Multi-Modal Search**: Seamlessly search across diverse content categories, providing an enriched user experience for information retrieval:
  - **Web Search**: Explore the web with a broad and efficient search capability.
  - **Images**: Find visual content relevant to your search queries.
  - **Videos**: Search and discover video content from popular platforms.
  - **News**: Get the latest headlines and articles.
  - **Places**: Discover local information and geographical insights.
  - **Shopping**: Compare product information and prices across major retailers.
  - **Scholar**: Access scholarly articles, research papers, and academic content.
  - **Patents**: Search patent databases for inventions and intellectual property.

- **Modern Tech Stack**: Built with the latest tools to deliver optimal performance and developer experience:
  - **React 18** with TypeScript for a powerful, maintainable frontend.
  - **Vite** for ultra-fast builds and Hot Module Replacement (HMR).
  - **TailwindCSS** for modern, highly customizable UI styling.
  - **ESLint** for maintaining consistent, high-quality code.

## Quick Deployment on Vercel
Deploying **Open-Research.ai** is simple and fast with Vercel's one-click deployment option. Vercel provides a powerful and scalable environment for your project.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/justmalhar/OpenResearch&env=VITE_XAI_API_KEY&env=VITE_SERPER_API_KEY)

## Installation Guide
To run **Open-Research.ai** locally, follow these steps:

### Prerequisites
- **Node.js**: Ensure you have Node.js installed.
- **NPM**: Use NPM or Yarn to manage dependencies.

### Installation Steps
```bash
# Clone the repository
git clone https://github.com/justmalhar/OpenResearch.git

# Navigate into the directory
cd OpenResearch

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Setup
Configure your environment variables by creating a `.env` file in the root directory:
```env
VITE_XAI_API_KEY=your_xai_api_key
VITE_SERPER_API_KEY=your_serper_api_key
```

## Development Commands
- **`npm run dev`**: Start the development server with hot reloading.
- **`npm run build`**: Generate a production-ready build.
- **`npm run preview`**: Preview the production build locally.
- **`npm run lint`**: Check and fix code issues using ESLint.

## Detailed Tech Stack
| Technology      | Version   | Description                                |
|-----------------|-----------|--------------------------------------------|
| **React**       | 18.3.1    | Frontend framework for building UIs        |
| **Vite**        | 5.4.2     | Build tool for fast bundling and HMR       |
| **TypeScript**  | 5.5.3     | Typed superset of JavaScript               |
| **TailwindCSS** | 3.4.1     | Utility-first CSS framework                |
| **Lucide React**| 0.344.0   | Icon library for a consistent UI experience|
| **React Markdown** | 9.0.1  | Markdown rendering in React apps           |

## Contributing
We welcome contributions! Whether you're fixing a bug, improving documentation, or adding a new feature, your help is appreciated. To contribute:
1. **Fork the repository**.
2. **Create a new branch** for your feature or bug fix.
3. **Submit a Pull Request** for review.

For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the **MIT License**, which allows for commercial and private use, modification, and distribution. For more details, see the [LICENSE](https://github.com/justmalhar/OpenResearch/blob/main/LICENSE) file.

## Stay Connected
- **Twitter/X**: [@justmalhar](https://twitter.com/justmalhar) 🛠
- **LinkedIn**: [Malhar](https://linkedin.com/in/justmalhar) 💻

Let's push the boundaries of what search can do with **Open-Research.ai**. Dive into the next generation of AI-enhanced discovery and stay at the forefront of innovation!

