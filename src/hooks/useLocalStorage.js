// external imports
import React from 'react'

export default (key, defaultValue) => {
    // if we weren't given a key
    if (!key) {
        throw new Error('Must provide key')
    }

    // if we don't have a value for the key and we're given a defaultValue
    if (!window.localStorage[key] && defaultValue) {
        window.localStorage[key] = defaultValue
    }

    // lets build up a piece of state that will sync up with the local storage value
    const [state, setState] = React.useState(window.localStorage[key])

    // whenever our state changes we need to update local storage
    React.useEffect(() => {
        window.localStorage[key] = state
    }, [state])

    // a function to call that updates the value
    const updateValue = setState

    return [state, updateValue]
}
