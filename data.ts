import { AppConfig } from './types';

function resolveDomain(kind: 'fluxfiles' | 'lyrics' | 'player' | 'ico' | 'timer' | 'nav') {
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  const isDev = host === 'dev.nav.tyukki.com' || host.startsWith('dev.');

  const mapping = isDev
    ? {
        fluxfiles: 'https://dev.files.tyukki.com/',
        lyrics: 'https://dev.lyrics.tyukki.com/',
        player: 'https://dev.player.tyukki.com/',
        ico: 'https://dev.ico.tyukki.com/',
        timer: 'https://dev.timer.tyukki.com/',
        nav: 'https://dev.nav.tyukki.com/',
      }
    : {
        fluxfiles: 'https://files.tyukki.com/',
        lyrics: 'https://lyrics.tyukki.com/',
        player: 'https://player.tyukki.com/',
        ico: 'https://ico.tyukki.com/',
        timer: 'https://timer.tyukki.com/',
        nav: 'https://nav.tyukki.com/',
      };

  return mapping[kind];
}

export const navigationData: AppConfig = {
  categories: [
    {
      id: 'utils',
      title: { cn: '工具', en: 'Recommended' },
      items: [
        {
          id: 'LyricTools',
          title: { cn: '歌词工具', en: 'LyricTools' },
          url: resolveDomain('lyrics'),
          description: {
            cn: '支持 QQ 音乐本地 QRC 文件在线解密及歌词合并导出',
            en: 'Supports online decryption of local QRC lyric files from QQ Music and merged export of lyrics',
          },
          iconName: 'ListMusic',
        },
        {
          id: 'AudioPlayer',
          title: { cn: '音频可视化播放器', en: 'Audio Visualizer' },
          url: resolveDomain('player'),
          description: {
            cn: '用于本地录屏的音频可视化播放器',
            en: 'Audio Visualizer for Local Screen Recordings',
          },
          iconName: 'AudioWaveform',
        },
        {
          id: 'ICOGenerator',
          title: { cn: 'ICO 生成器', en: 'ICO Generator' },
          url: resolveDomain('ico'),
          description: {
            cn: '可以裁剪局部图像以生成指定分辨率 ICO 的 ICO 生成器。',
            en: 'An ICO generator that can crop local images to generate ICOs of a specified resolution.',
          },
          iconName: 'FileCog',
        },
        {
          id: 'SimplePomodoroTimer',
          title: { cn: '简易番茄钟', en: 'Simple Pomodoro Timer' },
          url: resolveDomain('timer'),
          description: {
            cn: '一个简单的番茄钟计时器，允许您自定义回合数、间隔时间和每回合的持续时间。',
            en: 'A simple Pomodoro timer that allows you to customize the number of rounds, intervals, and duration of each round.',
          },
          iconName: 'AlarmClock',
        },
      ],
    },
    {
      id: 'downloads',
      title: { cn: '文件分发', en: 'File Distribution' },
      items: [
        {
          id: 'FluxFiles',
          title: { cn: 'FluxFiles', en: 'FluxFiles' },
          url: resolveDomain('fluxfiles'),
          description: {
            cn: '面向公开用户的文件查询与下载平台，支持管理员后台上传与维护。',
            en: 'A public file distribution platform with searchable downloads and an admin console for upload and management.',
          },
          iconName: 'Globe',
        },
      ],
    },
    /*{
      id: 'common',
      title: { cn: '甯哥敤鎺ㄨ崘', en: 'Recommended' },
      items: [
        {
          id: 'google',
          title: { cn: '璋锋瓕鎼滅储', en: 'Google' },
          url: 'https://www.google.com',
          description: { cn: '鍏ㄧ悆鏈€澶х殑鎼滅储寮曟搸', en: 'The world\'s most popular search engine' },
          iconName: 'Search'
        },
        {
          id: 'github',
          title: { cn: 'GitHub', en: 'GitHub' },
          url: 'https://github.com',
          description: { cn: '浠ｇ爜鎵樼涓庡崗浣滃钩鍙?, en: 'Where the world builds software' },
          iconName: 'Github'
        },
        {
          id: 'chatgpt',
          title: { cn: 'ChatGPT', en: 'ChatGPT' },
          url: 'https://chat.openai.com',
          description: { cn: 'OpenAI 寮€鍙戠殑 AI 鑱婂ぉ鍔╂墜', en: 'AI conversational agent by OpenAI' },
          iconName: 'MessageSquare'
        },
        {
          id: 'youtube',
          title: { cn: 'YouTube', en: 'YouTube' },
          url: 'https://www.youtube.com',
          description: { cn: '鍏ㄧ悆鏈€澶х殑瑙嗛鍒嗕韩缃戠珯', en: 'Video sharing platform' },
          iconName: 'Youtube'
        }
      ]
    },
    {
      id: 'dev',
      title: { cn: '寮€鍙戝伐鍏?, en: 'Development' },
      items: [
        {
          id: 'mdn',
          title: { cn: 'MDN Web Docs', en: 'MDN Web Docs' },
          url: 'https://developer.mozilla.org',
          description: { cn: 'Web 寮€鍙戞潈濞佹寚鍗?, en: 'Resources for developers, by developers' },
          iconName: 'BookOpen'
        },
        {
          id: 'stackoverflow',
          title: { cn: 'Stack Overflow', en: 'Stack Overflow' },
          url: 'https://stackoverflow.com',
          description: { cn: '寮€鍙戣€呴棶绛旂ぞ鍖?, en: 'Developer Q&A community' },
          iconName: 'Layers'
        },
        {
          id: 'tailwindcss',
          title: { cn: 'Tailwind CSS', en: 'Tailwind CSS' },
          url: 'https://tailwindcss.com',
          description: { cn: '鍘熷瓙鍖?CSS 妗嗘灦', en: 'Utility-first CSS framework' },
          iconName: 'Wind'
        },
        {
          id: 'react',
          title: { cn: 'React', en: 'React' },
          url: 'https://react.dev',
          description: { cn: '鏋勫缓鐢ㄦ埛鐣岄潰鐨勫簱', en: 'The library for web and native user interfaces' },
          iconName: 'Atom'
        },
        {
          id: 'jsonformatter',
          title: { cn: 'JSON 鏍煎紡鍖?, en: 'JSON Formatter' },
          url: 'https://jsonformatter.curiousconcept.com/',
          description: { cn: '鍦ㄧ嚎 JSON 鏍￠獙鏍煎紡鍖?, en: 'Online JSON Validator and Formatter' },
          iconName: 'FileJson'
        }
      ]
    },
    {
      id: 'design',
      title: { cn: '璁捐鐏垫劅', en: 'Design' },
      items: [
        {
          id: 'dribbble',
          title: { cn: 'Dribbble', en: 'Dribbble' },
          url: 'https://dribbble.com',
          description: { cn: '璁捐甯堝睍绀轰綔鍝佺殑绀惧尯', en: 'Discover the world鈥檚 top designers' },
          iconName: 'Dribbble'
        },
        {
          id: 'behance',
          title: { cn: 'Behance', en: 'Behance' },
          url: 'https://www.behance.net',
          description: { cn: 'Adobe 鏃椾笅鐨勫垱鎰忓睍绀哄钩鍙?, en: 'Showcase and discover creative work' },
          iconName: 'Palette'
        },
        {
          id: 'pinterest',
          title: { cn: 'Pinterest', en: 'Pinterest' },
          url: 'https://www.pinterest.com',
          description: { cn: '鍥剧墖鍙戠幇涓庢敹钘忓伐鍏?, en: 'Visual discovery engine' },
          iconName: 'Image'
        },
        {
          id: 'figma',
          title: { cn: 'Figma', en: 'Figma' },
          url: 'https://www.figma.com',
          description: { cn: '鍦ㄧ嚎鍗忎綔鐣岄潰璁捐宸ュ叿', en: 'Collaborative interface design tool' },
          iconName: 'Figma'
        }
      ]
    },
    {
      id: 'tools',
      title: { cn: '瀹炵敤宸ュ叿', en: 'Tools' },
      items: [
        {
          id: 'translate',
          title: { cn: 'Google 缈昏瘧', en: 'Google Translate' },
          url: 'https://translate.google.com',
          description: { cn: '鍏嶈垂鐨勫湪绾跨炕璇戞湇鍔?, en: 'Free online translation service' },
          iconName: 'Languages'
        },
        {
          id: 'speedtest',
          title: { cn: 'Speedtest', en: 'Speedtest' },
          url: 'https://www.speedtest.net',
          description: { cn: '缃戦€熸祴璇曞伐鍏?, en: 'Internet speed test' },
          iconName: 'Gauge'
        },
        {
          id: 'tinypng',
          title: { cn: 'TinyPNG', en: 'TinyPNG' },
          url: 'https://tinypng.com',
          description: { cn: '鏅鸿兘 WebP, PNG 鍜?JPEG 鍘嬬缉', en: 'Smart WebP, PNG and JPEG compression' },
          iconName: 'Shrink'
        }
      ]
    }*/
  ],
};
