/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  CloudRain,
  Droplets, 
  Wind, 
  User, 
  Sparkles, 
  ShoppingBag, 
  PlusCircle, 
  MessageSquare, 
  Home, 
  LayoutGrid, 
  Settings,
  Star,
  MapPin,
  ChevronRight,
  Search,
  Filter,
  ArrowLeft,
  Clock,
  Phone,
  Share2,
  Heart,
  TrendingUp,
  TrendingDown,
  Wallet,
  Globe,
  Bell,
  Camera,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Minus,
  Plus,
  Wheat,
  Milk,
  Sprout,
  Truck,
  Beef,
  Flower2,
  Bug,
  CheckCircle2,
  Users,
  Newspaper,
  BookOpen,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
  Package,
  Moon,
  Sun,
  SlidersHorizontal,
  Apple,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Listing {
  id: string;
  name: string;
  price: string;
  quantity: string;
  location: string;
  rating: number;
  image: string;
}

interface Product extends Listing {
  description: string;
  date: string;
  category: string;
  badge?: 'new' | 'popular' | 'top';
  seller: {
    name: string;
    avatar: string;
    rating: number;
    phone?: string;
  };
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  suggestions?: {
    label: string;
    type: 'link' | 'tip' | 'action';
    value: string;
  }[];
}

interface UserProfile {
  name: string;
  avatar: string;
  location: string;
  role: string;
}

interface Order {
  id: string;
  productName: string;
  price: string;
  date: string;
  status: 'delivered' | 'processing' | 'cancelled';
  image: string;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
  author: string;
  reactions: { type: string; count: number }[];
  comments: { id: string; user: string; text: string; date: string }[];
}

interface CommunityChat {
  id: string;
  name: string;
  lastMessage: string;
  members: number;
  image: string;
}

interface CommunityCategory {
  id: string;
  name: string;
  icon: any;
  chats: CommunityChat[];
}

type View = 'home' | 'market' | 'details' | 'sell' | 'ai' | 'settings' | 'communities' | 'news_details' | 'community_chats' | 'chat_room';
type Theme = 'light' | 'dark' | 'system';

// --- Mock Data ---

const MOCK_LISTINGS: Listing[] = [
  {
    id: 'm1',
    name: 'Картофель "Алладин"',
    price: '16 сом/кг',
    quantity: '500 кг',
    location: 'Чуйская обл.',
    rating: 4.8,
    image: 'https://picsum.photos/seed/potato1/400/300'
  },
  {
    id: 'm2',
    name: 'Лук репчатый',
    price: '12 сом/кг',
    quantity: '1 тонна',
    location: 'Ошская обл.',
    rating: 4.6,
    image: 'https://picsum.photos/seed/onion/400/300'
  },
  {
    id: 'm3',
    name: 'Помидоры "Бычье сердце"',
    price: '85 сом/кг',
    quantity: '200 кг',
    location: 'Джалал-Абад',
    rating: 4.9,
    image: 'https://picsum.photos/seed/tomato/400/300'
  },
  {
    id: 'm4',
    name: 'Яблоки "Превосходные"',
    price: '45 сом/кг',
    quantity: '300 кг',
    location: 'Иссык-Кульская обл.',
    rating: 4.9,
    image: 'https://picsum.photos/seed/apple/400/300'
  },
  {
    id: 'm5',
    name: 'Морковь "Шантанэ"',
    price: '14 сом/кг',
    quantity: '800 кг',
    location: 'Таласская обл.',
    rating: 4.7,
    image: 'https://picsum.photos/seed/carrot/400/300'
  },
  {
    id: 'm6',
    name: 'Капуста белокочанная',
    price: '10 сом/кг',
    quantity: '2000 кг',
    location: 'Нарынская обл.',
    rating: 4.4,
    image: 'https://picsum.photos/seed/cabbage/400/300'
  },
  {
    id: 'm7',
    name: 'Чеснок зимний',
    price: '120 сом/кг',
    quantity: '50 кг',
    location: 'Чуйская обл.',
    rating: 4.8,
    image: 'https://picsum.photos/seed/garlic/400/300'
  },
  {
    id: 'm8',
    name: 'Мед горный',
    price: '450 сом/кг',
    quantity: '100 кг',
    location: 'Нарынская обл.',
    rating: 5.0,
    image: 'https://picsum.photos/seed/honey/400/300'
  }
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'm1',
    name: 'Картофель "Алладин"',
    price: '16 сом/кг',
    quantity: '500 кг',
    location: 'Чуйская обл.',
    date: 'Сегодня, 10:45',
    category: 'Овощи, фрукты, зелень',
    badge: 'popular',
    description: 'Отборный картофель, выращенный без химикатов в экологически чистом районе. Крупный, ровный, без повреждений. Отлично подходит для длительного хранения и кулинарии. Урожай этого года.',
    rating: 4.8,
    image: 'https://picsum.photos/seed/potato1/800/600',
    seller: {
      name: 'Азамат Касымов',
      avatar: 'https://picsum.photos/seed/avatar1/150/150',
      rating: 4.9,
      phone: '+996 555 123 456'
    }
  },
  {
    id: 'm2',
    name: 'Лук репчатый',
    price: '12 сом/кг',
    quantity: '1 тонна',
    location: 'Ошская обл.',
    date: 'Вчера, 18:20',
    category: 'Овощи, фрукты, зелень',
    badge: 'new',
    description: 'Крупный, сухой лук. Урожай 2023 года. Самовывоз или доставка по договоренности. Лук хорошо просушен, готов к транспортировке.',
    rating: 4.6,
    image: 'https://picsum.photos/seed/onion/800/600',
    seller: {
      name: 'Марат Садыков',
      avatar: 'https://picsum.photos/seed/avatar2/150/150',
      rating: 4.7,
      phone: '+996 700 987 654'
    }
  },
  {
    id: 'm3',
    name: 'Помидоры "Бычье сердце"',
    price: '85 сом/кг',
    quantity: '200 кг',
    location: 'Джалал-Абад',
    date: 'Сегодня, 08:15',
    category: 'Овощи, фрукты, зелень',
    badge: 'top',
    description: 'Сладкие, мясистые домашние помидоры. Выращены в теплице. Идеальны для салатов и сока. Сбор производится в день заказа.',
    rating: 4.9,
    image: 'https://picsum.photos/seed/tomato/800/600',
    seller: {
      name: 'Нурбек Алиев',
      avatar: 'https://picsum.photos/seed/avatar3/150/150',
      rating: 5.0,
      phone: '+996 777 111 222'
    }
  },
  {
    id: 'm4',
    name: 'Яблоки "Превосходные"',
    price: '40 сом/кг',
    quantity: '3 тонны',
    location: 'Иссык-Куль',
    date: '2 дня назад',
    category: 'Овощи, фрукты, зелень',
    description: 'Сочные яблоки из садов Иссык-Куля. Хрустящие, кисло-сладкие. Сорт отлично переносит транспортировку. Возможен крупный опт.',
    rating: 4.7,
    image: 'https://picsum.photos/seed/apple/800/600',
    seller: {
      name: 'Айбек Осмонов',
      avatar: 'https://picsum.photos/seed/avatar4/150/150',
      rating: 4.8,
      phone: '+996 500 333 444'
    }
  },
  {
    id: 'm5',
    name: 'Пшеница "Твердая"',
    price: '18 сом/кг',
    quantity: '10 тонн',
    location: 'Чуйская обл.',
    date: '3 дня назад',
    category: 'Зерновые и бобовые',
    description: 'Высококачественная пшеница твердых сортов. Идеальна для производства макаронных изделий. Влажность в норме.',
    rating: 4.5,
    image: 'https://picsum.photos/seed/wheat/800/600',
    seller: {
      name: 'Бакыт Токтогулов',
      avatar: 'https://picsum.photos/seed/avatar5/150/150',
      rating: 4.6
    }
  },
  {
    id: 'm6',
    name: 'Ячмень фуражный',
    price: '14 сом/кг',
    quantity: '5 тонн',
    location: 'Таласская обл.',
    date: 'Сегодня, 09:00',
    category: 'Зерновые и бобовые',
    description: 'Ячмень для корма животных. Чистый, без примесей. Урожай прошлого года.',
    rating: 4.3,
    image: 'https://picsum.photos/seed/barley/800/600',
    seller: {
      name: 'Улан Мамытов',
      avatar: 'https://picsum.photos/seed/avatar6/150/150',
      rating: 4.4
    }
  },
  {
    id: 'm7',
    name: 'Говядина (четверти)',
    price: '480 сом/кг',
    quantity: '150 кг',
    location: 'Нарынская обл.',
    date: 'Сегодня, 07:30',
    category: 'Мясо и птица',
    description: 'Свежее мясо молодых бычков. Выпас на высокогорных пастбищах Нарына. Натуральный продукт.',
    rating: 5.0,
    image: 'https://picsum.photos/seed/beef/800/600',
    seller: {
      name: 'Эрмек Садыков',
      avatar: 'https://picsum.photos/seed/avatar7/150/150',
      rating: 4.9
    }
  },
  {
    id: 'm8',
    name: 'Баранина (туши)',
    price: '520 сом/кг',
    quantity: '80 кг',
    location: 'Иссык-Куль',
    date: 'Вчера, 16:45',
    category: 'Мясо и птица',
    description: 'Молодая баранина, нежная и без запаха. Идеально для плова и шашлыка.',
    rating: 4.8,
    image: 'https://picsum.photos/seed/lamb/800/600',
    seller: {
      name: 'Канат Асанов',
      avatar: 'https://picsum.photos/seed/avatar8/150/150',
      rating: 4.7
    }
  },
  {
    id: 'm9',
    name: 'Молоко домашнее',
    price: '45 сом/л',
    quantity: '100 л',
    location: 'Чуйская обл.',
    date: 'Сегодня, 06:00',
    category: 'Яйца и молочные продукты',
    description: 'Свежее утреннее молоко от домашних коров. Жирность 3.8-4.2%. Без добавок.',
    rating: 4.9,
    image: 'https://picsum.photos/seed/milk/800/600',
    seller: {
      name: 'Гульнара Осмонова',
      avatar: 'https://picsum.photos/seed/avatar9/150/150',
      rating: 5.0
    }
  },
  {
    id: 'm10',
    name: 'Сыр "Сулугуни"',
    price: '550 сом/кг',
    quantity: '20 кг',
    location: 'Ошская обл.',
    date: '2 дня назад',
    category: 'Яйца и молочные продукты',
    description: 'Натуральный сыр ручной работы. Изготовлен по традиционным рецептам.',
    rating: 4.7,
    image: 'https://picsum.photos/seed/cheese/800/600',
    seller: {
      name: 'Айнура Бекова',
      avatar: 'https://picsum.photos/seed/avatar10/150/150',
      rating: 4.8
    }
  },
  {
    id: 'm11',
    name: 'Семена кукурузы',
    price: '120 сом/кг',
    quantity: '200 кг',
    location: 'Баткенская обл.',
    date: '4 дня назад',
    category: 'Удобрения и семена',
    description: 'Гибридные семена кукурузы с высокой урожайностью. Устойчивы к засухе.',
    rating: 4.4,
    image: 'https://picsum.photos/seed/corn/800/600',
    seller: {
      name: 'Руслан Исаев',
      avatar: 'https://picsum.photos/seed/avatar11/150/150',
      rating: 4.5
    }
  },
  {
    id: 'm12',
    name: 'Удобрение "Нитроаммофоска"',
    price: '65 сом/кг',
    quantity: '1 тонна',
    location: 'Чуйская обл.',
    date: 'Вчера, 11:00',
    category: 'Удобрения и семена',
    description: 'Комплексное минеральное удобрение для всех видов культур.',
    rating: 4.6,
    image: 'https://picsum.photos/seed/fertilizer/800/600',
    seller: {
      name: 'Сергей Волков',
      avatar: 'https://picsum.photos/seed/avatar12/150/150',
      rating: 4.7
    }
  },
  {
    id: 'm13',
    name: 'Трактор МТЗ-82',
    price: '850 000 сом',
    quantity: '1 шт',
    location: 'Чуйская обл.',
    date: '5 дней назад',
    category: 'Техника и запчасти',
    description: 'Трактор в отличном состоянии. Прошел полное ТО. Готов к полевым работам.',
    rating: 4.8,
    image: 'https://picsum.photos/seed/tractor/800/600',
    seller: {
      name: 'Виктор Петров',
      avatar: 'https://picsum.photos/seed/avatar13/150/150',
      rating: 4.9
    }
  },
  {
    id: 'm14',
    name: 'Плуг 3-х корпусный',
    price: '45 000 сом',
    quantity: '2 шт',
    location: 'Ошская обл.',
    date: 'Сегодня, 12:30',
    category: 'Техника и запчасти',
    description: 'Новый плуг для средних тракторов. Усиленная рама.',
    rating: 4.5,
    image: 'https://picsum.photos/seed/plow/800/600',
    seller: {
      name: 'Алишер Каримов',
      avatar: 'https://picsum.photos/seed/avatar14/150/150',
      rating: 4.6
    }
  },
  {
    id: 'm15',
    name: 'Вспашка земли',
    price: '3500 сом/га',
    quantity: 'Услуга',
    location: 'Чуйская обл.',
    date: 'Сегодня, 08:00',
    category: 'Услуги',
    description: 'Профессиональная вспашка земли трактором. Быстро и качественно.',
    rating: 4.9,
    image: 'https://picsum.photos/seed/field/800/600',
    seller: {
      name: 'Игорь Смирнов',
      avatar: 'https://picsum.photos/seed/avatar15/150/150',
      rating: 5.0
    }
  },
  {
    id: 'm16',
    name: 'Перевозка грузов (КамАЗ)',
    price: '50 сом/км',
    quantity: 'Услуга',
    location: 'Весь Кыргызстан',
    date: 'Вчера, 14:00',
    category: 'Услуги',
    description: 'Перевозка сельхозпродукции по всей стране. Опытный водитель.',
    rating: 4.7,
    image: 'https://picsum.photos/seed/truck/800/600',
    seller: {
      name: 'Данияр Ахметов',
      avatar: 'https://picsum.photos/seed/avatar16/150/150',
      rating: 4.8
    }
  },
  {
    id: 'm17',
    name: 'Аренда комбайна',
    price: '4500 сом/га',
    quantity: 'Услуга',
    location: 'Таласская обл.',
    date: '3 дня назад',
    category: 'Услуги',
    description: 'Уборка зерновых культур комбайном. Высокая производительность.',
    rating: 4.6,
    image: 'https://picsum.photos/seed/combine/800/600',
    seller: {
      name: 'Алексей Кузнецов',
      avatar: 'https://picsum.photos/seed/avatar17/150/150',
      rating: 4.7
    }
  },
  {
    id: 'm18',
    name: 'Консультация агронома',
    price: '1500 сом/час',
    quantity: 'Услуга',
    location: 'Онлайн/Выезд',
    date: 'Сегодня, 11:00',
    category: 'Услуги',
    description: 'Советы по выращиванию культур, борьбе с вредителями и подбору удобрений.',
    rating: 5.0,
    image: 'https://picsum.photos/seed/agronomist/800/600',
    seller: {
      name: 'Елена Павлова',
      avatar: 'https://picsum.photos/seed/avatar18/150/150',
      rating: 5.0
    }
  },
  {
    id: 'm19',
    name: 'Мед горный',
    price: '600 сом/кг',
    quantity: '50 кг',
    location: 'Нарынская обл.',
    date: 'Сегодня, 10:00',
    category: 'Пчеловодство',
    description: 'Натуральный мед с высокогорных пастбищ. Очень ароматный и полезный.',
    rating: 4.9,
    image: 'https://picsum.photos/seed/honey/800/600',
    seller: {
      name: 'Асан Усенов',
      avatar: 'https://picsum.photos/seed/avatar19/150/150',
      rating: 4.9
    }
  },
  {
    id: 'm20',
    name: 'Саженцы абрикоса',
    price: '250 сом/шт',
    quantity: '100 шт',
    location: 'Баткенская обл.',
    date: 'Вчера, 09:30',
    category: 'Саженцы и цветы',
    description: 'Баткенские абрикосы, сорт "Лимонка". Хорошо приживаются.',
    rating: 4.8,
    image: 'https://picsum.photos/seed/apricot/800/600',
    seller: {
      name: 'Мурат Ибраимов',
      avatar: 'https://picsum.photos/seed/avatar20/150/150',
      rating: 4.8
    }
  }
];

