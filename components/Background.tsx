'use client'

import { useRef, useEffect } from "react"

export default function Background() {
    const element = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e 
            if (element.current) {
                element.current.animate({
                    left: `${clientX}px`,
                    top: `${clientY}px`
                }, {duration: 10000, fill: "forwards"});
            }
        })
    }, [])
    

    return (
        <div className="fixed w-full h-full top-0 left-0 -z-20"
        style={{
            filter: "blur(200px)"
        }}>
            <div ref={element} className="fixed w-[600px] h-[500px] bg-white -z-20 opacity-30 rounded-full 
            animate-[spin_20s_linear_infinite]"
            style={{
                top: '50%',
                left: '50%',
                translate: "-50% -50%"
            }}></div>
        </div>
    )
}