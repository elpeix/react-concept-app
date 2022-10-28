import { useContext } from "react"
import { ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import useFetch, { FetchActions, FetchResponse } from "../hooks/useFetch"
import AppContext from "../hooks/useApp"
import { LanguageContext } from "../hooks/useLanguage"
import { ItemType } from "../models/models"
import ListItem from "./ListItem"
import Section, { SectionBody, SectionFooter, SectionHeader } from "./Section"

const Items = ({listId}:{listId: number | string | undefined}) => {

    const app = useContext(AppContext)
    const {language} = useContext(LanguageContext)

    const [result, actions] = useFetch<ItemType>({
        path: `lists/${listId}/items`,
        accessToken: app.accessToken,
        collection: true
    }) as [FetchResponse<ItemType>, FetchActions<ItemType>]

    const printItems = () => {
        if (!result.loaded || !result.items) {
            return (<></>)
        }
        return (
            <ListGroup>
                {result.items.map(item => 
                    <ListItem key={item.id} data={item} link={`/items/${item.id}`} />
                )}
            </ListGroup>
        )
    }

    return (
        <Section>
            <SectionHeader title={language.ln.items} refreshAction={() => actions.reload()} refreshTitle={language.ln.refresh} />
            <SectionBody syncing={result.syncing} error={result.error}>{ printItems() }</SectionBody>
            <SectionFooter>
                <Link to={`/lists/add`} className="btn btn-sm btn-primary">{language.ln.new_list}</Link>
            </SectionFooter>
        </Section>
    )
}

export default Items