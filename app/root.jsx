import {
    Links,
    LiveReload,
    Meta,
    Outlet, Scripts,
    ScrollRestoration, useCatch,
} from "@remix-run/react";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
    console.log("App");
    return (
        <Document>
            <Outlet/>
        </Document>
  );
}

export function ErrorBoundary({ error }) {
    console.error("App:ErrorBoundary");
    return (
        <Document title="Oh no!">
            <ul>
                <li>App:ErrorBoundary</li>
                <li>{error.message}</li>
            </ul>
        </Document>
    );
}

export function CatchBoundary() {
    console.error("App:CatchBoundary");
    const caught = useCatch();
    return (
        <Document title="Oh no!">
            <ul>
                <li>App:CatchBoundary</li>
                <li>{caught.status}</li>
                <li>{caught.statusText}</li>
            </ul>
        </Document>
    );
}

function Document({title, children}) {
    return(
        <html lang="en">
            <head>
                { title && <title>{title}</title>}
                <Meta/>
                <Links/>
            </head>
            <body>
            {children}
            <ScrollRestoration/>
            <Scripts/>
            <LiveReload/>
            </body>
        </html>
    )
}
