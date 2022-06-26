import {
    useSearchParams,
    useNavigate,
    useCatch,
    useFetcher,
    useSubmit,
    useLoaderData, Link
} from "@remix-run/react";
import {json, redirect} from "@remix-run/node";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export const meta = () => ({
    charset: "utf-8",
    title: "CounterTag",
    viewport: "width=device-width,initial-scale=1",
});

export const loader = async ({params,request}) => {
    console.log("CounterTag:loader")
    return json([
        {id: "1", name: "genres", value: "movies", text: "电影"},
        {id: "2", name: "genres", value: "tvShows", text: "电视剧"},
    ]);
};

export async function action({request}) {
    console.log("CounterTag:action")
    const formData = await request.formData();
    return redirect(`/counter/tag4?search=${formData.get("search")}`);
}

export default function CounterTag() {
    console.log("CounterTag")

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const handleNavigate = () => {
        searchParams.set("search", search)
        navigate(`/counter/tag1?${searchParams.toString()}`)
    }

    const fetcher = useFetcher();
    const handleFetcher = () => {
        // searchParams.set("search", "search4,search5")
        // fetcher.load("/counter/tag4?"+searchParams.toString())
        fetcher.submit({ search }, { method: "post", action: "/counter/tag2" });
    }

    const submit = useSubmit()
    const handleSubmit = () => {
      submit({ search }, { method: "get", action: "/counter/tag3" })
    }

    const [search, setSearch] = useState(searchParams.get("search")||undefined)
    useEffect(
        () => {
            console.log("CounterTag:useEffect")
            handleSubmit()
        },
        [search]
    )

    const count = useSelector((state) => state.counter.value)

    const tags = useLoaderData();
    return (
        <>
            <ul>
                <li>CounterTag</li>
                <li>{count}</li>
                <li><Link to="..">to /counter</Link></li>
            </ul>
            <ul>
                <li><button onClick={handleNavigate}>navigate</button></li>
                <li><button onClick={handleFetcher}>fetcher</button></li>
                <li><button onClick={handleSubmit}>submit</button></li>
            </ul>
            <ul>
                <li><input type="text" onChange={(event)=>{setSearch(event.target.value)}} value={search}/></li>
                <li>search: {search==='remix' && <span>{search}</span>}</li>
            </ul>
            <ul>{tags.map((tag)=><li key={tag.id}>{tag.text}</li>)}</ul>
        </>
    )
}

export function ErrorBoundary({ error }) {
    console.error("CounterTag:ErrorBoundary")
    return (
        <>
            <ul>
                <li>CounterTag:ErrorBoundary</li>
                <li>{error.message}</li>
            </ul>
        </>
    );
}

export function CatchBoundary() {
    console.error("CounterTag:CatchBoundary")
    const caught = useCatch();
    return (
        <>
            <ul>
                <li>CounterTag:CatchBoundary</li>
                <li>{caught.statusText}</li>
            </ul>
        </>
    );
}
