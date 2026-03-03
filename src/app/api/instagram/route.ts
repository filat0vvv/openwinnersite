import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // Регулярное выражение для поиска ID поста (shortcode)
    const match = url.match(/(?:p|reel|reels)\/([A-Za-z0-9_-]+)/);
    const shortcode = match ? match[1] : null;

    if (!shortcode) {
      return NextResponse.json({ success: false, error: 'Неверная ссылка на пост' }, { status: 400 });
    }

    // ВНИМАНИЕ: Здесь мы подключаем парсер. 
    // Пока что используем имитацию реальной задержки сети (2 секунды)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Это "скелет" данных, которые придут от настоящего Instagram API
    const mockComments = [
      { username: "filat0vvv", text: "Участвую! 🔥" },
      { username: "ivan_ivanov", text: "Хочу приз @friend" },
      { username: "super_girl_2026", text: "Удачи всем!" },
      { username: "denis_tech", text: "OpenWinner топ" },
      { username: "crypto_bob", text: "Надеюсь на победу" }
    ];

    return NextResponse.json({ 
      success: true, 
      participants: mockComments,
      count: mockComments.length 
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
  }
}