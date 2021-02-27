import Chat from "./components/Chat";
import Login from "./components/Login";
import { CHAT_ROUTE, LOGIN_ROUTE } from "./utils/consts";

export interface IAppRouter {
    path: string;
    Component: () => JSX.Element
}

export const publicRouters: IAppRouter[] = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]

export const privateRouters: IAppRouter[] = [
    {
        path: CHAT_ROUTE,
        Component: Chat
    }
]