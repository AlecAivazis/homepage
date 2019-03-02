// external imports
import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'
// local imports
import { Layout, SEO, Theme } from '~/components'

const IndexPage = () => (
    <Layout style={{ paddingTop: 78 }}>
        <SEO title="Home" keywords={['nautilus', 'graphql', 'schema', 'federation']} />
        <Title style={{ justifyContent: 'space-between' }}>
            <span>
                Hi{' '}
                <span role="img" aria-label="wave">
                    👋
                </span>
            </span>
            <Theme.Toggle />
        </Title>
        <Title>I'm Alec Aivazis.</Title>
        <Body style={{ marginTop: 19 }}>
            I’m a sofware engineer focused on web stuff. Lately, my work includes React or GraphQL
            in one way or another.
        </Body>
        <SectionTitle>Things I've Written</SectionTitle>
        <StaticQuery
            query={graphql`
                {
                    posts: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
                        edges {
                            post: node {
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
                    {data.posts.edges.map(({ post }) => (
                        <Link to={post.frontmatter.path} key={post.id}>
                            <PostTitle>{post.frontmatter.title}</PostTitle>
                            <PostSubtitle>{post.frontmatter.subtitle}</PostSubtitle>
                            <PostInfoContainer>
                                {post.frontmatter.date} • {post.fields.readingTime.text}
                            </PostInfoContainer>
                        </Link>
                    ))}
                </>
            )}
        />
    </Layout>
)

const Title = styled.h1`
    font-size: 32px;
    display: flex;
    flex-direction: row;
`

const SectionTitle = styled.h2`
    font-size: 28px;
    margin-top: 43px;
    margin-bottom: 16px;
`

const Body = styled.p`
    font-size: 22px;
    line-height: 1.3;
`

const PostTitle = styled.h3`
    font-size: 22px;
    margin-top: 7px;
    margin-bottom: 3px;
`

const PostSubtitle = styled.h4`
    font-size: 18px;
    margin-bottom: 4px;
    line-height: 22px;
`

const PostInfoContainer = styled.div`
    margin-bottom: 24px;
`

export default IndexPage
