// externals
import React from 'react'
import PropTypes from 'prop-types'

export default props => (
    <html {...props.htmlAttributes}>
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            {props.headComponents}
        </head>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
            This app works best with JavaScript enabled.
        </noscript>
        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        <body {...props.bodyAttributes}>
            {/*
                SSR kind of screws with persisting themes since the server doesn't know what theme to render.
                This means we have to apply the theme before mounting the app.
            */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                      (function() {
                        window.setTheme = function(theme) {
                            const classList = document.getElementById("___gatsby").classList

                            // clear any server-rendered classes on the wrapper
                            classList.remove('night', 'day')

                            // add only the one we want
                            classList.add(theme)
                        }

                        // grab the current value of the theme
                        const theme = localStorage['theme']

                        // if we have a value for the theme we want to start as
                        if (theme) {
                            setTheme(theme)
                        }
                      })();
                    `,
                }}
            />
            {props.postBodyComponents}
        </body>
    </html>
)
