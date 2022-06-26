import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";
import {Provider} from "react-redux";
import store from "./store";

hydrate(<Provider store={store}><RemixBrowser /></Provider>, document);
