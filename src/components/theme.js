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
        <Context.Provider value={{ name: theme, colors: themes[theme] || {}, toggleTheme }}>
            {children}
        </Context.Provider>
    )
}

// this should be used to toggle between themes
export const Toggle = ({ style }) => {
    // pull out the theme information
    const { toggleTheme, name } = React.useContext(Context)

    const isMoon = name === 'night'
    // use the right component
    const Component = isMoon ? MoonToggleContainer : SunToggleContainer

    // render a UI component to flip the theme
    return (
        <ToggleContainer
            onClick={toggleTheme}
            style={{ borderColor: isMoon ? 'white' : 'black', ...style }}
        >
            <Component>{isMoon ? '🌙' : '🌞'}</Component>
        </ToggleContainer>
    )
}

const themes = {
    day: {
        fontColor: '#1C1C1C',
        backgroundColor: 'white',
    },
    night: {
        fontColor: 'white',
        backgroundColor: '#1C1C1C',
    },
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
`

const MoonToggleContainer = styled.div`
    padding-right: 6px;
    background-color: #1c1c1c;
    flex-direction: row-reverse;
    display: flex;
    height: 100%;
    width: 100%;
    line-height: 100%;
    align-items: center;
    font-size: 21px;
`

const SunToggleContainer = styled.div`
    padding-right: 6px;
    background-color: white;
    display: flex;
    height: 100%;
    width: 100%;
    line-height: 100%;
    align-items: center;
    padding-left: 5px;
    font-size: 25px;
`
