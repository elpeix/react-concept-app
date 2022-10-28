import { FormEvent, useContext, useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import config from "../config.json"
import AppContext from "../hooks/useApp"
import { LanguageContext } from "../hooks/useLanguage"

interface LoginType {
    email ?: string,
    password ?: string
}

const LoginPage = () => {

    const [login, setLogin] = useState<LoginType>({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [loginError, setLoginError] = useState(false)

    const app = useContext(AppContext)
    const {language} = useContext(LanguageContext)

    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.persist();
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        setLogin((prev) => ({...prev, [name]: value}))
    }

    const save = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setLoginError(false)

        const controller = new AbortController()
        const params: RequestInit = {
            method: 'POST',
            signal: controller.signal,
            headers:  {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        }
        fetch(`${config.apiUrl}/login`, params)
            .then(res => res.json())
            .then(res => {
                if (res.accessToken) {
                    app.login(res.accessToken)
                } else {
                    setLoginError(true)
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(error);
                if (error.name !== 'AbortError') {
                    
                    const message = `An error has ocurred ${error.status}`
                    throw new Error(message)
                }
            })
        return () => controller.abort()
    }

    return (
        <section className="content-login">
            <header>
                <h4 className="mb-4">
                    <img src="logo.png" height={40} width={40} alt={language.ln.app_name} />
                    {' '}
                    {language.ln.app_name}
                </h4>
            </header>
            <Form onSubmit={save}>
                <div className="body breath">
                    <FloatingLabel controlId="labelUsername" label={language.ln.email} className="mb-3">
                        <Form.Control
                            type="text" 
                            placeholder={language.ln.email}
                            name="email"
                            disabled={loading}
                            onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel controlId="labelPassword" label={language.ln.password} className="mb-3">
                        <Form.Control
                            type="password" 
                            placeholder={language.ln.password} 
                            name="password"
                            disabled={loading}
                            onChange={handleChange} />
                    </FloatingLabel>
                </div>

                <footer>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? language.ln.loading : language.ln.login}
                    </Button>
                    { loginError && 
                        <span className="float-end text-danger">{language.ln.login_error}</span>
                    }
                </footer>
            </Form>
        </section>
    )
}

export default LoginPage