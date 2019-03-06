// external imports
import * as React from 'react'
import styled from 'styled-components'
// local imports
import { useLocalStorage } from '~/hooks'

// a bit of context we can use elsewhere
export const Context = React.createContext()

// this should live at the root of the application so everyone
// can look up the theme
export const Provider = ({ children }) => {
    // a bit of state to track the current theme
    var [theme, setTheme] = useLocalStorage('theme', 'day')

    // toggle the selection
    const toggleTheme = () => setTheme(theme === 'day' ? 'night' : 'day')

    return (
        <Context.Provider value={{ name: theme || {}, toggleTheme }}>{children}</Context.Provider>
    )
}

// this should be used to toggle between themes
export const Toggle = ({ style }) => {
    // pull out the theme information
    const { toggleTheme, name } = React.useContext(Context)

    React.useEffect(() => {
        window.setTheme(name)
    }, [name])

    // render a UI component to flip the theme
    return <ToggleContainer className="theme-toggle" onClick={toggleTheme} />
}

const ToggleContainer = styled.div`
    width: 70px;
    height: 42px;
    border-radius: 33px;
    border-width: 5px;
    overflow: hidden;
    border-style: solid;
    border-width: 4px;
    cursor: pointer;
    display: flex;
`
