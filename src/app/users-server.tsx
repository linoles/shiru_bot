import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import ClientComponent from '@/src/app/users-client'

export default async function UsersServer() {
  const supabase = await createClient(cookies())
  const { data: users } = await supabase.from('users').select()
  
  return <ClientComponent initialUsers={users || []} />
}
