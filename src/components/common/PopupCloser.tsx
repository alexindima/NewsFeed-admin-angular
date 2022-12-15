import React, {useEffect, useRef, useState} from "react";

interface IPopupCloserProps {
    children: JSX.Element
}

const PopupCloser = (props: IPopupCloserProps) => {
    const {children} = props

    const [wasClick, setWasClick] = useState(false)
    let childWithProps = React.cloneElement(children, {
        wasClick: wasClick
    })
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target instanceof Node && ref.current && !ref.current.contains(event.target)) {
                setWasClick(() => !wasClick)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    })

    return (
        <div ref={ref}>{childWithProps}</div>
    )
}

export default PopupCloser