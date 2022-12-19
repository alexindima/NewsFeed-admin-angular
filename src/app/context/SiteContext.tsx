import * as React from "react";
import {createContext, MouseEventHandler, useContext, useEffect, useRef, useState} from "react";
import {ContextProps} from "../../types/ContextProps";
import {SiteState} from "../../types/SiteState";
import {Category} from "../../types/Category";
import {ITag} from "../../types/Tag";
import {apiContext} from "./ApiContext";
import {useNavigate} from "react-router-dom";

interface ISiteContext {
    siteState: SiteState | null;
    setSiteState: Function;
    suggestedNews: number[] | null;
    chooseCategory: Function;
    clearCategory: MouseEventHandler<HTMLDivElement>;
    chooseTag: Function;
    clearTag: MouseEventHandler<HTMLDivElement>;
    chooseSearchPhrase: Function;
    clearSearchPhrase: MouseEventHandler<HTMLDivElement>;
    setSingleArticle: Function;
    clearSingleArticle: Function;
    siteCategoryList: Category[] | null;
    siteTagList: ITag[] | null;
    goHome: MouseEventHandler<HTMLDivElement>;
}

export const siteContext = createContext<ISiteContext>({
    siteState: null,
    setSiteState: () => {
    },
    suggestedNews: null,
    chooseCategory: () => {
    },
    clearCategory: () => {
    },
    chooseTag: () => {
    },
    clearTag: () => {
    },
    chooseSearchPhrase: () => {
    },
    clearSearchPhrase: () => {
    },
    setSingleArticle: () => {
    },
    clearSingleArticle: () => {
    },
    siteCategoryList: null,
    siteTagList: null,
    goHome: () => {
    },
});

const SiteContext = (props: ContextProps) => {
    const navigate = useNavigate();

    const lastUrl = useRef("")

    const [siteState, setSiteState] = useState<SiteState | null>(null);
    const [siteCategoryList, setSiteCategoryList] = useState<Category[] | null>(
        null
    ); //нужно теперь хранить для Back элемента
    const [siteTagList, setSiteTagList] = useState<ITag[] | null>(null); //то же самое
    const [suggestedNews, setSuggestedNews] = useState<number[] | null>(null);

    const fetchCategories = useContext(apiContext).fetchCategories;
    const fetchTags = useContext(apiContext).fetchTags;
    const fetchSuggestedNews = useContext(apiContext).fetchSuggestedNews;

    const setStateWithCheck = (state: SiteState) => {
        if (!(state?.category || state?.tag || state?.search)) {
            setSiteState(null);
            goHome();
        } else {
            setSiteState(state);
        }
    };

    const chooseCategory = (category: number) => {
        setSiteState({
            ...siteState,
            category: category,
            isSingleArticle: null,
        } as SiteState);
    };

    const clearCategory = () => {
        setStateWithCheck({...siteState, category: null} as SiteState);
    };

    const chooseTag = (tag: number) => {
        setSiteState({
            ...siteState,
            tag: tag,
            isSingleArticle: null,
        } as SiteState);
    };

    const clearTag = () => {
        setStateWithCheck({...siteState, tag: null} as SiteState);
    };

    const chooseSearchPhrase = (search: string) => {
        setStateWithCheck({
            ...siteState,
            search: search,
            isSingleArticle: null,
        } as SiteState);
    };

    const clearSearchPhrase = () => {
        setStateWithCheck({...siteState, search: null} as SiteState);
    };

    const setSingleArticle = () => {
        setSiteState({isSingleArticle: true} as SiteState);
    };

    const clearSingleArticle = () => {
        setSiteState(null);
    };

    const goHome = () => {
        setSiteState(null);
        navigate("/");
    };

    useEffect(() => {
        const fetch = async () => {
            const list = await fetchCategories!();
            setSiteCategoryList(list);
        };
        fetch();
    }, [fetchCategories]);

    useEffect(() => {
        const fetch = async () => {
            const list = await fetchTags!();
            setSiteTagList(list);
        };
        fetch();
    }, [fetchTags]);

    useEffect(() => {
        const fetch = async () => {
            const news = await fetchSuggestedNews!();
            setSuggestedNews(news);
        };
        fetch();
    }, [fetchSuggestedNews]);

    useEffect(() => {
        if (siteState) {
            if (!siteState.isSingleArticle) {
                let query = "";
                if (siteState?.category) {
                    query += "category=" + siteState.category;
                }
                if (siteState?.tag) {
                    if (query) query += "&";
                    query += "tag=" + siteState.tag;
                }
                if (siteState?.search) {
                    if (query) query += "&";
                    query += "search=" + siteState.search;
                }
                if (query !== lastUrl.current) {
                    lastUrl.current = query
                    navigate(`/?${query}`);
                }

            }
        }
    }, [siteState, navigate]);

    const value: ISiteContext = {
        siteState,
        setSiteState,
        suggestedNews,
        chooseCategory,
        clearCategory,
        chooseTag,
        clearTag,
        chooseSearchPhrase,
        clearSearchPhrase,
        setSingleArticle,
        clearSingleArticle,
        siteCategoryList,
        siteTagList,
        goHome,
    };

    return (
        <siteContext.Provider value={value}>{props.children}</siteContext.Provider>
    );
};

export default SiteContext;
