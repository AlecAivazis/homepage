// external imports
import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
// local imports
import { Layout, SEO, Theme } from '~/components'
import { IconTwitter, IconGitHub } from '~/images'

import './code.css'
import './text.scss'

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { markdownRemark } = data // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark

    // prepare the post content to show
    const content = html.replace(/=-=/g, `<div class="section-divider"></div>`)

    // grab the current colors
    const { colors } = React.useContext(Theme.Context)

    return (
        <Layout>
            <SEO title={frontmatter.title} />
            <Header style={{ color: colors.fontColor }}>
                <Link to="/">Alec Aivazis</Link>
                <SocialIconContainer>
                    <a
                        href="https://twitter.com/AlecAivazis"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <IconTwitter style={{ width: 24, height: 24 }} />
                    </a>
                    <a
                        href="https://github.com/AlecAivazis"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <IconGitHub style={{ width: 24, height: 24, marginLeft: 20 }} />
                    </a>
                    <Theme.Toggle style={{ marginLeft: 20 }} />
                </SocialIconContainer>
            </Header>
            <Container>
                <Content>
                    <Title>{frontmatter.title}</Title>
                    <div className="remark" dangerouslySetInnerHTML={{ __html: content }} />
                </Content>
            </Container>
        </Layout>
    )
}

const Header = styled.header`
    margin-top: 12px;
    margin-bottom: 40px;
    font-family: 'Mark Light';
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 700px;
    align-self: center;
`

const Container = styled.div`
    height: 100%;
    overflow-y: auto;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const Title = styled.h1`
    margin-bottom: 32px;
`

const SocialIconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Content = styled.div`
    width: 700px;
`

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                path
                title
            }
        }
    }
`
