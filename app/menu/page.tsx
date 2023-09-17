import { cookies } from "next/headers"
import { PrismaClient } from '@prisma/client'
import Link from "next/link"

export default async function Menu() {
    const prisma = new PrismaClient()
    const [{ projects }] = await prisma.user.findMany({
        where: {
            name: {
                equals: cookies().get('user')?.value
            }
        },
        include: {
            projects: true
        }
    })

    return (
        <section>
            <div className="w-full bodrer border-white flex flex-row flex-wrap p-4 gap-4 cursor-pointer">
                {
                    projects.map((projectData, id) => (
                        <Link href={`/menu/project/${projectData.id}`} key={id} className="border rounded-xl p-4 text-center flex flex-col gap-2 transition hover:shadow-md hover:shadow-white">
                            <h1 className="text-xl font-bold">{projectData.name}</h1>
                            <div className="flex flex-row justify-between gap-4">
                                <p className="text-sm text-slate-300">
                                    {projectData.addedDate.getDate()}{` `}
                                    {projectData.addedDate.getMonth()}{` `}
                                    {projectData.addedDate.getFullYear()}{` `}
                                </p>
                                <p className="text-sm text-slate-300">{cookies().get('user')?.value}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}
