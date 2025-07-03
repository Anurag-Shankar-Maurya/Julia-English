
import { Topic, TopicKey, LearningMode } from './types';

export const TOPIC_CONFIG: Record<TopicKey, Topic> = {
  family: {
    name: "我的家庭",
    welcome: "Hi there! I'm QMEI, your English teacher! Let's talk about your family today. Can you tell me about your family members?",
    welcomeTranslation: "嗨！我是QMEI，你的英文老師！今天我們來聊聊你的家庭吧。你可以告訴我你的家庭成員嗎？",
    suggestions: [
      "I have a mom, dad, and sister",
      "My family is very loving",
      "We like to play together",
    ],
  },
  animals: {
    name: "動物朋友",
    welcome: "Hello! Today let's talk about animals! Do you have any pets? What's your favorite animal?",
    welcomeTranslation: "你好！今天我們來聊聊動物吧！你有養寵物嗎？你最喜歡什麼動物？",
    suggestions: [
      "I have a cute dog",
      "I love cats very much",
      "My favorite animal is elephant",
    ],
  },
  school: {
    name: "學校生活",
    welcome: "Hi! Let's talk about school life! What do you like most about school? Who are your friends?",
    welcomeTranslation: "嗨！我們來聊聊學校生活吧！你最喜歡學校的什麼？你的朋友是誰？",
    suggestions: [
      "I like my English class",
      "My best friend is Amy",
      "I enjoy playing at recess",
    ],
  },
  food: {
    name: "美味食物",
    welcome: "Hello! Let's talk about food! What's your favorite food? Do you like fruits or vegetables?",
    welcomeTranslation: "你好！我們來聊聊食物吧！你最喜歡什麼食物？你喜歡水果還是蔬菜？",
    suggestions: [
      "I love pizza and ice cream",
      "My favorite fruit is apple",
      "I like eating vegetables",
    ],
  },
  hobbies: {
    name: "興趣愛好",
    welcome: "Hi! What do you like to do in your free time? Do you have any hobbies or favorite activities?",
    welcomeTranslation: "嗨！你空閒時間喜歡做什麼？你有什麼興趣愛好或喜歡的活動嗎？",
    suggestions: [
      "I like drawing and painting",
      "I enjoy playing soccer",
      "Reading books is fun",
    ],
  },
  nature: {
    name: "大自然",
    welcome: "Hello! Let's explore nature together! Do you like going to the park? What do you see outside?",
    welcomeTranslation: "你好！我們一起探索大自然吧！你喜歡去公園嗎？你在外面看到什麼？",
    suggestions: [
      "I see beautiful flowers",
      "I like playing in the park",
      "The sky is blue today",
    ],
  },
};

export const LEARNING_MODES: { key: LearningMode, label: string, icon: string }[] = [
    { key: 'dialogue', label: '情境對話練習', icon: '💬' },
    { key: 'sentence', label: '單句生成練習', icon: '📝' },
    { key: 'speech', label: '短文演說練習', icon: '🎤' },
];

export const TOPICS: { key: TopicKey, label: string, icon: string }[] = [
    { key: 'family', label: '我的家庭', icon: '👨‍👩‍👧‍👦' },
    { key: 'animals', label: '動物朋友', icon: '🐾' },
    { key: 'school', label: '學校生活', icon: '🏫' },
    { key: 'food', label: '美味食物', icon: '🍎' },
    { key: 'hobbies', label: '興趣愛好', icon: '🎨' },
    { key: 'nature', label: '大自然', icon: '🌳' },
];
