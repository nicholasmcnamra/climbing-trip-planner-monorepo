import { gql } from "@apollo/client";

export const ADD_CLIMB = gql`
mutation AddClimb($itineraryId: ID!, $climb: ClimbInput!) {
    addClimbToItinerary(itineraryId: $itineraryId, climb: $climb) {
        id
        climbs {
            id
            uuid
            name
            grade
            type
            crag {
                id
                uuid
                name
            }
        }
    }
}
`