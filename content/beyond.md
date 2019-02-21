---
title: Beyond Schema Delegation
subtitle: How to simplify your GraphQL gateway with a change of perspective
path: '/beyond-schema-delegation'
date: '2018-01-05'
---

This post describes a few common pain points with the current approach to consolidating multiple GraphQL APIs known as “schema delegation”. I then show how a new approach known as “schema federation” addresses those problems and allows our teams to move faster with more autonomy

Imagine we’ve been tasked with creating a platform that allows users to auction off photos of their pets. We decide on having a single GraphQL endpoint for the whole API and after a few meetings, we finally agree on names for our types that convey the perfect semantic content:
