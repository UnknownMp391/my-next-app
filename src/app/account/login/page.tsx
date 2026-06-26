'use client'

import { useActionState } from "react"
import { login } from "./actions";
import { LoginErrorType } from "./error-type";

function typeToMsg(type: LoginErrorType) {
  switch (type) {
    case LoginErrorType.NO_EMAIL:
      return 'Please input e-mail.'
    case LoginErrorType.NO_PASSWORD:
      return 'Please input password.'
    case LoginErrorType.UNAUTHED:
      return 'Invalid credentials.'
  }
}

export default function Help() {
  const [state, formAction, isPending] = useActionState(login, null);

  return <>
    <h1>Login</h1>
    <form action={formAction}>
      <p><label>E-Mail: <input name="email" type="email" required></input></label></p>
      <p><label>Password: <input name="password" type="password" required></input></label></p>
      <p><button type="submit">Submit</button></p>
      <p>{state ? typeToMsg(state) : null}</p>
    </form>
  </>
}