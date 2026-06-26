'use server'

import { createClient } from "@/utils/supabase/server"
import { LoginErrorType } from "./error-type"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function login(_prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string | null
  const password = formData.get('password') as string | null

  if (!email)
    return LoginErrorType.NO_EMAIL
  if (!password)
    return LoginErrorType.NO_PASSWORD

  const supabase = createClient(await cookies())

  const { error } = await supabase.auth.signInWithPassword({
    email, password
  })

  switch (error?.code) {
    case 'invalid_credentials':
      return LoginErrorType.UNAUTHED
  }

  redirect('/')
  return null
}
