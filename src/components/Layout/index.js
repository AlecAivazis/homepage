import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
// local imports
import { darkGrey } from '~/colors'

import './fonts.css'
import './reset.css'

export default ({ children, ...unused }) => (
    <Container {...unused}>
        <InnerContainer>{children}</InnerContainer>
    </Container>
)

const Container = styled.div`
    width: '100%';
    height: 100vh;
    display: flex;
    flex-direction: row;
    background-color: ${darkGrey};
    color: white;
    justify-content: center;
`

const InnerContainer = styled.div`
    width: 700px;
    height: 100%;
    display: flex;
    flex-direction: column;
`
