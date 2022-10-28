import { useState } from "react";

interface ThemeType {
	BLUE: string
	RED: string
	YELLOW: string
	PURPLE: string
	GREEN: string
    ORANGE: string
	GRAY: string
}

const THEMES: ThemeType = {
	BLUE: "blue-theme",
	RED: "red-theme",
	YELLOW: "yellow-theme",
	PURPLE: "purple-theme",
	GREEN: "green-theme",
	ORANGE: "orange-theme",
	GRAY: "gray-theme"
};

const THEME_NAME = "themeName";

const body = global.document.body;

let baseThemeName: string = localStorage.getItem(THEME_NAME) || THEMES.BLUE;
(() => {
	const storedTheme = localStorage.getItem(THEME_NAME);
	for (const [, themeName] of Object.entries(THEMES)) {
		if (themeName === storedTheme) {
			body.classList.add(themeName);
			baseThemeName = themeName;
			return;
		}
	}
	body.classList.add(THEMES.BLUE);
})();

// sc- It is not a hook

const useTheme = (): [string, (theneBame: string) => void] => {
	const [theme, setTheme] = useState(baseThemeName);

	const defineTheme = (newTheme: string) => {
		for (const [, themeName] of Object.entries(THEMES)) {
			if (themeName === newTheme) {
                localStorage.setItem(THEME_NAME, themeName);
				for (const [, n] of Object.entries(THEMES)) {
					body.classList.remove(n);
				}
				body.classList.add(themeName);
				setTheme(themeName);
			}
		}
	}

	return [theme, defineTheme];
}

const getThemes = () => {
    const themes = []
    for (const [theme, themeName] of Object.entries(THEMES)) {
        themes.push({theme, themeName})
    }
    return themes
}

export default useTheme;
export { getThemes };
