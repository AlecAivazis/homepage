import React from 'react'
import styled from 'styled-components'
// local imports
import { Theme } from '~/components'

import './fonts.css'
import './reset.css'

export default ({ children, style, ...unused }) => {
    // grab the theme name
    const { colors } = React.useContext(Theme.Context)

    // render the component
    return (
        <Container
            style={{ color: colors.fontColor, backgroundColor: colors.backgroundColor, ...style }}
            {...unused}
        >
            <InnerContainer>{children}</InnerContainer>
        </Container>
    )
}

const Container = styled.div`
    width: '100%';
    height: 100vh;
    display: flex;
    flex-direction: row;

    justify-content: center;
`

const InnerContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`
