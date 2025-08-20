import { gql } from "@apollo/client"

export const ADD_ITINERARY = gql`
mutation AddItinerary($name: String!) {
    createItinerary(name: $name) {
        id
        name
        climbs {
            id
            name
        }
    }
}`