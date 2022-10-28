import { FormEvent, useContext } from "react";
import { Button, ButtonGroup, Form, Stack, ToggleButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Section, { SectionBody, SectionFooter, SectionHeader } from "../components/Section";
import ThemePicker from "../components/ThemePicker";
import AppContext from "../hooks/useApp";
import { LanguageContext } from "../hooks/useLanguage";
import Languages from "../languages";

const ProfilePage = () => {
    const app = useContext(AppContext)
    const {language, setLanguage} = useContext(LanguageContext)

    const navigate = useNavigate()

    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        app.update((prev) => ({ ...prev, [name]: value }));
    };

    const save = (e: FormEvent) => {
        e.preventDefault();
        app.sync();
    };

    const cancel = (e: FormEvent) => {
        e.preventDefault();
        app.restore();
    };

    const disabled = !app.isLoaded();

    return (
        <Section>
            <SectionHeader title={language.ln.my_profile} />
            <SectionBody breath>
                <h5>{language.ln.language}</h5>
                <ButtonGroup className="mb-2">
                    {Languages.map((lang, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        name="radio"
                        variant="outline-info"
                        value={lang.code}
                        checked={language.code === lang.code}
                        onChange={(e) => setLanguage(e.currentTarget.value)}
                    >
                        {lang.name}
                    </ToggleButton>
                    ))}
                </ButtonGroup>
            </SectionBody>
            <Form onSubmit={save} onReset={cancel}>
                <SectionBody breath>
                    <h5>{language.ln.personal_data}</h5>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>{language.ln.first_name}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={language.ln.first_name}
                            name="firstName"
                            value={app.me.firstName}
                            disabled={disabled}
                            onChange={handleChange}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>{language.ln.last_name}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={language.ln.last_name}
                            name="lastName"
                            disabled={disabled}
                            value={app.me.lastName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </SectionBody>
                <SectionBody breath>
                    <h5>{language.ln.theme}</h5>
                    <ThemePicker />
                </SectionBody>
                <SectionFooter>
                    <Stack direction="horizontal" gap={3}>
                        <Button variant="primary" type="submit" disabled={disabled}>
                            {language.ln.save}
                        </Button>
                        <Button
                            variant="secondary"
                            type="reset"
                            disabled={disabled}
                            onClick={() => navigate(-1)}
                        >
                            {language.ln.cancel}
                        </Button>
                    </Stack>
                </SectionFooter>
            </Form>
        </Section>
    );
};

export default ProfilePage;
