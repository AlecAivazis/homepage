// external imports
import React from 'react'
// local imports
import { Theme } from '~/components'

// we need to wrap the root element in the theme context provider
export const wrapRootElement = ({ element }) => {
    return <Theme.Provider>{element}</Theme.Provider>
}
