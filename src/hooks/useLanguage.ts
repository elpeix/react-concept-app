import { createContext, useState } from "react"
import { Cookies } from "react-cookie"
import Languages, { LanguageType, defaultLanguage } from "../languages"

const cookies = new Cookies()
const LANGUAGE_COOKIE = "language"
const cookieCode = cookies.get(LANGUAGE_COOKIE)
const cookieLanguage = Languages.find(l => l.code === cookieCode)

interface LanguageContextType {
    language: LanguageType,
    setLanguage: (code:string) => void
}

const useLanguage = ():[LanguageType, (code:string) => void] => {

    const [language, setLang] = useState(cookieLanguage || defaultLanguage)

    const setLanguage = (newCode: string) => {
        if (newCode === language.code) {
            return
        }
        const newLanguage = Languages.find(l => l.code === newCode)
        if (newLanguage) {
            cookies.set(LANGUAGE_COOKIE, newCode, {
                sameSite: 'strict'
            })
            setLang(newLanguage)
        }
    }

    return [
        language, setLanguage
    ]
}

const def:LanguageContextType = null as unknown as LanguageContextType
const LanguageContext = createContext<LanguageContextType>(def)

export default useLanguage
export { LanguageContext } 