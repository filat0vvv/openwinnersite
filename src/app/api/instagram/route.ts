import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url, platform, type, options } = await req.json();

    if (!url) {
      return NextResponse.json({ success: false, error: 'Введите ссылку' }, { status: 400 });
    }

    // В зависимости от платформы вызываем нужную функцию
    switch (platform) {
      case 'instagram':
        return await handleInstagram(url, type, options);
      case 'youtube':
        return await handleYouTube(url, type, options);
      case 'vk':
        return await handleVK(url, type, options);
      case 'telegram':
        return await handleTelegram(url, type, options);
      default:
        // Если платформа еще не настроена, отдаем мок-данные, чтобы сайт не падал
        return NextResponse.json({ 
          success: true, 
          participants: [{username: "Скоро подключим " + platform}] 
        });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
  }
}

// --- ОБРАБОТЧИК VK (Самый простой для старта) ---
async function handleVK(url: string, type: string, options: any) {
  // Логика: 1. Получаем ID поста из URL. 2. Делаем запрос к VK API (likes.getList или wall.getComments)
  // Для работы нужен Сервисный ключ доступа VK
  const mockVK = [
    { username: "vk_winner_1" }, { username: "ivan_v_kurse" }, { username: "pro_repost" }
  ];
  return NextResponse.json({ success: true, participants: mockVK });
}

// --- ОБРАБОТЧИК YOUTUBE ---
async function handleYouTube(url: string, type: string, options: any) {
  // Логика: Используем YouTube Data API v3
  const mockYT = [
    { username: "YouTube_Fan_99" }, { username: "Sub_Master" }, { username: "Cmt_Watcher" }
  ];
  return NextResponse.json({ success: true, participants: mockYT });
}

// --- ОБРАБОТЧИК INSTAGRAM ---
async function handleInstagram(url: string, type: string, options: any) {
  // Пока используем твой список участников для теста
  const mockInsta = [
    { username: "@alex_winner" }, { username: "@maria_nice" }, { username: "@ivan_777" }
  ];
  return NextResponse.json({ success: true, participants: mockInsta });
}

// --- ОБРАБОТЧИК TELEGRAM ---
async function handleTelegram(url: string, type: string, options: any) {
  return NextResponse.json({ success: true, participants: [{username: "@tg_user"}] });
}