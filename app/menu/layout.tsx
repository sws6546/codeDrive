import { redirect } from 'next/navigation'
import { cookies } from "next/headers"
import { logOut } from '@/lib/serverActions'
import jwt from 'jsonwebtoken'
import Link from 'next/link'

export default async function RootLayout({ children, }: {  children: React.ReactNode }) {

    const token = cookies().get('jwt')?.value
    if(token === undefined) {
        redirect("/")
    } else {
        jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
            if(err){
                redirect("/")
            }
        })
    }

    return (
        <div className='text-white'>
            <nav className='border-white border-b p-4 flex flex-row justify-between pl-6 pr-6 items-center mb-4'>
                <h1 className='text-xl font-bold'>Witaj {cookies().get("user")?.value}</h1>
                <div className='flex flex-row gap-4 items-center'>
                    <Link href={"/menu/add"} className='border border-white rounded-xl p-2 pl-4 pr-4 transition hover:shadow-md hover:shadow-white'>+</Link>
                    <form action={logOut}><input type="submit" value="Log Out" className='border border-white p-2 rounded-xl pl-4 pr-4
                    transition hover:shadow-md hover:shadow-white cursor-pointer'/></form>
                </div>
                
            </nav>
            {children}
        </div>
    )
}