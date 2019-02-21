// external imports
import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
// local imports
import { Layout, SEO } from '~/components'
import { darkGrey } from '~/colors'

const IndexPage = () => (
    <Layout style={{ paddingTop: 100 }}>
        <SEO title="Home" keywords={['nautilus', 'graphql', 'schema', 'federation']} />
        <Title>Hi 👋</Title>
        <Title>I'm Alec Aivazis.</Title>
        <Body style={{ marginTop: 32 }}>
            I’m a sofware engineer focused on web stuff. My work usually includes react or graphql
            in one way or another.
        </Body>
        <SectionTitle>Things I've Written</SectionTitle>
        <StaticQuery
            query={graphql`
                {
                    posts: allMarkdownRemark(sort: { order: ASC, fields: [fileAbsolutePath] }) {
                        edges {
                            node {
                                id
                                frontmatter {
                                    title
                                    subtitle
                                    path
                                    date(formatString: "M/D/Y")
                                }
                                fields {
                                    readingTime {
                                        text
                                    }
                                }
                            }
                        }
                    }
                }
            `}
            render={data => (
                <>
                    {data.posts.edges.map(({ node }) => (
                        <>
                            <PostTitle>{node.frontmatter.title}</PostTitle>
                            <PostSubtitle>{node.frontmatter.subtitle}</PostSubtitle>
                            <PostInfoContainer>
                                {node.frontmatter.date} • {node.fields.readingTime.text}
                            </PostInfoContainer>
                        </>
                    ))}
                </>
            )}
        />
    </Layout>
)

const Title = styled.h1`
    font-size: 32px;
`

const SectionTitle = styled.h2`
    font-size: 28px;
    margin-top: 43px;
    margin-bottom: 12px;
`

const Body = styled.p`
    font-size: 22px;
    line-height: 1.3;
`

const PostTitle = styled.h3`
    font-size: 22px;
    margin-top: 7px;
`

const PostSubtitle = styled.h4`
    font-size: 18px;
    margin-bottom: 4px;
`

const PostInfoContainer = styled.div`
    margin-bottom: 12px;
`

export default IndexPage
