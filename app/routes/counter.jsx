import React from 'react'
import { useSelector} from 'react-redux'
import {Outlet} from "@remix-run/react";

export const meta = () => ({
    charset: "utf-8",
    title: "Counter",
    viewport: "width=device-width,initial-scale=1",
});

export default function Counter() {
    console.log("Counter")
    const count = useSelector((state) => state.counter.value)
    return (
        <>
            <ul>
                <li>Counter</li>
                <li>{count}</li>
            </ul>
            <Outlet />
        </>
    )
}