const SIMILAR_LISTINGS: Listing[] = [
  {
    id: 's1',
    name: 'Картофель "Розара"',
    price: '18 сом/кг',
    quantity: '300 кг',
    location: 'Чуйская обл.',
    rating: 4.5,
    image: 'https://picsum.photos/seed/potato_sim1/400/300'
  },
  {
    id: 's2',
    name: 'Картофель молодой',
    price: '25 сом/кг',
    quantity: '100 кг',
    location: 'Ошская обл.',
    rating: 4.9,
    image: 'https://picsum.photos/seed/potato_sim2/400/300'
  }
];

const CATEGORIES = [
  'Овощи', 'Фрукты', 'Зерно', 'Молочные продукты', 'Мясо', 'Семена'
];

const SUBCATEGORIES = [
  'Картофель', 'Лук', 'Морковь', 'Помидоры', 'Капуста'
];

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Здравствуйте! Я ваш AI помощник EGIN. Чем могу помочь сегодня?',
    sender: 'ai',
    timestamp: '10:00'
  },
  {
    id: '2',
    text: 'У меня есть 2 тонны картофеля',
    sender: 'user',
    timestamp: '10:01'
  },
  {
    id: '3',
    text: 'Средняя цена на картофель в вашем регионе сейчас составляет 16-18 сом за кг. Хотите, я помогу найти покупателей или разместить объявление?',
    sender: 'ai',
    timestamp: '10:01'
  }
];

const MOCK_USER: UserProfile = {
  name: 'Азамат Касымов',
  avatar: 'https://picsum.photos/seed/avatar_user/400/400',
  location: 'Бишкек, Кыргызстан',
  role: 'Фермер'
};

const MOCK_ORDERS: Order[] = [
  {
    id: 'o1',
    productName: 'Семена пшеницы "Юбилейная"',
    price: '4500 сом',
    date: '12 Марта, 2026',
    status: 'delivered',
    image: 'https://picsum.photos/seed/order1/800/600'
  },
  {
    id: 'o2',
    productName: 'Удобрение NPK 16-16-16',
    price: '12000 сом',
    date: '5 Марта, 2026',
    status: 'delivered',
    image: 'https://picsum.photos/seed/order2/800/600'
  },
  {
    id: 'o3',
    productName: 'Система капельного орошения',
    price: '8500 сом',
    date: '28 Февраля, 2026',
    status: 'delivered',
    image: 'https://picsum.photos/seed/order3/800/600'
  }
];

