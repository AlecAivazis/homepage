// external imports
import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
// local imports
import { Layout, SEO } from '~/components'
import { lightGrey } from '~/colors'

import './code.css'
import './text.scss'

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { markdownRemark } = data // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark
    return (
        <Layout>
            <SEO title={frontmatter.title} />
            <Container>
                <div style={{ maxWidth: 900 }}>
                    <Title>{frontmatter.title}</Title>
                    <div className="remark" dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            </Container>
        </Layout>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    border-left: 1px solid ${lightGrey};
    padding: 35px 42px;
    overflow-y: auto;
`

const Title = styled.h1`
    margin-bottom: 32px;
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
