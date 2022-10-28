import useTheme, { getThemes } from "../hooks/useTheme";

const ThemePicker = () => {
    const [theme, setTheme] = useTheme()

    const themes = getThemes()

    const pickers = themes.map(t => {
        const active = t.themeName === theme ? 'active' : ''
        return (<div key={t.theme}
            className={`circle ${t.themeName} ${active}`} 
            onClick={() => setTheme(t.themeName)} />)
    })

    return (
        <div className="themePickers">
            {pickers}
        </div>
    )
}

export default ThemePicker;