const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Новые субсидии для фермеров в 2024 году',
    content: 'Правительство объявило о запуске новой программы поддержки сельскохозяйственных производителей. В рамках программы фермеры смогут получить льготные кредиты под 3% годовых на закупку техники и семян. Также предусмотрены прямые выплаты за каждый гектар обработанной земли.\n\nЭксперты отмечают, что это решение поможет значительно увеличить объемы производства в текущем сезоне. Для участия в программе необходимо подать заявку через портал государственных услуг до конца месяца.',
    date: 'Сегодня, 09:00',
    image: 'https://picsum.photos/seed/news1/800/600',
    author: 'Алексей Иванов',
    reactions: [
      { type: '👍', count: 124 },
      { type: '🔥', count: 56 },
      { type: '👏', count: 32 }
    ],
    comments: [
      { id: 'c1', user: 'Иван Петров', text: 'Отличная новость! Давно ждали такой поддержки.', date: '2 часа назад' },
      { id: 'c2', user: 'Мария Сидорова', text: 'А какие документы нужны для подачи заявки?', date: '1 час назад' }
    ]
  },
  {
    id: 'n2',
    title: 'Экспорт картофеля вырос на 15%',
    content: 'По данным таможенной службы, экспорт картофеля из региона в первом квартале 2024 года вырос на 15% по сравнению с аналогичным периодом прошлого года. Основными покупателями стали соседние страны.\n\nРост экспорта связан с улучшением качества продукции и внедрением новых технологий хранения. Фермеры отмечают, что выход на международные рынки позволяет им получать более высокую прибыль и инвестировать в развитие своих хозяйств.',
    date: 'Вчера, 14:20',
    image: 'https://picsum.photos/seed/news2/800/600',
    author: 'Елена Смирнова',
    reactions: [
      { type: '📈', count: 89 },
      { type: '🚀', count: 45 }
    ],
    comments: [
      { id: 'c3', user: 'Сергей Волков', text: 'Это хороший показатель для нашей экономики.', date: 'Вчера, 18:00' }
    ]
  },
  {
    id: 'n3',
    title: 'Прогноз погоды на посевной сезон',
    content: 'Метеорологи представили долгосрочный прогноз на весенний период. Ожидается, что весна будет ранней и теплой, что позволит начать посевные работы на 10-14 дней раньше обычного.\n\nОднако эксперты предупреждают о возможных кратковременных заморозках в середине мая. Фермерам рекомендуется заранее подготовить системы защиты растений и следить за ежедневными обновлениями прогноза.',
    date: '2 дня назад',
    image: 'https://picsum.photos/seed/news3/800/600',
    author: 'Дмитрий Соколов',
    reactions: [
      { type: '☀️', count: 210 },
      { type: '🌱', count: 145 }
    ],
    comments: []
  }
];

const MOCK_COMMUNITIES: CommunityCategory[] = [
  {
    id: 'cat1',
    name: 'Растениеводство',
    icon: Sprout,
    chats: [
      { id: 'ch1', name: 'Выращивание картофеля', lastMessage: 'Какой сорт лучше для юга?', members: 1250, image: 'https://picsum.photos/seed/comm1/150/150' },
      { id: 'ch2', name: 'Зерновые культуры', lastMessage: 'Обсуждаем сроки посева пшеницы', members: 850, image: 'https://picsum.photos/seed/comm2/150/150' },
      { id: 'ch3', name: 'Тепличное хозяйство', lastMessage: 'Как бороться с фитофторой?', members: 2100, image: 'https://picsum.photos/seed/comm3/150/150' }
    ]
  },
  {
    id: 'cat2',
    name: 'Животноводство',
    icon: Beef,
    chats: [
      { id: 'ch4', name: 'Крупный рогатый скот', lastMessage: 'Рацион для молочных коров', members: 1500, image: 'https://picsum.photos/seed/comm4/150/150' },
      { id: 'ch5', name: 'Птицеводство', lastMessage: 'Лучшие породы кур-несушек', members: 920, image: 'https://picsum.photos/seed/comm5/150/150' }
    ]
  },
  {
    id: 'cat3',
    name: 'Техника и Инновации',
    icon: Truck,
    chats: [
      { id: 'ch6', name: 'Ремонт тракторов', lastMessage: 'Где найти запчасти на МТЗ?', members: 3200, image: 'https://picsum.photos/seed/comm6/150/150' },
      { id: 'ch7', name: 'Дроны в сельском хозяйстве', lastMessage: 'Опыт использования DJI Agras', members: 450, image: 'https://picsum.photos/seed/comm7/150/150' }
    ]
  }
];

// --- Components ---

