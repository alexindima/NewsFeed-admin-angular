import React, {useContext, useEffect, useRef, useState} from "react";
import { HiOutlineSearchCircle } from 'react-icons/hi';
import { MdManageSearch } from 'react-icons/md';
import "./Search.scss"
import classNames from "classnames";
import {siteContext} from "../../Context/SiteContext";

const Search = () => {
    const searchPhrase          = useContext(siteContext).searchPhrase
    const chooseSearchPhrase    = useContext(siteContext).chooseSearchPhrase

    const [searchInputValue, setSearchInputValue] = useState('')
    const [searchIsClosed, setSearchIsClosed] = useState(true)

    const searchInputDOM    = useRef<HTMLInputElement>(null)
    const searchWindowDOM   = useRef(null)

    useEffect(() => {
        if (!searchIsClosed) {
            searchInputDOM.current!.focus();
        }

    }, [searchIsClosed])

    const showOrHideSearch = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target !== searchWindowDOM.current) && (event.target !== searchInputDOM.current)) {
            setSearchIsClosed(!searchIsClosed)
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        chooseSearchPhrase(searchInputValue)
        setSearchIsClosed(true)
        setSearchInputValue("")
    };

    const searchWindowClass = classNames({
        "icon-wrapper__popup": true,
        "hidden": searchIsClosed,
    })
    return (
        <div className="icon-wrapper" onClick={showOrHideSearch}>
            {!!searchPhrase || <HiOutlineSearchCircle id="search" className="icon-wrapper__img" title="Search" />}
            {!!searchPhrase && <MdManageSearch id="search" className="icon-wrapper__img" title="Search" />}
            <div className={searchWindowClass}>
                <div ref={searchWindowDOM} className="search-window">
                    <form onSubmit={handleSubmit} className="search-form">
                        <label className="search-form__label">
                            <input ref={searchInputDOM} type="text" className="search-form__input" placeholder="Search"
                                   value={searchInputValue} onChange={(event) => {
                                       setSearchInputValue(event.target.value)
                                   }} />
                        </label>
                        <button type="submit" className="search-form__button">Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Search