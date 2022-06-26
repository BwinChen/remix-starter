import {useDispatch, useSelector} from 'react-redux'
import React, {useEffect} from "react";
import {Link, useCatch} from "@remix-run/react";
import {decrement, increment} from "../../counterSlice";

export const meta = () => ({
    charset: "utf-8",
    title: "CounterIndex",
    viewport: "width=device-width,initial-scale=1",
});

export default function CounterIndex() {
    console.log("CounterIndex")
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    useEffect(
        () => {
            console.log("CounterIndex:useEffect")
            if (count > 3) {
                throw new Error("Test Error")
            }
        },
        [count]
    )
    return (
        <>
            <ul>
                <li>CounterIndex</li>
                <li>
                    <button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                    >
                        Increment
                    </button>
                </li>
                <li>{count}</li>
                <li>
                    <button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                    >
                        Decrement
                    </button>
                </li>
                <li><Link to="tag1">to /counter/tag1</Link></li>
            </ul>
        </>
    )
}

export function ErrorBoundary({ error }) {
    console.error("CounterIndex:ErrorBoundary");
    const count = useSelector((state) => state.counter.value)
    return (
        <>
            <ul>
                <li>CounterIndex:ErrorBoundary</li>
                <li>{count}</li>
                <li>{error.message}</li>
            </ul>
        </>
    );
}

export function CatchBoundary() {
    console.error("CounterIndex:CatchBoundary")
    const caught = useCatch();
    return (
        <>
            <ul>
                <li>CounterIndex:CatchBoundary</li>
                <li>{caught.statusText}</li>
            </ul>
        </>
    );
}