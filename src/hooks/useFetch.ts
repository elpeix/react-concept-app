import { useEffect, useState } from "react"
import config from "../config.json"
import useOnce from "./useOnce"

export interface FetchRequest<T> {
    path: string,
    accessToken: string,
    id ?: number|string,
    collection ?: boolean,
    method ?: string,
    body?: T,
    autoLoad ?: boolean
}

export interface FetchResponse<T> {
    loaded : boolean,
    syncing :boolean, 
    error ?: {
        message: string
    },
    response?: T,
    items?: T[]
}

export interface FetchActions<T> {
    reload: () => void,
    read: () => void,
    readOne: (id: number|string) => void,
    create: (data: T) => void,
    update: (id: number|string, data: T) => void
    remove: (id: number|string) => void
}

function useFetch<T>(props: FetchRequest<T>) {

    const defaultProps:FetchRequest<T> = {
        path: "",
        accessToken: "",
        autoLoad: true
    }

    const properties = {
        ...defaultProps,
        ...props
    }

    const [response, setResponse] = useState<FetchResponse<T>>({
        loaded: false,
        syncing: false
    })

    const [load, setLoad] = useState(false)

    useOnce(
        () => properties.autoLoad? true : false && !response.loaded,
        () => setLoad(true)
    )

    useEffect(() => {
        if (load) {
            setResponse(ov => ({...ov, loaded: false}))
            send({...properties, method: 'GET'})
        }
    }, [load])

    const send = (request: FetchRequest<T>) => {
        setResponse((prev) => ({...prev, syncing: true}))

        const controller = new AbortController()
        const params: RequestInit = {
            method: request.method || 'GET',
            signal: controller.signal,
            headers: {
                'Authorization' : `Bearer ${request.accessToken}`
            }
        }
        if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') {
            params.headers = {
                ...params.headers,
                'Content-Type': 'application/json'
            }
            params.body = JSON.stringify(request.body)
        }

        let absPath = `${config.apiUrl}/${request.path}`
        if (properties.id) {
            absPath = `${absPath}/${properties.id}`
        }

        fetch(absPath, params)
            .then(res => res.json())
            .then(res => {
                setLoad(false)
                if (Array.isArray(res) || res.items) {
                    const items = Array.isArray(res)? res : res.items
                    setResponse({
                        loaded: true,
                        syncing: false,
                        items: items
                    })
                } else {
                    setResponse({
                        loaded: true,
                        syncing: false,
                        response: res
                    })
                }
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    const message = `An error has ocurred ${error.status}`
                    throw new Error(message)
                }
            })
        return () => controller.abort()
    }

    const actions = {
        reload: () => setLoad(true),
        read: () => send({...properties, method: 'GET'}),
        readOne: (id: number|string) => send({...properties, id: id, method: 'GET'}),
        create: (data: T) => send({...properties, id: 0, method: 'POST', body: data}),
        update: (id: number|string, data: T) => send({...properties, id: id, method: 'PUT', body: data}),
        remove: (id: number|string) => send({...properties, id: id, method: 'DELETE'})
    } as FetchActions<T>

    return [response, actions]
}

export default useFetch;