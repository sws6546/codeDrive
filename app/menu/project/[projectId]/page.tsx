import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"

export default async function Project({ params }: { params: { projectId: string }}) {

    const prisma = new PrismaClient()
    const project = await prisma.project.findMany({
        where: {
            id: {
                equals: params.projectId
            }
        },
        include: {
            codes: true
        }
    })

    if(project.length == 0){
        notFound()
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold text-center">{project[0].name}</h1>
            <p className="text-sm text-slate-300 text-center">
                {project[0].addedDate.getDate()}{" "}
                {project[0].addedDate.getMonth()}{" "}
                {project[0].addedDate.getFullYear()}{" "}
            </p>
            {
                project[0].codes.map((code, key) => (
                    <div key={key} className="
                    m-auto p-4 border border-white rounded-xl
                    ">
                        {
                            code.code.split("<brr />").map((line, keyLine) => (
                                <p key={keyLine}>{line
                                    .replaceAll(" ", "\u00A0")
                                    .replaceAll("<", "\u003c")
                                    }</p>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}
