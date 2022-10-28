import useFetch, {FetchActions, FetchResponse} from "../hooks/useFetch"
import { MyGroupsType } from "../models/models"
import ListItem from "./ListItem"
import { ListGroup } from "react-bootstrap"
import Section, { SectionBody, SectionFooter, SectionHeader } from "./Section"
import { useContext } from "react"
import AppContext from "../hooks/useApp"
import { LanguageContext } from "../hooks/useLanguage"

const MyGroups = () => {

    const app = useContext(AppContext)
    const {language} = useContext(LanguageContext)

    const [result, actions] = useFetch<MyGroupsType>({
        path: 'mygroups',
        accessToken: app.accessToken,
        collection: true
    }) as [FetchResponse<MyGroupsType>, FetchActions<MyGroupsType>]

    const printItems = () => {
        if (!result.loaded || !result.items) {
            return (<></>)
        }
        return (
            <ListGroup>
                {result.items.map(mygroup => 
                    <ListItem key={mygroup.id} data={mygroup.group} link={`/mygroups/${mygroup.id}`} />
                )}
            </ListGroup>
        )
    }

    return (
        <Section>
            <SectionHeader refreshAction={() => actions.reload()} title={language.ln.my_groups} refreshTitle={language.ln.refresh} />
            <SectionBody syncing={result.syncing} error={result.error} smallLoad={true}>
                { printItems() }
            </SectionBody>
            <SectionFooter />
        </Section>
    )
}

export default MyGroups;