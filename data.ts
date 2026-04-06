import { AppConfig } from './types';

export const navigationData: AppConfig = {
  categories: [
    {
      id: 'utils',
      title: { cn: '工具', en: 'Recommended' },
      items: [
        {
          id: 'LyricTools',
          title: { cn: '歌词工具', en: 'LyricTools' },
          url: 'https://rsec.top/lyric-tools',
          description: { cn: '支持QQ音乐本地QRC文件在线解密及歌词合并导出', en: 'Supports online decryption of local QRC lyric files from QQ Music and merged export of lyrics' },
          iconName: 'ListMusic'
        },
        {
          id: 'AudioPlayer',
          title: { cn: '音频可视化播放器', en: 'Audio Visualizer' },
          url: 'https://rsec.top/audio-player',
          description: { cn: '用于本地录屏的音频可视化播放器', en: 'Audio Visualizer for Local Screen Recordings' },
          iconName: 'AudioWaveform'
        },
        {
          id: 'ICOGenerator',
          title: { cn: 'ICO生成器', en: 'ICO Generator' },
          url: 'https://rsec.top/ico-generator',
          description: { cn: '可以裁剪局部图像以生成指定分辨率 ICO 的 ICO 生成器。', en: 'An ICO generator that can crop local images to generate ICOs of a specified resolution.' },
          iconName: 'FileCog'
        },
        {
          id: 'SimplePomodoroTimer',
          title: { cn: '简易番茄钟', en: 'Simple Pomodoro Timer' },
          url: 'https://rsec.top/timer',
          description: { cn: '一个简单的番茄钟计时器，允许您自定义回合数、间隔时间和每回合的持续时间。', en: 'A simple Pomodoro timer that allows you to customize the number of rounds, intervals, and duration of each round.' },
          iconName: 'AlarmClock'
        }
      ]
    }
    /*{
      id: 'common',
      title: { cn: '常用推荐', en: 'Recommended' },
      items: [
        {
          id: 'google',
          title: { cn: '谷歌搜索', en: 'Google' },
          url: 'https://www.google.com',
          description: { cn: '全球最大的搜索引擎', en: 'The world\'s most popular search engine' },
          iconName: 'Search'
        },
        {
          id: 'github',
          title: { cn: 'GitHub', en: 'GitHub' },
          url: 'https://github.com',
          description: { cn: '代码托管与协作平台', en: 'Where the world builds software' },
          iconName: 'Github'
        },
        {
          id: 'chatgpt',
          title: { cn: 'ChatGPT', en: 'ChatGPT' },
          url: 'https://chat.openai.com',
          description: { cn: 'OpenAI 开发的 AI 聊天助手', en: 'AI conversational agent by OpenAI' },
          iconName: 'MessageSquare'
        },
        {
          id: 'youtube',
          title: { cn: 'YouTube', en: 'YouTube' },
          url: 'https://www.youtube.com',
          description: { cn: '全球最大的视频分享网站', en: 'Video sharing platform' },
          iconName: 'Youtube'
        }
      ]
    },
    {
      id: 'dev',
      title: { cn: '开发工具', en: 'Development' },
      items: [
        {
          id: 'mdn',
          title: { cn: 'MDN Web Docs', en: 'MDN Web Docs' },
          url: 'https://developer.mozilla.org',
          description: { cn: 'Web 开发权威指南', en: 'Resources for developers, by developers' },
          iconName: 'BookOpen'
        },
        {
          id: 'stackoverflow',
          title: { cn: 'Stack Overflow', en: 'Stack Overflow' },
          url: 'https://stackoverflow.com',
          description: { cn: '开发者问答社区', en: 'Developer Q&A community' },
          iconName: 'Layers'
        },
        {
          id: 'tailwindcss',
          title: { cn: 'Tailwind CSS', en: 'Tailwind CSS' },
          url: 'https://tailwindcss.com',
          description: { cn: '原子化 CSS 框架', en: 'Utility-first CSS framework' },
          iconName: 'Wind'
        },
        {
          id: 'react',
          title: { cn: 'React', en: 'React' },
          url: 'https://react.dev',
          description: { cn: '构建用户界面的库', en: 'The library for web and native user interfaces' },
          iconName: 'Atom'
        },
        {
          id: 'jsonformatter',
          title: { cn: 'JSON 格式化', en: 'JSON Formatter' },
          url: 'https://jsonformatter.curiousconcept.com/',
          description: { cn: '在线 JSON 校验格式化', en: 'Online JSON Validator and Formatter' },
          iconName: 'FileJson'
        }
      ]
    },
    {
      id: 'design',
      title: { cn: '设计灵感', en: 'Design' },
      items: [
        {
          id: 'dribbble',
          title: { cn: 'Dribbble', en: 'Dribbble' },
          url: 'https://dribbble.com',
          description: { cn: '设计师展示作品的社区', en: 'Discover the world’s top designers' },
          iconName: 'Dribbble'
        },
        {
          id: 'behance',
          title: { cn: 'Behance', en: 'Behance' },
          url: 'https://www.behance.net',
          description: { cn: 'Adobe 旗下的创意展示平台', en: 'Showcase and discover creative work' },
          iconName: 'Palette'
        },
        {
          id: 'pinterest',
          title: { cn: 'Pinterest', en: 'Pinterest' },
          url: 'https://www.pinterest.com',
          description: { cn: '图片发现与收藏工具', en: 'Visual discovery engine' },
          iconName: 'Image'
        },
        {
          id: 'figma',
          title: { cn: 'Figma', en: 'Figma' },
          url: 'https://www.figma.com',
          description: { cn: '在线协作界面设计工具', en: 'Collaborative interface design tool' },
          iconName: 'Figma'
        }
      ]
    },
    {
      id: 'tools',
      title: { cn: '实用工具', en: 'Tools' },
      items: [
        {
          id: 'translate',
          title: { cn: 'Google 翻译', en: 'Google Translate' },
          url: 'https://translate.google.com',
          description: { cn: '免费的在线翻译服务', en: 'Free online translation service' },
          iconName: 'Languages'
        },
        {
          id: 'speedtest',
          title: { cn: 'Speedtest', en: 'Speedtest' },
          url: 'https://www.speedtest.net',
          description: { cn: '网速测试工具', en: 'Internet speed test' },
          iconName: 'Gauge'
        },
        {
          id: 'tinypng',
          title: { cn: 'TinyPNG', en: 'TinyPNG' },
          url: 'https://tinypng.com',
          description: { cn: '智能 WebP, PNG 和 JPEG 压缩', en: 'Smart WebP, PNG and JPEG compression' },
          iconName: 'Shrink'
        }
      ]
    }*/
  ]
};