const Header = ({ title, location, showBack, onBack, onAIClick, onAddClick, onMessageClick, onCartClick, isHome }: { title: string; location?: string; showBack?: boolean; onBack?: () => void; onAIClick?: () => void; onAddClick?: () => void; onMessageClick?: () => void; onCartClick?: () => void; isHome?: boolean }) => (
  <header className={`flex flex-col ${isHome ? 'bg-transparent absolute top-0 left-0 right-0' : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 border-b border-slate-100 dark:border-slate-800'} z-50`}>
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button onClick={onBack} className={`p-2 rounded-xl border active:scale-95 transition-transform ${isHome ? 'bg-white/20 backdrop-blur-md text-white border-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
            <ArrowLeft size={20} />
          </button>
        ) : isHome ? (
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
            <div className="w-6 h-6 bg-white rounded-sm rotate-45 flex items-center justify-center overflow-hidden">
               <div className="w-full h-full bg-slate-900 -rotate-45 scale-150 translate-y-1"></div>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
        )}
        <div className="flex flex-col">
          {!isHome && <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white truncate max-w-[180px]">{title}</h1>}
          {location && (
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-white/60 uppercase tracking-widest">
              <MapPin size={10} className="text-brand-600 dark:text-brand-400" />
              {location}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={onAIClick}
          className={`p-2.5 rounded-full border active:scale-95 transition-transform ${isHome ? 'bg-white/20 backdrop-blur-md text-white border-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}
        >
          <Sparkles size={18} className="text-brand-600 dark:text-brand-400" />
        </button>
        <button 
          onClick={onMessageClick}
          className={`p-2.5 rounded-full border active:scale-95 transition-transform ${isHome ? 'bg-white/20 backdrop-blur-md text-white border-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}
        >
          <MessageSquare size={18} />
        </button>
        <button 
          onClick={onCartClick}
          className={`p-2.5 rounded-full border active:scale-95 transition-transform ${isHome ? 'bg-white/20 backdrop-blur-md text-white border-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}
        >
          <ShoppingCart size={18} />
        </button>
        {onAddClick && (
          <button 
            onClick={onAddClick}
            className={`p-2.5 rounded-full border active:scale-95 transition-transform ${isHome ? 'bg-white/20 backdrop-blur-md text-white border-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}
          >
            <Plus size={18} className="text-brand-600 dark:text-brand-400" />
          </button>
        )}
        <button 
          className={`p-2.5 rounded-full border relative active:scale-95 transition-transform ${isHome ? 'bg-white/20 backdrop-blur-md text-white border-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}
        >
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </div>
  </header>
);

const UnifiedAICard = () => (
  <div className="relative w-full min-h-[850px] overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
    {/* Abstract AI Background Elements */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-600/10 dark:bg-brand-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/5 dark:bg-emerald-600/10 rounded-full blur-[100px]" />
      <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '4s' }} />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
    </div>

    <div className="relative z-10 pt-24 px-6 pb-16 space-y-8">
      {/* 1. Main Weather & 7-Day Forecast */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-slate-200 dark:border-white/10 p-7 text-slate-900 dark:text-white shadow-xl dark:shadow-2xl transition-all"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-slate-900/5 dark:bg-white/10 rounded-lg">
              <Sun size={14} className="text-brand-600 dark:text-brand-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-white/60">Прогноз на 7 дней</span>
          </div>
          <div className="px-4 py-1.5 bg-slate-900/5 dark:bg-white/10 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-white/80">Бишкек</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-10">
          <div className="text-left">
            <h2 className="text-7xl font-thin tracking-tighter">28°</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <p className="text-xs font-black text-slate-500 dark:text-white/60 uppercase tracking-widest">Солнечно</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-3 px-3 py-2 bg-slate-900/5 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
              <Wind size={16} className="text-brand-600 dark:text-brand-400" />
              <span className="text-sm font-black">4.2 м/с</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 bg-slate-900/5 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
              <Droplets size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-black">42%</span>
            </div>
          </div>
        </div>

        {/* 7-Day Mini Forecast */}
        <div className="flex justify-between items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {[
            { day: 'Пн', temp: '28°', icon: Sun, active: true },
            { day: 'Вт', temp: '26°', icon: Cloud },
            { day: 'Ср', temp: '24°', icon: CloudRain },
            { day: 'Чт', temp: '27°', icon: Sun },
            { day: 'Пт', temp: '29°', icon: Sun },
            { day: 'Сб', temp: '30°', icon: Sun },
            { day: 'Вс', temp: '25°', icon: Cloud },
          ].map((d, i) => (
            <div key={i} className={`flex flex-col items-center gap-3 min-w-[52px] py-4 rounded-[1.5rem] border transition-all ${d.active ? 'bg-brand-600 border-brand-500 shadow-lg shadow-brand-600/20 text-white' : 'bg-slate-900/5 dark:bg-white/5 border-slate-200 dark:border-white/5 hover:bg-slate-900/10 dark:hover:bg-white/10'}`}>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${d.active ? 'text-white' : 'text-slate-400 dark:text-white/40'}`}>{d.day}</span>
              <d.icon size={18} className={d.active ? 'text-white' : 'text-slate-600 dark:text-white/60'} />
              <span className="text-xs font-black">{d.temp}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. AI Farmer's Advice (High-Tech Design) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-brand-50 to-emerald-50 dark:from-brand-600/20 dark:to-emerald-600/20 backdrop-blur-3xl rounded-[3rem] border border-slate-200 dark:border-white/10 p-8 text-slate-900 dark:text-white shadow-xl dark:shadow-2xl relative group overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/10 dark:bg-brand-500/20 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-brand-500/20 dark:group-hover:bg-brand-500/30 transition-all duration-700" />
        
        <div className="flex items-start gap-6 relative z-10">
          <div className="relative">
            <div className="p-4 bg-brand-600 rounded-[1.5rem] shadow-xl shadow-brand-600/40 relative z-10">
              <Sparkles size={28} className="text-white" />
            </div>
            <div className="absolute inset-0 bg-brand-600 rounded-[1.5rem] blur-xl opacity-50 animate-pulse" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[1px] w-4 bg-brand-600 dark:bg-brand-400" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-600 dark:text-brand-400">AI Intelligence</h3>
            </div>
            <h4 className="text-xl font-black leading-tight mb-3 tracking-tight">Оптимизация полива</h4>
            <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-white/80">
              Ожидается пик инсоляции. <span className="text-brand-600 dark:text-brand-400 font-black">AI рекомендует</span> перенести полив на <span className="text-slate-900 dark:text-white font-black underline decoration-brand-500 underline-offset-4">07:30 утра</span> для предотвращения испарения.
            </p>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform">
                Применить <ArrowRight size={14} />
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-slate-900/5 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform text-slate-600 dark:text-white">
                Анализ <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. Market Intelligence & Soil */}
      <div className="grid grid-cols-2 gap-5">
        {/* Market Intelligence */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-slate-200 dark:border-white/10 p-6 text-slate-900 dark:text-white shadow-lg dark:shadow-none"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="p-2 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl">
              <TrendingUp size={16} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40">Market AI</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-black text-slate-500 dark:text-white/60 uppercase">Картофель</span>
                <span className="text-sm font-black">16 с/кг</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900/5 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-emerald-500 dark:bg-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-black text-slate-500 dark:text-white/60 uppercase">Морковь</span>
                <span className="text-sm font-black">22 с/кг</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900/5 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} className="h-full bg-brand-600 dark:bg-brand-400" />
              </div>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
              <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">+4.2% Тренд</p>
            </div>
          </div>
        </motion.div>

        {/* Soil Intelligence */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-slate-200 dark:border-white/10 p-6 text-slate-900 dark:text-white shadow-lg dark:shadow-none flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl">
              <Droplets size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40">Soil AI</span>
          </div>
          
          <div className="py-2">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">75</span>
              <span className="text-sm font-black text-slate-400 dark:text-white/40">%</span>
            </div>
            <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-1">Оптимально</p>
          </div>

          <div className="flex gap-1 h-8 items-end">
            {[0.4, 0.6, 0.8, 0.5, 0.9, 0.7, 0.8].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h * 100}%` }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex-1 bg-slate-900/10 dark:bg-white/20 rounded-t-sm"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* 4. AI Crop Recognition (Quick Actions) */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { name: 'Apple', seed: 'apple', color: 'from-red-500/10 dark:from-red-500/20' },
          { name: 'Tomato', seed: 'tomato', color: 'from-orange-500/10 dark:from-orange-500/20' },
          { name: 'Onion', seed: 'onion', color: 'from-yellow-500/10 dark:from-yellow-500/20' },
          { name: 'Wheat', seed: 'wheat', color: 'from-emerald-500/10 dark:from-emerald-500/20' },
        ].map((crop, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            whileTap={{ scale: 0.9 }}
            className={`bg-gradient-to-b ${crop.color} to-white/5 backdrop-blur-md rounded-[1.5rem] border border-slate-200 dark:border-white/10 p-3 flex flex-col items-center gap-2 cursor-pointer shadow-sm dark:shadow-none`}
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900/5 dark:bg-white/5 p-1.5">
              <img 
                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${crop.seed}`} 
                alt={crop.name} 
                className="w-full h-full object-contain opacity-60 dark:opacity-80"
              />
            </div>
            <span className="text-[9px] font-black text-slate-500 dark:text-white/60 uppercase tracking-tighter">{crop.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const ListingCard: React.FC<{ listing: Listing; onClick?: () => void }> = ({ listing, onClick }) => {
  const [count, setCount] = useState(1);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="min-w-[200px] w-[200px] bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col cursor-pointer"
    >
      <div className="relative h-32">
        <img 
          src={listing.image} 
          alt={listing.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-1.5 rounded-full text-slate-300 dark:text-slate-600 shadow-sm">
          <Star size={14} />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-1">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{listing.price} за 1 кг</span>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight mt-0.5">{listing.name}</h4>
        </div>
        
        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-full p-1 gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); setCount(Math.max(0, count - 1)) }}
              className="w-8 h-8 flex items-center justify-center bg-brand-200/50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-400 rounded-full"
            >
              <Minus size={16} />
            </button>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-4 text-center">{count}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setCount(count + 1) }}
              className="w-8 h-8 flex items-center justify-center bg-brand-600 text-white rounded-full"
            >
              <Plus size={16} />
            </button>
          </div>
          <button className="w-10 h-10 flex items-center justify-center bg-brand-600 text-white rounded-full shadow-lg shadow-brand-100 dark:shadow-brand-900/20">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};


const ActionButtons = ({ onMarketClick }: { onMarketClick: () => void }) => (
  <div className="grid grid-cols-3 gap-4 mx-6 mt-8">
    {[
      { label: 'Купить', icon: ShoppingBag, color: 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-100 dark:border-slate-800', onClick: onMarketClick },
      { label: 'Продать', icon: PlusCircle, color: 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-500/20', onClick: () => {} },
      { label: 'AI Помощь', icon: MessageSquare, color: 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-100 dark:border-slate-800', onClick: () => {} },
    ].map((btn, i) => (
      <motion.button
        key={btn.label}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 + i * 0.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={btn.onClick}
        className={`flex flex-col items-center justify-center gap-3 p-5 rounded-[2rem] border transition-all ${btn.color}`}
      >
        <div className={`p-2 rounded-xl ${btn.label === 'Продать' ? 'bg-white/20' : 'bg-brand-50 dark:bg-brand-950/30'}`}>
          <btn.icon size={24} className={btn.label === 'Продать' ? 'text-white' : 'text-brand-600 dark:text-brand-400'} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest">{btn.label}</span>
      </motion.button>
    ))}
  </div>
);



const NewsSection = ({ onNewsClick }: { onNewsClick: (news: NewsItem) => void }) => (
  <section className="mt-8">
    <div className="flex items-center justify-between px-6 mb-4">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
        Новости <span className="text-brand-600 dark:text-brand-400">Агро</span>
      </h3>
      <button className="text-brand-600 dark:text-brand-400 text-xs font-bold">Все новости</button>
    </div>
    <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-4">
      {MOCK_NEWS.map((news) => (
        <div 
          key={news.id} 
          onClick={() => onNewsClick(news)}
          className="min-w-[240px] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer active:scale-95 transition-transform"
        >
          <img src={news.image} alt={news.title} className="w-full h-24 object-cover" referrerPolicy="no-referrer" />
          <div className="p-3">
            <span className="text-[10px] text-brand-600 dark:text-brand-400 font-bold uppercase">{news.date}</span>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">{news.title}</h4>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const BlogSection = ({ onPostClick }: { onPostClick: (post: any) => void }) => (
  <section className="mt-8">
    <div className="flex items-center justify-between px-6 mb-4">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
        Блог <span className="text-brand-600 dark:text-brand-400">экспертов</span>
      </h3>
    </div>
    <div className="px-6 space-y-4">
      {[
        { 
          id: 'b1', 
          title: 'Как повысить урожайность зерновых', 
          author: 'Азамат Исаев', 
          views: '1.2k', 
          icon: BookOpen, 
          image: 'https://picsum.photos/seed/blog1/400/300',
          content: 'Повышение урожайности зерновых культур — это комплексная задача, требующая внимания к деталям на каждом этапе: от подготовки почвы до сбора урожая. В этой статье мы рассмотрим основные факторы, влияющие на результат.\n\nВо-первых, это качественный посевной материал. Использование сертифицированных семян высоких репродукций позволяет получить прибавку к урожаю до 15-20%. Во-вторых, правильное питание растений. Внесение удобрений должно быть сбалансированным и своевременным.',
          date: '3 дня назад',
          reactions: [{ type: '🌱', count: 45 }, { type: '👍', count: 120 }],
          comments: []
        },
        { 
          id: 'b2', 
          title: 'Секреты хранения овощей зимой', 
          author: 'Мария Петрова', 
          views: '850', 
          icon: BookOpen, 
          image: 'https://picsum.photos/seed/blog2/400/300',
          content: 'Правильное хранение овощей зимой позволяет сохранить их питательные свойства и товарный вид до самой весны. Основные параметры, которые необходимо контролировать — это температура и влажность.\n\nДля большинства овощей оптимальная температура хранения составляет от 0 до +4 градусов. Влажность должна быть в пределах 85-95%. Также важно обеспечить хорошую вентиляцию в хранилище, чтобы предотвратить развитие гнилей и плесени.',
          date: '5 дней назад',
          reactions: [{ type: '❄️', count: 32 }, { type: '📦', count: 67 }],
          comments: []
        },
      ].map((post, i) => (
        <div 
          key={i} 
          onClick={() => onPostClick(post)}
          className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-16 h-16 bg-brand-50 dark:bg-brand-950/30 rounded-2xl overflow-hidden flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{post.title}</h4>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{post.author}</span>
              <span className="text-[10px] text-slate-300 dark:text-slate-700">•</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{post.views} просмотров</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);


const ListingsSection = ({ onListingClick }: { onListingClick: (id: string) => void }) => (
  <section className="mt-8">
    <div className="flex items-center justify-between px-6 mb-4">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
        Свежие <span className="text-brand-600 dark:text-brand-400">предложения</span>
      </h3>
      <button className="text-brand-600 dark:text-brand-400 text-xs font-bold">Смотреть все</button>
    </div>
    <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-4">
      {MOCK_LISTINGS.map(listing => (
        <ListingCard key={listing.id} listing={listing} onClick={() => onListingClick(listing.id)} />
      ))}
    </div>
  </section>
);

// --- Marketplace Components ---

const SearchBar = () => (
  <div className="px-6 mt-4">
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input 
        type="text" 
        placeholder="Поиск продуктов..." 
        className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-3.5 pl-11 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-sm dark:text-white dark:placeholder:text-slate-600"
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 rounded-xl">
        <Filter size={18} />
      </button>
    </div>
  </div>
);

const SubcategoryChips = ({ selected, onSelect }: { selected: string; onSelect: (s: string) => void }) => (
  <div className="mt-3">
    <div className="flex overflow-x-auto px-6 gap-2 no-scrollbar pb-2">
      {['Все', 'Новинки', 'Популярные', 'Семена'].map((sub) => (
        <button
          key={sub}
          onClick={() => onSelect(sub)}
          className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selected === sub 
              ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {sub}
        </button>
      ))}
    </div>
  </div>
);

const ProductCard: React.FC<{ product: Product; onClick?: () => void }> = ({ product, onClick }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="bg-white dark:bg-slate-900 rounded-[2rem] p-3 border border-slate-100 dark:border-slate-800 shadow-sm group relative"
  >
    <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-slate-50 dark:bg-slate-800 mb-3">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      <button 
        className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400 hover:text-brand-600 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Heart size={14} />
      </button>
    </div>
    <div className="px-1 pb-1">
      <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1 line-clamp-1">{product.name}</h4>
      <div className="flex items-center justify-between">
        <span className="text-sm font-black text-slate-900 dark:text-white">{product.price}</span>
        <div className="flex items-center gap-0.5">
          <Star size={10} className="text-yellow-500 fill-yellow-500" />
          <span className="text-[10px] font-bold text-slate-900 dark:text-white">{product.rating}</span>
        </div>
      </div>
    </div>
    <button 
      className="absolute -bottom-1 -right-1 w-9 h-9 bg-brand-600 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform border-4 border-white dark:border-slate-950"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Plus size={18} />
    </button>
  </motion.div>
);

const CATEGORIES_LIST = [
  { id: 'seeds', name: 'Семена', icon: Sprout, color: 'bg-emerald-50 text-emerald-600' },
  { id: 'fert', name: 'Удобрения', icon: Droplets, color: 'bg-blue-50 text-blue-600' },
  { id: 'veg', name: 'Овощи', icon: ShoppingBag, color: 'bg-orange-50 text-orange-500' },
  { id: 'fruit', name: 'Фрукты', icon: Apple, color: 'bg-red-50 text-red-500' },
  { id: 'tech', name: 'Техника', icon: Truck, color: 'bg-slate-50 text-slate-600' },
  { id: 'feed', name: 'Корма', icon: LayoutGrid, color: 'bg-amber-50 text-amber-600' },
];

const MarketHeader = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <div className="bg-brand-600 dark:bg-brand-700 pt-8 pb-20 px-6 rounded-b-[3rem] relative overflow-hidden">
      {/* Abstract Background Patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      
      {/* Search Bar Integrated into Header */}
      <div className="relative z-10">
        <form onSubmit={handleSearch} className="relative flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск товаров..." 
              className="w-full bg-white dark:bg-slate-900 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-brand-500/20 transition-all shadow-xl shadow-brand-900/20 dark:shadow-none dark:text-white"
            />
          </div>
          <button type="button" className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 shadow-xl shadow-brand-900/20 dark:shadow-none active:scale-90 transition-transform">
            <SlidersHorizontal size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

const SpecialOfferCarousel = () => (
  <div className="mt-[-60px] relative z-20">
    <div className="flex items-center justify-between px-6 mb-4">
      <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">#СпециальноДляВас</h3>
      <button className="text-brand-600 dark:text-brand-400 text-xs font-bold hover:underline">Смотреть все</button>
    </div>
    <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-4">
      {[
        { id: 1, title: 'Спецпредложение', discount: 'До 40%', image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=400', color: 'from-brand-600 to-brand-800' },
        { id: 2, title: 'Новый урожай', discount: 'До 25%', image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=400', color: 'from-emerald-600 to-emerald-800' },
      ].map((offer) => (
        <div key={offer.id} className={`relative shrink-0 w-[85%] h-44 rounded-[2.5rem] overflow-hidden bg-gradient-to-br ${offer.color} p-6 flex items-center shadow-xl shadow-brand-500/20 dark:shadow-none`}>
          <div className="relative z-10 max-w-[60%]">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest mb-2 inline-block border border-white/10">Ограничено</span>
            <h4 className="text-white text-lg font-bold leading-tight mb-1">{offer.title}</h4>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-white/80 text-xs font-medium">Скидки</span>
              <span className="text-white text-3xl font-black">{offer.discount.split(' ')[1]}</span>
            </div>
            <button className="px-6 py-2 bg-white text-brand-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform">
              Получить
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2">
            <img 
              src={offer.image} 
              alt={offer.title} 
              className="w-full h-full object-cover mix-blend-overlay opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        </div>
      ))}
    </div>
    {/* Carousel Dots */}
    <div className="flex justify-center gap-1.5 mt-2">
      <div className="w-5 h-1.5 bg-brand-600 rounded-full" />
      <div className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
      <div className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
    </div>
  </div>
);

const MarketCategories = ({ onCategoryClick }: { onCategoryClick: (cat: string) => void }) => (
  <div className="mt-10">
    <div className="flex items-center justify-between px-6 mb-6">
      <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Категории</h3>
      <button 
        onClick={() => onCategoryClick('Весь каталог')}
        className="text-brand-600 dark:text-brand-400 text-xs font-bold hover:underline"
      >
        Смотреть все
      </button>
    </div>
    <div className="grid grid-cols-3 gap-y-8 gap-x-4 px-6">
      {CATEGORIES_LIST.map((cat) => (
        <div 
          key={cat.id} 
          onClick={() => onCategoryClick(cat.name)}
          className="flex flex-col items-center gap-3 cursor-pointer group"
        >
          <div className="w-20 h-20 rounded-[2rem] bg-white dark:bg-slate-900 flex items-center justify-center text-brand-600 dark:text-brand-400 shadow-xl shadow-slate-200/50 dark:shadow-none group-hover:scale-110 transition-transform border border-slate-50 dark:border-slate-800">
            <cat.icon size={32} strokeWidth={2.5} />
          </div>
          <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 text-center leading-tight uppercase tracking-wider">{cat.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const FlashSaleSection = ({ onProductClick }: { onProductClick: (id: string) => void }) => {
  const [activeTab, setActiveTab] = useState('Все');
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 12, seconds: 56 });
  const tabs = ['Все', 'Новинки', 'Популярные', 'Семена'];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="mt-12 px-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Молниеносная распродажа</h3>
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            <span>Заканчивается через:</span>
            <div className="flex gap-1 text-brand-600 dark:text-brand-400 font-black">
              <span className="bg-brand-50 dark:bg-brand-950/30 px-1.5 py-0.5 rounded-lg">{formatTime(timeLeft.hours)}</span>
              <span className="animate-pulse">:</span>
              <span className="bg-brand-50 dark:bg-brand-950/30 px-1.5 py-0.5 rounded-lg">{formatTime(timeLeft.minutes)}</span>
              <span className="animate-pulse">:</span>
              <span className="bg-brand-50 dark:bg-brand-950/30 px-1.5 py-0.5 rounded-lg">{formatTime(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-xs font-black transition-all ${
              activeTab === tab
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-200 dark:shadow-none'
                : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 pb-32">
        {MOCK_PRODUCTS.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => onProductClick(product.id)} />
        ))}
      </div>
    </div>
  );
};

const CatalogView = ({ onCategoryClick, onProductClick, onSearch }: { onCategoryClick: (cat: string) => void; onProductClick: (id: string) => void; onSearch?: (q: string) => void }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
      <MarketHeader onSearch={onSearch} />
      <SpecialOfferCarousel />
      <MarketCategories onCategoryClick={onCategoryClick} />
      <FlashSaleSection onProductClick={onProductClick} />
    </div>
  );
};


const ProductListPage = ({ category, onBack, onProductClick, onAddClick, initialSearch = '' }: { category: string; onBack: () => void; onProductClick: (id: string) => void; onAddClick?: () => void; initialSearch?: string }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = category === 'Весь каталог' || category === 'Новинки' || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubcategory = selectedSubcategory === 'Все' || p.badge === (selectedSubcategory === 'Новинки' ? 'new' : selectedSubcategory === 'Популярные' ? 'popular' : '');
    
    return matchesCategory && matchesSearch && matchesSubcategory;
  });

  return (
    <div className="pb-24 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="bg-white dark:bg-slate-900 pb-4">
        <div className="px-6 pt-4 flex items-center gap-3">
          <button onClick={onBack} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{category}</h2>
        </div>
        <div className="px-6 mt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск продуктов..." 
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-3.5 pl-11 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all dark:text-white"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 rounded-xl">
              <Filter size={18} />
            </button>
          </div>
        </div>
        <SubcategoryChips selected={selectedSubcategory} onSelect={setSelectedSubcategory} />
      </div>

      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {selectedSubcategory} <span className="text-slate-400 dark:text-slate-500 font-normal text-sm ml-1">({filteredProducts.length})</span>
          </h3>
          {onAddClick && (
            <button onClick={onAddClick} className="flex items-center gap-1 text-brand-600 dark:text-brand-400 text-xs font-bold">
              <Plus size={16} />
              <span>Добавить</span>
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onClick={() => onProductClick(product.id)} />
            ))
          ) : (
            <div className="col-span-2 py-20 text-center">
              <p className="text-slate-400">В этой категории пока нет товаров</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MarketplacePage = ({ onProductClick, onAddClick }: { onProductClick: (id: string) => void; onAddClick: () => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [initialSearch, setInitialSearch] = useState('');

  const handleSearch = (query: string) => {
    setInitialSearch(query);
    setSelectedCategory('Весь каталог');
  };

  if (selectedCategory) {
    return (
      <ProductListPage 
        category={selectedCategory} 
        onBack={() => {
          setSelectedCategory(null);
          setInitialSearch('');
        }} 
        onProductClick={onProductClick}
        onAddClick={onAddClick}
        initialSearch={initialSearch}
      />
    );
  }

  return (
    <div className="transition-colors duration-500">
      <CatalogView onCategoryClick={setSelectedCategory} onProductClick={onProductClick} onSearch={handleSearch} />
    </div>
  );
};

// --- Product Details Components ---

const ProductDetailsPage = ({ product, onChatClick }: { product: Product; onChatClick?: (seller: any) => void }) => (
  <div className="pb-32 bg-slate-50 dark:bg-slate-950 min-h-screen">
    {/* Large Product Image */}
    <div className="relative h-[400px] w-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-12">
      <img 
        src={product.image} 
        alt={product.name} 
        className="max-w-full max-h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-slate-600 dark:text-slate-400 shadow-lg border border-white/20 dark:border-slate-700">
          <Share2 size={20} />
        </button>
        <button className="p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-slate-600 dark:text-slate-400 shadow-lg border border-white/20 dark:border-slate-700">
          <Heart size={20} />
        </button>
      </div>
    </div>

    {/* Product Info */}
    <div className="px-6 -mt-12 relative z-10">
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-lg">В наличии</span>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg">{product.category}</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">{product.name}</h2>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-black text-slate-900 dark:text-white">{product.rating}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">(124 отзыва)</span>
              </div>
              <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
              <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{product.location}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-brand-600 dark:text-brand-400 leading-none">{product.price}</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-2">{product.quantity}</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img 
                src={product.seller.avatar} 
                alt={product.seller.name} 
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-slate-900 shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center">
                <ShieldCheck size={12} className="text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-black text-slate-900 dark:text-white text-base">{product.seller.name}</h4>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Официальный поставщик • 5 лет на рынке</p>
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-black text-slate-900 dark:text-white">{product.seller.rating}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <a 
              href={`tel:${product.seller.phone || '+996555123456'}`}
              className="flex flex-col items-center justify-center gap-2 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-95 transition-transform group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Phone size={18} />
              </div>
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Позвонить</span>
            </a>
            <button 
              onClick={() => onChatClick && onChatClick(product.seller)}
              className="flex flex-col items-center justify-center gap-2 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-95 transition-transform group"
            >
              <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <MessageCircle size={18} />
              </div>
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Чат</span>
            </button>
            <button 
              className="flex flex-col items-center justify-center gap-2 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-95 transition-transform group"
            >
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-slate-600 group-hover:text-white transition-colors">
                <User size={18} />
              </div>
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Профиль</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">Описание товара</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Похожие товары</h3>
            <button className="text-brand-600 dark:text-brand-400 text-xs font-bold">Все</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {SIMILAR_LISTINGS.map(item => (
              <div key={item.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-3 shrink-0 w-44 border border-slate-100 dark:border-slate-800 group cursor-pointer">
                <div className="aspect-square bg-white dark:bg-slate-900 rounded-2xl p-2 mb-3 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <h5 className="font-black text-slate-900 dark:text-white text-xs truncate mb-1">{item.name}</h5>
                <div className="flex items-center justify-between">
                  <span className="text-brand-600 dark:text-brand-400 font-black text-sm">{item.price}</span>
                  <button className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-400 border border-slate-100 dark:border-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <ShoppingCart size={24} />
          </button>
          <button className="flex-1 bg-brand-600 text-white rounded-3xl font-black text-base uppercase tracking-widest shadow-2xl shadow-brand-200 dark:shadow-brand-900/40 active:scale-95 transition-transform flex items-center justify-center gap-3">
            <span>Купить сейчас</span>
            <div className="w-1 h-1 bg-white/30 rounded-full" />
            <span>{product.price}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AIAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const { text: aiText, suggestions } = getAIResponse(text);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (input: string): { text: string; suggestions?: Message['suggestions'] } => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('болезнь') || lowerInput.includes('листья')) {
      return {
        text: 'Пожалуйста, загрузите фотографию пораженного растения. Я проанализирую её и помогу определить проблему.',
        suggestions: [
          { label: 'Как правильно фотографировать?', type: 'tip', value: 'Снимайте при дневном свете, чтобы были видны детали листа.' },
          { label: 'Каталог болезней', type: 'link', value: 'catalog_diseases' }
        ]
      };
    }
    if (lowerInput.includes('цена') || lowerInput.includes('сколько стоит')) {
      return {
        text: 'Цены на сельхозпродукцию сейчас стабильны. Картофель: 16-18 сом, Лук: 12-14 сом. В каком регионе вы находитесь?',
        suggestions: [
          { label: 'График цен за месяц', type: 'action', value: 'show_price_chart' },
          { label: 'Рынок: Бишкек', type: 'link', value: 'market_bishkek' }
        ]
      };
    }
    if (lowerInput.includes('покупател')) {
      return {
        text: 'Я нашел 5 активных закупщиков в вашем регионе, которые ищут картофель оптом. Хотите посмотреть их контакты?',
        suggestions: [
          { label: 'Показать контакты', type: 'action', value: 'show_buyers' },
          { label: 'Советы по переговорам', type: 'tip', value: 'Всегда уточняйте условия доставки и упаковки.' }
        ]
      };
    }
    return {
      text: 'Я готов помочь вам с любым вопросом по сельскому хозяйству. Вы можете спросить о ценах, болезнях растений или найти покупателей.',
      suggestions: [
        { label: 'Популярные вопросы', type: 'tip', value: 'Чаще всего спрашивают про цены на удобрения и борьбу с вредителями.' }
      ]
    };
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-50 dark:bg-slate-950">
      {/* AI Info Header */}
      <div className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">AI помощник</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Спросите про цены, болезни растений или найдите покупателей</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-brand-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-tl-none'
            }`}>
              {msg.text}
              
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Рекомендации:</p>
                  <div className="flex flex-col gap-2">
                    {msg.suggestions.map((s, i) => (
                      <button 
                        key={i}
                        className="text-left p-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl text-xs font-medium text-brand-700 dark:text-brand-400 flex items-center justify-between group hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:border-brand-200 dark:hover:border-brand-800 transition-all"
                      >
                        <span className="flex items-center gap-2">
                          {s.type === 'link' && <ShoppingBag size={12} />}
                          {s.type === 'tip' && <Sparkles size={12} />}
                          {s.type === 'action' && <ChevronRight size={12} />}
                          {s.label}
                        </span>
                        <ChevronRight size={12} className="text-slate-300 dark:text-slate-600 group-hover:text-brand-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className={`text-[10px] mt-2 ${msg.sender === 'user' ? 'text-brand-100' : 'text-slate-400 dark:text-slate-500'}`}>
                {msg.timestamp}
              </p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-slate-50 dark:bg-slate-950">
        {[
          { label: 'Определить болезнь', icon: Sparkles },
          { label: 'Узнать цену', icon: ShoppingBag },
          { label: 'Найти покупателя', icon: User },
        ].map((action) => (
          <button
            key={action.label}
            onClick={() => handleSendMessage(action.label)}
            className="whitespace-nowrap px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 transition-colors flex items-center gap-2 shadow-sm"
          >
            <action.icon size={14} />
            {action.label}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl hover:bg-brand-50 dark:hover:bg-brand-950/30 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <PlusCircle size={20} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Введите сообщение..."
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-brand-500/20 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            className={`p-3 rounded-2xl transition-all ${
              inputValue.trim() 
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-100' 
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = ({ user, onUpdateUser, theme, setTheme }: { user: UserProfile; onUpdateUser: (u: UserProfile) => void; theme: Theme; setTheme: (t: Theme) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [activeTab, setActiveTab] = useState<'listings' | 'orders'>('listings');

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="pb-24 px-6 pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Редактировать профиль</h2>
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img 
                src={editedUser.avatar} 
                alt="Avatar" 
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-md bg-brand-50 object-cover"
              />
              <div className="absolute bottom-0 right-0 p-2 bg-brand-600 text-white rounded-full shadow-lg">
                <Camera size={16} />
              </div>
            </div>
            <div className="w-full">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Ссылка на аватар</label>
              <input 
                type="text" 
                value={editedUser.avatar}
                onChange={(e) => setEditedUser({ ...editedUser, avatar: e.target.value })}
                className="w-full mt-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-brand-500/20 text-slate-900 dark:text-white" 
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Имя</label>
              <input 
                type="text" 
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                className="w-full mt-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-brand-500/20 text-slate-900 dark:text-white" 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Локация</label>
              <input 
                type="text" 
                value={editedUser.location}
                onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                className="w-full mt-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-brand-500/20 text-slate-900 dark:text-white" 
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setIsEditing(false)}
              className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-bold active:scale-95 transition-transform"
            >
              Отмена
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 py-4 bg-brand-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-100 active:scale-95 transition-transform"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header Section */}
      <div className="px-6 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt="Avatar" 
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-800 shadow-lg bg-brand-50 object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{user.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">{user.role}</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1.5">
              <MapPin size={12} className="text-brand-500" />
              <span>{user.location}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="p-3 bg-slate-900 dark:bg-brand-600 text-white rounded-2xl shadow-lg shadow-slate-200 dark:shadow-brand-900/20 active:scale-95 transition-all"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Finance Section */}
      <div className="px-6 mt-10">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Финансы</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center hover:border-red-100 dark:hover:border-red-900/50 transition-colors">
            <div className="p-2.5 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-2xl mb-3">
              <ArrowDown size={22} />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">25 000</p>
            <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Расходы</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center hover:border-emerald-100 dark:hover:border-emerald-900/50 transition-colors">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 rounded-2xl mb-3">
              <ArrowUp size={22} />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">60 000</p>
            <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Продажи</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center bg-gradient-to-b from-white to-emerald-50/30 dark:from-slate-900 dark:to-emerald-950/10 border-emerald-100/50 dark:border-emerald-900/30">
            <div className="p-2.5 bg-brand-600 text-white rounded-2xl mb-3 shadow-md shadow-brand-100 dark:shadow-brand-900/40">
              <Wallet size={22} />
            </div>
            <p className="text-sm font-black text-emerald-600">+35 000</p>
            <p className="text-[10px] font-bold text-emerald-700/60 mt-1 uppercase tracking-wider">Прибыль</p>
          </div>
        </div>
      </div>

      {/* Activity Tabs */}
      <div className="px-6 mt-8">
        <div className="flex gap-4 border-b border-slate-100 dark:border-slate-800 mb-4">
          <button 
            onClick={() => setActiveTab('listings')}
            className={`pb-2 text-sm font-bold transition-colors relative ${
              activeTab === 'listings' ? 'text-brand-600' : 'text-slate-400'
            }`}
          >
            Мои объявления
            {activeTab === 'listings' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`pb-2 text-sm font-bold transition-colors relative ${
              activeTab === 'orders' ? 'text-brand-600' : 'text-slate-400'
            }`}
          >
            История заказов
            {activeTab === 'orders' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600" />
            )}
          </button>
        </div>

        <div className="space-y-3">
          {activeTab === 'listings' ? (
            MOCK_LISTINGS.slice(0, 2).map(item => (
              <div key={item.id} className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3">
                <img src={item.image} referrerPolicy="no-referrer" className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                  <p className="text-brand-600 font-bold text-xs mt-1">{item.price}</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 dark:text-slate-600" />
              </div>
            ))
          ) : (
            MOCK_ORDERS.map(order => (
              <div key={order.id} className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3">
                <img src={order.image} referrerPolicy="no-referrer" className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{order.productName}</h4>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 rounded-full font-bold">
                      {order.status === 'delivered' ? 'Доставлено' : order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-brand-600 font-bold text-xs">{order.price}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">{order.date}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="px-6 mt-10">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Статистика</h3>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm grid grid-cols-3 gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
          <div className="text-center">
            <p className="text-xl font-black text-slate-900 dark:text-white">3</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1.5 tracking-tighter">Активных объявлений</p>
          </div>
          <div className="text-center border-x border-slate-100 dark:border-slate-800">
            <p className="text-xl font-black text-slate-900 dark:text-white">12</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1.5 tracking-tighter">Продано товаров</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-black text-slate-900 dark:text-white">⭐ 4.8</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1.5 tracking-tighter">Рейтинг</p>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="px-6 mt-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Настройки</h3>
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          {[
            { label: 'Настройки профиля', icon: User },
            { label: 'Упаковка и доставка', icon: Package },
            { label: 'Язык (Русский)', icon: Globe },
            { label: 'Уведомления', icon: Bell },
          ].map((item, i) => (
            <button key={i} className={`w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${i !== 3 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg">
                  <item.icon size={18} />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 dark:text-slate-600" />
            </button>
          ))}
          
          {/* Theme Selector */}
          <div className="px-5 py-4 border-t border-slate-50 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg">
                <Moon size={18} />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Тема оформления</span>
            </div>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
              {[
                { id: 'light', label: 'Светлая', icon: Sun },
                { id: 'dark', label: 'Темная', icon: Moon },
                { id: 'system', label: 'Системная', icon: Settings },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as Theme)}
                  className={`flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all ${
                    theme === t.id 
                      ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <t.icon size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SellPage = () => {
  return (
    <div className="pb-24 px-6 pt-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Создать объявление</h2>
      
      <div className="space-y-6">
        {/* Photo Upload */}
        <div className="grid grid-cols-2 gap-4">
          <button className="aspect-square bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-600 hover:border-brand-500 hover:text-brand-600 transition-colors">
            <Camera size={32} />
            <span className="text-xs font-bold">Камера</span>
          </button>
          <button className="aspect-square bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-600 hover:border-brand-500 hover:text-brand-600 transition-colors">
            <ImageIcon size={32} />
            <span className="text-xs font-bold">Галерея</span>
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Название товара</label>
            <input type="text" placeholder="Например: Картофель Алладин" className="w-full mt-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-brand-500/20 text-slate-900 dark:text-white" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Цена (сом/кг)</label>
              <input type="number" placeholder="0" className="w-full mt-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-brand-500/20 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Вес (кг/тонн)</label>
              <input type="text" placeholder="Напр: 500 кг" className="w-full mt-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-brand-500/20 text-slate-900 dark:text-white" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Описание</label>
            <textarea rows={4} placeholder="Опишите ваш товар..." className="w-full mt-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-brand-500/20 resize-none text-slate-900 dark:text-white"></textarea>
          </div>
        </div>

        <button className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-100 dark:shadow-brand-900/20 active:scale-95 transition-transform">
          Опубликовать
        </button>
      </div>
    </div>
  );
};

const AIPhotoReport = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[40px] overflow-hidden shadow-2xl border border-white/10 dark:border-slate-800">
        <div className="p-8">
          <div className="w-20 h-20 bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Sparkles size={40} className="animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">AI Анализ Фото</h3>
          <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-8 leading-relaxed">
            Загрузите фото урожая, и я составлю полный отчет о качестве, сорте и рыночной стоимости.
          </p>
          
          <div className="space-y-3">
            <button className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-200 dark:shadow-brand-900/20 active:scale-95 transition-transform">
              <Camera size={20} /> Сделать фото
            </button>
            <button className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
              <ImageIcon size={20} /> Из галереи
            </button>
            <button 
              onClick={onClose}
              className="w-full py-4 text-slate-400 dark:text-slate-500 text-sm font-bold hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ReviewsSection = () => {
  const reviews = [
    { id: 1, name: 'Ольга', location: 'г. Люберцы', rating: 5, text: 'Прекрасный сервис и качественные продукты. Молочка и мясо на высоте. Цены на многие продукты ниже чем в магазинах.' },
    { id: 2, name: 'Иван', location: 'г. Бишкек', rating: 5, text: 'Очень удобно заказывать свежие овощи прямо с грядки. Доставка быстрая, все приехало в лучшем виде.' },
  ];

  return (
    <div className="mt-12 px-6">
      <div className="text-center mb-6 relative">
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-48 h-12 bg-brand-50/50 dark:bg-brand-950/20 rounded-full blur-xl"></div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          Отзывы <span className="text-brand-600 dark:text-brand-400">покупателей</span>
        </h3>
      </div>
      
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
        {reviews.map((review) => (
          <div key={review.id} className="min-w-[280px] bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{review.name}</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{review.location}</p>
              </div>
              <div className="flex gap-0.5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
              "{review.text}"
            </p>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-4 bg-brand-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-100 dark:shadow-brand-900/20 active:scale-95 transition-transform">
        Все отзывы
      </button>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    { q: 'Что такое EGIN?', a: 'EGIN — это маркетплейс для фермеров и покупателей.' },
    { q: 'Условия доставки', a: 'Доставка осуществляется курьером или самовывозом.' },
    { q: 'Как мы работаем?', a: 'Мы соединяем фермеров напрямую с покупателями.' },
    { q: 'Сборка заказа', a: 'Ваш заказ собирается фермером в день доставки.' },
    { q: 'Способы оплаты', a: 'Оплата картой или наличными при получении.' },
    { q: 'Процесс оплаты', a: 'Безопасная оплата через наше приложение.' },
  ];

  return (
    <div className="mt-12 px-6 pb-12">
      <div className="text-center mb-8 relative">
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-48 h-12 bg-brand-50/50 dark:bg-brand-950/20 rounded-full blur-xl"></div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          Вопросы и <span className="text-brand-600 dark:text-brand-400">ответы</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between group cursor-pointer hover:border-brand-200 dark:hover:border-brand-800 transition-colors">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-tight pr-2">{faq.q}</span>
            <ChevronDown size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-brand-600 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};

const NewsDetailsPage = ({ news }: { news: NewsItem }) => {
  const [comment, setComment] = useState('');
  const [reactions, setReactions] = useState(news.reactions);

  const handleAddReaction = (type: string) => {
    setReactions(prev => prev.map(r => r.type === type ? { ...r, count: r.count + 1 } : r));
  };

  return (
    <div className="pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <img src={news.image} alt={news.title} className="w-full h-64 object-cover" referrerPolicy="no-referrer" />
      <div className="px-6 -mt-8 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-[40px] p-8 shadow-xl border border-slate-50 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {news.date}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{news.author}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-6">{news.title}</h2>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {news.content.split('\n\n').map((para, i) => (
              <p key={i} className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{para}</p>
            ))}
          </div>

          {/* Reactions */}
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Реакции</h4>
            <div className="flex flex-wrap gap-2">
              {reactions.map((r, i) => (
                <button 
                  key={i}
                  onClick={() => handleAddReaction(r.type)}
                  className="px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-2xl flex items-center gap-2 transition-colors border border-slate-100 dark:border-slate-700"
                >
                  <span className="text-lg">{r.type}</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{r.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Комментарии ({news.comments.length})</h4>
            
            <div className="space-y-6 mb-8">
              {news.comments.map((c) => (
                <div key={c.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{c.user}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{c.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Оставьте ваш комментарий..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl py-4 px-5 text-sm focus:ring-2 focus:ring-brand-500/20 resize-none text-slate-900 dark:text-white"
                rows={3}
              />
              <button 
                disabled={!comment.trim()}
                className="absolute right-3 bottom-3 p-2 bg-brand-600 text-white rounded-2xl disabled:opacity-50 disabled:bg-slate-300 dark:disabled:bg-slate-700 transition-all"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommunitiesPage = ({ onCategoryClick }: { onCategoryClick: (cat: CommunityCategory) => void }) => {
  return (
    <div className="pb-24 px-6 pt-6">
      <div className="bg-brand-900 rounded-[40px] p-8 text-white mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Сообщества</h2>
          <p className="text-brand-200 text-sm opacity-80">Общайтесь, делитесь опытом и находите единомышленников в агро-сфере.</p>
        </div>
        <Users className="absolute -bottom-6 -right-6 text-brand-800 opacity-20" size={160} />
      </div>

      <div className="grid gap-4">
        {MOCK_COMMUNITIES.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => onCategoryClick(cat)}
            className="flex items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-brand-200 dark:hover:border-brand-800 transition-all group"
          >
            <div className="w-14 h-14 bg-brand-50 dark:bg-brand-950/30 rounded-2xl flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
              <cat.icon size={28} />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold text-slate-900 dark:text-white">{cat.name}</h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{cat.chats.length} активных чатов</p>
            </div>
            <ChevronRight size={20} className="text-slate-300 dark:text-slate-600" />
          </button>
        ))}
      </div>
    </div>
  );
};

const ChatListPage = ({ category, onChatClick }: { category: CommunityCategory; onChatClick: (chat: CommunityChat) => void }) => {
  return (
    <div className="pb-24 px-6 pt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-50 dark:bg-brand-950/30 rounded-xl flex items-center justify-center text-brand-600 dark:text-brand-400">
          <category.icon size={20} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{category.name}</h2>
      </div>

      <div className="space-y-3">
        {category.chats.map((chat) => (
          <button 
            key={chat.id}
            onClick={() => onChatClick(chat)}
            className="w-full flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-brand-100 dark:hover:border-brand-900 transition-all"
          >
            <img src={chat.image} alt={chat.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" referrerPolicy="no-referrer" />
            <div className="flex-1 text-left min-w-0">
              <h4 className="font-bold text-slate-900 dark:text-white truncate">{chat.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">{chat.lastMessage}</p>
              <div className="flex items-center gap-2 mt-2">
                <Users size={12} className="text-slate-300 dark:text-slate-600" />
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">{chat.members} участников</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300 dark:text-slate-600" />
          </button>
        ))}
      </div>
    </div>
  );
};

const ChatRoomPage = ({ chat }: { chat: CommunityChat }) => {
  const [messages, setMessages] = useState([
    { id: '1', user: 'Алексей', text: 'Всем привет! Кто уже начал посевную?', time: '10:00', isMe: false },
    { id: '2', user: 'Мария', text: 'Мы в Чуйской области уже начали картофель сажать.', time: '10:05', isMe: false },
    { id: '3', user: 'Вы', text: 'А какой сорт используете?', time: '10:10', isMe: true },
    { id: '4', user: 'Мария', text: 'В основном Алладин и Розара.', time: '10:12', isMe: false },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, {
      id: Date.now().toString(),
      user: 'Вы',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-slate-50 dark:bg-slate-950">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
            {!msg.isMe && <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 ml-2">{msg.user}</span>}
            <div className={`max-w-[80%] p-4 rounded-3xl text-sm ${
              msg.isMe 
                ? 'bg-brand-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-800'
            }`}>
              {msg.text}
              <div className={`text-[10px] mt-1 ${msg.isMe ? 'text-brand-200' : 'text-slate-300 dark:text-slate-600'} text-right`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button className="p-3 text-slate-400 dark:text-slate-500 hover:text-brand-600 transition-colors">
            <PlusCircle size={24} />
          </button>
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Напишите сообщение..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-brand-500/20 text-slate-900 dark:text-white"
          />
          <button 
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="p-3 bg-brand-600 text-white rounded-2xl disabled:opacity-50 transition-all"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatFAB = () => null;

const BottomNav = ({ activeTab, onTabChange }: { activeTab: View; onTabChange: (t: View) => void }) => {
  const tabs = [
    { id: 'home', label: 'Главная', icon: Home },
    { id: 'market', label: 'Рынок', icon: LayoutGrid },
    { id: 'ai', label: 'AI помощник', icon: Sparkles, special: true },
    { id: 'communities', label: 'Сообщества', icon: Users },
    { id: 'settings', label: 'Профиль', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-100 dark:border-slate-800 px-4 py-2 flex justify-between items-end z-50 max-w-md mx-auto h-20">
      {tabs.map((item) => (
        <button 
          key={item.id}
          onClick={() => onTabChange(item.id as View)}
          className={`flex flex-col items-center transition-all relative ${
            item.special 
              ? 'mb-4' 
              : 'pb-1'
          } ${activeTab === item.id ? 'text-brand-600' : 'text-slate-400 dark:text-slate-500'}`}
        >
          {item.special ? (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90 ${
              activeTab === item.id 
                ? 'bg-brand-600 text-white shadow-brand-200 dark:shadow-brand-900/20' 
                : 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 border-2 border-brand-100 dark:border-slate-800'
            }`}>
              <item.icon size={32} className={activeTab === item.id ? 'fill-white/20' : ''} />
            </div>
          ) : (
            <item.icon size={22} className={activeTab === item.id ? 'fill-brand-50 dark:fill-brand-900/20' : ''} />
          )}
          <span className={`text-[10px] font-bold mt-1 ${item.special ? 'absolute -bottom-5 whitespace-nowrap' : ''}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('market');
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system';
    }
    return 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (t: Theme) => {
      let isDark = t === 'dark';
      if (t === 'system') {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(MOCK_PRODUCTS[0]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedCommunityCategory, setSelectedCommunityCategory] = useState<CommunityCategory | null>(null);
  const [selectedChat, setSelectedChat] = useState<CommunityChat | null>(null);
  const [showAIReport, setShowAIReport] = useState(false);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);

  const handleListingClick = (id: string) => {
    // Find in mock products or listings
    const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
    setSelectedProduct(product);
    setView('details');
  };

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setView('news_details');
  };

  const handleCommunityCategoryClick = (cat: CommunityCategory) => {
    setSelectedCommunityCategory(cat);
    setView('community_chats');
  };

  const handleChatClick = (chat: CommunityChat) => {
    setSelectedChat(chat);
    setView('chat_room');
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <main className="pb-24 -mt-24">
            <UnifiedAICard />
            <div className="relative z-20 -mt-10 bg-white dark:bg-slate-950 rounded-t-[3rem] pt-10">
              <ActionButtons onMarketClick={() => setView('market')} />
              <ListingsSection onListingClick={handleListingClick} />
              <NewsSection onNewsClick={handleNewsClick} />
              <BlogSection onPostClick={handleNewsClick} />
              <ReviewsSection />
              <FAQSection />
            </div>
          </main>
        );
      case 'market':
        return <MarketplacePage onProductClick={handleListingClick} onAddClick={() => setView('sell')} />;
      case 'details':
        return selectedProduct ? (
          <ProductDetailsPage 
            product={selectedProduct} 
            onChatClick={(seller) => {
              setSelectedChat({
                id: 'seller-' + selectedProduct.id,
                name: seller.name,
                lastMessage: 'Здравствуйте! Я по поводу ' + selectedProduct.name,
                members: 2,
                image: seller.avatar
              });
              setView('chat_room');
            }}
          />
        ) : null;
      case 'news_details':
        return selectedNews ? <NewsDetailsPage news={selectedNews} /> : null;
      case 'ai':
        return <AIAssistantPage />;
      case 'communities':
        return <CommunitiesPage onCategoryClick={handleCommunityCategoryClick} />;
      case 'community_chats':
        return selectedCommunityCategory ? <ChatListPage category={selectedCommunityCategory} onChatClick={handleChatClick} /> : null;
      case 'chat_room':
        return selectedChat ? <ChatRoomPage chat={selectedChat} /> : null;
      case 'sell':
        return <SellPage />;
      case 'settings':
        return <ProfilePage user={user} onUpdateUser={setUser} theme={theme} setTheme={setTheme} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 px-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mb-4">
              <LayoutGrid size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Раздел в разработке</h3>
            <p className="text-sm mt-2">Мы работаем над тем, чтобы сделать этот раздел доступным как можно скорее.</p>
            <button 
              onClick={() => setView('home')}
              className="mt-6 px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold"
            >
              Вернуться на главную
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 max-w-md mx-auto shadow-2xl relative transition-colors duration-300">
      <Header 
        title={
          view === 'details' ? (selectedProduct?.name || 'Детали') : 
          view === 'market' ? 'Рынок' : 
          view === 'home' ? 'EGIN' : 
          view === 'ai' ? 'AI Помощник' : 
          view === 'communities' ? 'Сообщества' :
          view === 'community_chats' ? (selectedCommunityCategory?.name || 'Чаты') :
          view === 'chat_room' ? (selectedChat?.name || 'Чат') :
          view === 'news_details' ? 'Новости' :
          view === 'sell' ? 'Продать' :
          view === 'settings' ? 'Профиль' : 'EGIN'
        } 
        location={view === 'market' ? 'Бишкек, Кыргызстан' : undefined}
        showBack={view !== 'home'}
        onBack={() => {
          if (view === 'details') setView('market');
          else if (view === 'news_details') setView('home');
          else if (view === 'community_chats') setView('communities');
          else if (view === 'chat_room') setView('community_chats');
          else setView('home');
        }}
        onAIClick={() => setView('ai')}
        onMessageClick={() => setView('communities')}
        onCartClick={() => setView('market')}
        onAddClick={view === 'market' ? () => setView('sell') : undefined}
        isHome={view === 'home'}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={view + (selectedProduct?.id || '') + (selectedNews?.id || '') + (selectedChat?.id || '')}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showAIReport && <AIPhotoReport onClose={() => setShowAIReport(false)} />}
      </AnimatePresence>

      {view === 'home' && (
        <>
          <ChatFAB />
        </>
      )}

      <BottomNav activeTab={view === 'community_chats' || view === 'chat_room' ? 'communities' : view} onTabChange={(t) => setView(t)} />
    </div>
  );
}
