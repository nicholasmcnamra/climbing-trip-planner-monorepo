import { gql } from "@apollo/client";

export const GET_AREAS = gql`
query GetAreas($area: String!){
  areas(filter: {area_name: {match: $area}}) {
    area_name
    uuid
    children {
      area_name
      uuid
      metadata {
        lat
        lng
      }
      climbs {
        id
        uuid
        name
        fa
        length
        boltsCount
        pitches {
          id
          parentId
          pitchNumber
          grades {
            vscale
            yds
            ewbank
            french
            brazilianCrux
            font
            uiaa
            wi
          }
          type {
            trad
            sport
            bouldering
            deepwatersolo
            alpine
            snow
            ice
            mixed
            aid
            tr
          }
          length
          boltsCount
          description
        }
        grades {
          vscale
          yds
          ewbank
          french
          brazilianCrux
          font
          uiaa
          wi
        }
        gradeContext
        type {
            trad
            sport
            bouldering
            deepwatersolo
            alpine
            snow
            ice
            mixed
            aid
            tr
        }
        safety
        metadata {
          lat
          lng
          left_right_index
          leftRightIndex
          mp_id
          climb_id
          climbId
        }
        content {
          description
          location
          protection
        }
      }
    }
  }
}
`