import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import ClientComponent from '@/src/app/users-client'

export default async function UsersServer() {
  const supabase = await createClient(cookies());
  
  // 1. Проверка подключения
  console.log('Supabase client created');

  // 2. Запрос к games с debug
  const { data: games, error: gamesError } = await supabase
    .from('games')
    .select('*')
    .limit(1); // Тест: запросим только 1 запись

  console.log('Games data:', games);
  console.log('Games error:', gamesError);

  // 3. Проверка users для сравнения
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*');

  if (gamesError) {
    console.error('Games fetch failed:', gamesError);
    return <div>Error loading games: {gamesError.message}</div>;
  }
  
  return <ClientComponent initialUsers={[users || [], games]} />
}
