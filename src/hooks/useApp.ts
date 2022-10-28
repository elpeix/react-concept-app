import { Cookies } from "react-cookie"
import { createContext, useEffect, useState } from "react"
import { UserType } from "../models/models"
import useFetch, { FetchActions, FetchResponse } from "./useFetch"

export interface AppType {
    me: UserType,
    accessToken: string
    update(callback: (prev: UserType) => UserType): void,
    isLoaded(): boolean | undefined,
    sync(): void,
    restore(): void
    isLoggedIn() : boolean,
    login(token:string): void,
    logout(): void
}

const userInit: UserType = {
    id: 0,
    email: "",
    firstName: "",
    lastName: ""
}

const cookies = new Cookies()
const ACCESS_TOKEN = "accessToken"

const useApp = () => {
    const [accessToken, setAccessToken] = useState(cookies.get(ACCESS_TOKEN))
    const [profile, setProfile] = useState(userInit)
    const [restorableProfile, setRestorableProfile] = useState(userInit)

    const [me, actions] = useFetch<UserType>({
        path: 'me',
        accessToken: accessToken
    }) as [FetchResponse<UserType>, FetchActions<UserType>]

    useEffect(() => {
        console.log('Use effect app');
        
        if (me.loaded && me.response) {
            setProfile(me.response)
            setRestorableProfile(me.response)
        }
    }, [me])

    const isLoaded = () => (me.loaded && !me.syncing && me.response !== undefined)

    const update = (callback: (prev: UserType) => UserType) => {
        setProfile(callback(profile))
    }
    const sync = () => {
        try {
            actions.update && actions.update(profile.id, profile)
            setRestorableProfile(profile)
        } catch (error) {
            console.log("Can't be sync", error);
        }
    }
    const restore = () => setProfile(restorableProfile)

    const isLoggedIn = () => {
        return accessToken && me.loaded && me.response?.id
    }

    const login = (token: string) => {
        setAccessToken(token)
        cookies.set(ACCESS_TOKEN, token, {
            sameSite: 'strict'
        })
    }
    const logout = () => {
        setAccessToken("")
        cookies.remove(ACCESS_TOKEN)
    }

    return {
        me: profile,
        accessToken: accessToken,
        isLoaded,
        update,
        sync,
        restore,
        isLoggedIn,
        login,
        logout
    }
}

const def:AppType = null as unknown as AppType

const AppContext = createContext<AppType>(def)

export default AppContext;

export { useApp }