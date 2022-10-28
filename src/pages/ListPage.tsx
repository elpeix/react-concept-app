import { useContext } from "react"
import { useParams } from "react-router-dom"
import Items from "../components/Items"
import List from "../components/List"
import useFetch, { FetchResponse, FetchActions } from "../hooks/useFetch"
import AppContext from "../hooks/useApp"
import { ListType } from "../models/models"

const ListPage = () => {

    const {id} = useParams()

    const app = useContext(AppContext)

    const [ListResponse, ListActions] = useFetch<ListType>({
        path: `lists`,
        accessToken: app.accessToken,
        id: id
    }) as [FetchResponse<ListType>, FetchActions<ListType>]

    const edit = (data: ListType) => id && ListActions.update(id, data)

    return (
        <>
        { ListResponse.response && 
            <List data={ListResponse.response} onEdit={edit} />
        }
        <Items listId={id} />
        </>
    )
}

export default ListPage