import { Col, Row } from "react-bootstrap"
import MyGroups from "../components/MyGroups"
import Lists from "../components/Lists"
import Section from "../components/Section"
import { LanguageContext } from "../hooks/useLanguage"
import { useContext } from "react"

const Home = () => {
   
	const {language} = useContext(LanguageContext)
    
    return (
        <>
            <Section simple>
                <h3>{language.ln.app_title}</h3>
                <p>{language.ln.app_description}</p>
            </Section>
            <Row>
                <Col><Lists /></Col>
                <Col><MyGroups /></Col>
            </Row>
        </>
    )
}

export default Home