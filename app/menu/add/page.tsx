'use client'

import { addProject } from "@/lib/serverActions";
import { useState } from "react"

export default function Add() {
    const [codesNumber, setCodesNumber] = useState(1);
    const [codes, setCodes] = useState<string[]>([])
    const [errMsg, setErrMsg] = useState<string>("")

    return (
        <div>
            <form action={async formData => {
                let ok = true
                if(formData.get('title')?.length == 0){
                    ok = false
                    setErrMsg("Nie wszystkie pola są wypełnione")
                }
                if(codes.length == 0){
                    ok = false
                    setErrMsg("Nie wszystkie pola są wypełnione")
                }
                if(ok){
                    const res = await addProject(formData.get("title") as string, codes) as {err: string}
                    if(res.err.length != 0){
                        setErrMsg(res.err)
                    }
                }
            }} className='m-auto w-full md:w-2/3 flex flex-col justify-center gap-4'>
                <input type="text" name='title' placeholder='Tytuł' className='
                p-4 rounded-xl bg-black border border-white
                transition hover:shadow-md hover:shadow-white focus:shadow-md focus:shadow-white outline-none
                '/>
                { errMsg.length != 0 ?
                    errMsg
                :""}
                {
                    Array.from({ length: codesNumber }, (_, i) => (
                        <textarea cols={30} rows={10} key={i} className="
                        p-4 rounded-xl bg-black border border-white
                        transition hover:shadow-md hover:shadow-white focus:shadow-md focus:shadow-white outline-none
                        " placeholder={`kod ${i + 1}`}
                        onChange={(e) => {
                            setCodes(code => [...code.slice(0, i), e.target.value.replace(/\r?\n/g, "<brr />"), ...code.slice(i + 1)])
                            console.log(codes)
                        }}></textarea>
                    ))
                }
                <div className="border border-white rounded-xl p-2 pl-4 pr-4 transition hover:shadow-md hover:shadow-white cursor-pointer text-center
                " onClick={e => setCodesNumber(number => number + 1)}>Add 1 code</div>
                <input type="submit" value="Zatwierdź" />
            </form>
        </div>
    )
}
