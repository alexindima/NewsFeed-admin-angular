import React, {useEffect, useRef} from "react";
import Spinner from "./Spinner";
import NoResult from "./NoResult";

interface IInfinityScrollProps {
    children: JSX.Element | JSX.Element[]
    action: Function
    loading: boolean
    noResults: boolean
}

const InfinityScroll = (props: IInfinityScrollProps) => {
    const LOAD_ON_POSITION = 2000

    let wasLoading = useRef(false)
    let loadMoreDOM = useRef<HTMLDivElement>(null)

    const setAction = () => {
        props.action()
    }

    useEffect(() => {
        const ScrollHandle = () => {
            if (loadMoreDOM.current) {
                if (loadMoreDOM.current.getBoundingClientRect().bottom < LOAD_ON_POSITION) {
                    if (!wasLoading.current) {
                        wasLoading.current = true
                        setAction()
                    }
                } else {
                    wasLoading.current = false
                }
            }
        }
        window.addEventListener('scroll', ScrollHandle)
        return () => {
            window.removeEventListener('scroll', ScrollHandle)
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {props.children}
            <div ref={loadMoreDOM} onClick={setAction}>
                {props.loading && <Spinner color={"#000000"} size={20}/>}
                {props.noResults && <NoResult/>}
            </div>
        </>
    )
}

export default InfinityScroll