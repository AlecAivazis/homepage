// external imports
import React from 'react'

export default (key, defaultValue) => {
    // if we weren't given a key
    if (!key) {
        throw new Error('Must provide key')
    }

    let storage
    try {
        storage = window.localStorage
    } catch {
        storage = {}
    }

    // if we don't have a value for the key and we're given a defaultValue
    if (!storage[key] && defaultValue) {
        storage[key] = defaultValue
    }

    // lets build up a piece of state that will sync up with the local storage value
    const [state, setState] = React.useState(storage[key])

    // whenever our state changes we need to update local storage
    React.useEffect(() => {
        storage[key] = state
    }, [state, key, storage])

    // a function to call that updates the value
    const updateValue = setState

    return [state, updateValue]
}
