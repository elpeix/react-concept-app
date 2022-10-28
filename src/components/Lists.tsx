import ListItem from "./ListItem"
import useFetch, {FetchActions, FetchResponse} from "../hooks/useFetch"
import { ListType as ListType } from "../models/models"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"
import Section, { SectionBody, SectionFooter, SectionHeader } from "./Section"
import { useContext } from "react"
import AppContext from "../hooks/useApp"
import { LanguageContext } from "../hooks/useLanguage"

const Lists = () => {

    const app = useContext(AppContext)
    const {language} = useContext(LanguageContext)

    const [result, actions] = useFetch<ListType>({
        path: 'lists',
        accessToken: app.accessToken,
        collection: true
    }) as [FetchResponse<ListType>, FetchActions<ListType>]

    const printItems = () => {
        if (!result.loaded || !result.items) {
            return (<></>)
        }
        return (
            <ListGroup>
                {result.items.map(list => 
                    <ListItem key={list.id} data={list} link={`/lists/${list.id}`} />
                )}
            </ListGroup>
        )
    }

    return (
        <Section>
            <SectionHeader refreshAction={() => actions.reload()} title={language.ln.lists} refreshTitle={language.ln.refresh} />
            <SectionBody syncing={result.syncing} error={result.error}>{ printItems() }</SectionBody>
            <SectionFooter>
                <Link to={`/lists/add`} className="btn btn-sm btn-primary">{language.ln.new_list}</Link>
            </SectionFooter>
        </Section>
    )
}

export default Lists;