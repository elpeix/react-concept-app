interface LnType {
	app_name: string
	app_description: string
	app_title: string
	cancel: string
	create: string
	edit: string
	email: string
	description: string
	first_name: string
	items: string
	go_home: string
	groups_management: string
	language: string
	last_name: string
	list_name: string
	lists: string
	loading: string
	login: string
	login_error: string
	logout: string
	my_groups: string
	my_profile: string
	name: string
	new_list: string
	personal_data: string
	password: string
	refresh: string
	route_error_title: string,
	route_error_message: string,
	save: string
	theme: string
}

interface LanguageType {
	code: string
	name: string
	ln: LnType
}

const CA: LanguageType = {
	code: "ca",
	name: "Català",
	ln: {
		app_name: "Concept App",
		app_description: "Prova d'aplicació feta amb TypeScript + React.",
		app_title: "React Concept App",
		cancel: "Cancel·la",
		create: "Crea",
		description: "Descripció",
		edit: "Edita",
		email: "Correu electrònic",
		first_name: "Nom",
		items: "Elements",
		go_home: "Ves a l'inici",
		groups_management: "Gestiona grups",
		language: "Idioma",
		last_name: "Cognoms",
		list_name: "Nom de la llista",
		loading: "Carregant...",
		login_error: "Credencials incorrectes",
		login: "Entra",
		logout: "Surt",
		my_groups: "Els meus grups",
		my_profile: "El meu perfil",
		name: "Nom",
		new_list: "Nova llista",
		password: "Contrasenya",
		personal_data: "Dades personals",
		refresh: "Refresca",
		route_error_message: "Sembla que alguna cosa ha anat malament",
		route_error_title: "Vaja!",
		save: "Desa",
		theme: "Tema",
		lists: "Les meves llistes",
	}
}

const EN: LanguageType = {
    code: "en",
    name: "English",
    ln : {
		app_name: "Concept App",
		app_description: "TypeScript + React App.",
		app_title: "React Concept App",
        cancel: "Cancel",
        create: "Create",
        description: "Description",
        edit: "Edit",
        email: "Email",
        first_name: "First name",
        items: "Items",
		go_home: "Go home",
        groups_management: "Manage groups",
        language: "Language",
        last_name: "Last name",
        list_name: "List's name",
        loading: "Loading...",
        login_error: "Wrong credentials",
        login: "Login",
        logout: "Logout",
        my_groups: "My groups",
        my_profile: "My profile",
        name: "Name",
        new_list: "New list",
        password: "Password",
        personal_data: "Personal data",
        refresh: "Refresh",
		route_error_message: "Sorry, an unexpected error has occurred.",
		route_error_title: "Oops!",
        save: "Save",
		theme: "Theme",
        lists: "My lists",
    }
}

const Languages = [CA, EN];

export default Languages;
export { CA as defaultLanguage };
export type { LanguageType, LnType };
