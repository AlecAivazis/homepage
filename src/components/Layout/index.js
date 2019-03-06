import React from 'react'
import styled from 'styled-components'

import './fonts.css'
import './reset.css'
import './theme.scss'

export default ({ children, style, ...unused }) => {
    // render the component
    return (
        <Container {...unused}>
            <InnerContainer>{children}</InnerContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;

    justify-content: center;
    min-height: 100vh;
`

const InnerContainer = styled.div`
    height: 100%;
    display: flex;
    width: 90%;
    max-width: 700px;
    flex-direction: column;
`
