import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.scss'
import ErrorPage from "./pages/ErrorPage"
import MyGroupsPage from "./pages/MygroupsPage"
import ListPage from "./pages/ListPage"
import ProfilePage from "./pages/ProfilePage"
import Home from "./pages/HomePage"
import ListsPage from "./pages/ListsPage"
import Root from "./pages/Root"
import ListAddPage from "./pages/ListAddPage"
import AppContext, { useApp } from "./hooks/useApp"
import useLanguage, { LanguageContext } from "./hooks/useLanguage"
import useTheme from "./hooks/useTheme"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "lists",
        element: <ListsPage />
      },
      {
        path: "lists/add",
        element: <ListAddPage />
      },
      {
        path: "lists/:id",
        element: <ListPage />
      },
      {
        path: "myGroups",
        element: <MyGroupsPage />
      },
      {
        path: "profile",
        element: <ProfilePage />
      }
    ]
  }
])

const App = () => { 

  useTheme()
  const appProviderValue = useApp()
  const [language, setLanguage] = useLanguage()

  const languageProviderValue = {
    language: language, 
    setLanguage: setLanguage
  }

  return (
    <AppContext.Provider value={appProviderValue}>
      <LanguageContext.Provider value={languageProviderValue}>
        <RouterProvider router={router} />
      </LanguageContext.Provider>
    </AppContext.Provider>
  )
}

export default App;
