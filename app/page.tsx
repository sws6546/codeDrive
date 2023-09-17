import { login } from "@/lib/serverActions"
import { cookies } from 'next/headers'

export default function Home() {
  const cookieFlash = cookies().get("flash")
  
  return (
      <form action={login} className="w-full h-screen md:w-1/3 m-auto flex flex-col justify-center gap-4 text-white" autoComplete="off">
        <input type="text" name="username" placeholder="Username" className="p-4 rounded-xl bg-black border border-white
        transition hover:shadow-md hover:shadow-white focus:shadow-md focus:shadow-white outline-none"/>
        <input type="password" name="password" placeholder="Password" className="p-4 rounded-xl bg-black border border-white
        transition hover:shadow-md hover:shadow-white focus:shadow-md focus:shadow-white outline-none"/>
        {
          cookieFlash?.value
        }
        <input type="submit" value="Log In" className="border border-white p-4 rounded-xl
        transition hover:shadow-md hover:shadow-white focus:shadow-md focus:shadow-white cursor-pointer"/>
      </form>
  )
}
