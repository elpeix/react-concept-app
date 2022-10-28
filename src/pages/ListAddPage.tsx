import { FormEvent, useContext, useState } from "react"
import { Button, Form, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Section, { SectionBody, SectionFooter, SectionHeader } from "../components/Section"
import useFetch, { FetchActions } from "../hooks/useFetch"
import AppContext from "../hooks/useApp"
import { LanguageContext } from "../hooks/useLanguage"
import { ListType } from "../models/models"

const ListAddPage = () => {

    const initList:ListType = {
        id: 0,
        name: "",
        description: ""
    } 

    const [list, setList] = useState<ListType>(initList)

    const app = useContext(AppContext)
    const {language} = useContext(LanguageContext)

    const actions = useFetch<ListType>({
        path: 'lists',
        accessToken: app.accessToken,
        autoLoad: false
    })[1] as FetchActions<ListType>

    const navigate = useNavigate();

    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        setList(prev => ({...prev, [name]: value}))
    } 

    const save = (e: FormEvent) => {
        e.preventDefault()
        actions.create(list)
    }

    const cancel = (e: FormEvent) => {
        e.preventDefault()
        setList(initList)
    }

    const disabled = false

     // sc - create component 
    return (
        <Section>
            <SectionHeader title={language.ln.new_list} />
            <Form onSubmit={save} onReset={cancel}>
                <SectionBody breath>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>{language.ln.name}</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder={language.ln.list_name}
                            name="name"
                            value={list.name}
                            onChange={handleChange}
                            autoFocus />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>{language.ln.description}</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            placeholder="" 
                            name={language.ln.description}
                            value={list.description}
                            style={{ height: '100px' }}
                            onChange={handleChange} />
                    </Form.Group>
                </SectionBody>
                <SectionFooter>
                    <Stack direction="horizontal" gap={3}>
                        <Button variant="primary" type="submit" disabled={disabled}>{language.ln.save}</Button>
                        <Button variant="secondary" type="reset" disabled={disabled} onClick={() => navigate(-1)}>{language.ln.cancel}</Button>
                    </Stack>
                </SectionFooter>
            </Form>
        </Section>
    )
}

export default ListAddPage