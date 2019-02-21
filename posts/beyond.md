---
title: Beyond Schema Delegation
subtitle: How to simplify your GraphQL gateway with a change of perspective
path: '/beyond-schema-delegation'
date: '2018-01-05'
---

This post describes a few common pain points with the current approach to consolidating multiple GraphQL APIs known as “schema delegation”. I then show how a new approach known as “schema federation” addresses those problems and allows our teams to move faster with more autonomy

--

Imagine we’ve been tasked with creating a platform that allows users to auction off photos of their pets. We decide on having a single GraphQL endpoint for the whole API and after a few meetings, we finally agree on names for our types that convey the perfect semantic content:

Next, we decide to break into two teams, each with their own service. One will tackle the photo related features and the other will focus on the auction infrastructure. These two services will both live behind a single “gateway” that is responsible for merging the two schemas together. We want the client to be able to query the API without being sensitive to the actual organization of the backend. After some research, we run into mergeSchemas from the graphql-tools node package and from what we can tell, it should work for our use case.

# Breaking Down the Schema

The first question we have to answer is: “How should we divide this schema between our two teams?” Given the constraints set on us from mergeSchemas, our first impulse might be to split the target schema right down the middle with a single type belonging to only one domain.

Our first attempt at breaking up the schema. Auction service on top. Photo service on bottom.
Unfortunately, this doesn’t work. The services wouldn’t be able to run with these schemas since there are fields (Photo.auction for example) that refer to types that aren’t defined within the context of the service.

In order to make the schemas valid on their own, we have to replace the problematic references with ID fields and add some additional fields to resolve the relationships:

At least this time the schemas are valid. Auction service on top. User service on bottom.
With these fields in place, we could now start our servers and merge the two schemas together in the gateway and let the client query both services. Unfortunately, we don’t yet have the ability to query relationships that cross the service boundary without manually threading the object’s ID from one query to another.

To add those fields, we have to go over to our gateway’s source code and extend the types with the new fields after merging them.

We have to add the missing fields with a third schema defined in the gateway.
We then have to define resolvers in our gateway that manually wire up our schema such that computing
User.favoritePhoto takes the user’s ID and passes it onto `Query.favoritePhotoForUser` which is defined
by the other service. We also have to do the same for every other relationship that crosses service
boundaries. It’s okay though because at this point we’ve added the same boilerplate so many times that
we’re convinced this is all required.

> This is just what ‘orchestration’ looks like for a distributed GraphQL API.

# The Problems with Schema Delegation

This approach is usually referred to as “schema delegation” and while it ultimately gets us pretty close to what we want, there are a few problems worth pointing out.

Adding new features is complex. In order to keep our schemas valid, we moved some of our domain-specific logic out of the service and into the gateway layer. A simple task like adding a new field turns into a sprawling set of changes all over the system. This has caused a lot of confusion for me and my coworkers when trying to understand where a certain bit of logic belongs.

The final schema is awkward. Without careful filtering afterwards, the final type definition for Photo and Query both have fields which are byproducts of the way we implemented the API. For example, Query.favoritePhotoForUser was only added so that we could eventually take the id a user object and delegate the rest of the query to that field. These fields should ideally be hidden from the user. If we do add a bit to our gateway that filters them out, those filters have to be updated any time anything is added to the schema thats only meant for internal use.

The actual delegation logic is tricky. I haven’t shown an actual example of the logic required to stitch fields together but if you’re interested in what it looks like, check out the last example in this section of the graphql-tools documentation. It works in the simple situations but it can quickly become unwieldy. These fields also commonly involve network requests, and can also can cause performance issues unless we take a lot of care to make sure network requests are properly bundled.

As you can see, maintaining the gateway layer requires a lot of manual work. Thankfully, with a change of perspective there’s a way we can approach this problem that doesn’t feel like we’re trying to hammer a head of lettuce into a food processor.

# A New Approach to Schema Composition

The core assumption that has guided our design so far has been that the canonical definition of a type can only exist in one service. This forces fields that reference types in other services to rely on imperative delegation logic that carefully wires up the fields in each service.

Let’s look at how we could divide our original schema if we allow types to be defined in multiple domains at once:

Our final division. There’s no need for a third set that links different types together! Auction service on top. User service on bottom.

Allowing types to be spread across multiple services has given the domains clear boundaries. Adding a field on User that referenced aPhoto used to require adding internal fields like favoritePhotoForUser to the root of the query and then stitching them together in the gateway. Now the photo team can add the field to User directly without worrying about interfering with any other teams. So long as both services agree on the User's id, the two can be merged together and queried as a single API.

Without going too deep into the implementation details of how (that’s the topic for another post), the gateway is able to analyze an incoming request and execute the correct sequence of queries to retrieve the information. In short, it’s able to perform the repetitive manual logic from before without any intervention from the service teams.

# The Problems with Schema Delegation: Revisited

Let’s revisit the problems we outlined before and see how well we addressed them with this new approach.

The first problem was that adding a new feature was complex. Before, we were constrained by the architecture to define a type in a single service. If we wanted add a new feature that connected 2 types that happened to cross service boundaries, we had to change potentially 3 different services. Now that we don’t force types to be confined to a single service, feature development is not limited in a way that slows down development because of an architectural concern. If a team wants to contribute a field to a type, they are free to do so.

The second problem was that the final schema was awkward. Schema delegation forced us to add a bunch of ID fields to our objects that we had to manually wire together. In this new declarative picture, each service provides a description of what information it can provide to the client. It’s the gateway’s job to stitch everything together. This lets the field be defined next to its target and removes the need for extraneous ID fields.

The third problem was that the actual delegation logic is tricky. While this new approach has admittedly complicated the gateway’s implementation, it generalized the gateway logic in a way that scales. Service teams are no longer responsible for maintaining the gateway layer which ultimately results in a more stable system.

# Conclusion

Letting our public schema and its type definitions be shared by many services has given us some kind of an answer to each problem that we encountered when stitching the schemas together by hand. This approach (coined by the folks over at Apollo as “Schema Federation” ) allows teams to treat their service schemas as declarative and composable units that clearly define domain boundaries without writing any logic in the gateway to combine them.

--

That’s it for now. Thanks for reading!

If you’re interested in seeing how this all works in practice, you should hop over to [this post]() where I build out an example that stitches two services together and go into some more detail how the system works.
