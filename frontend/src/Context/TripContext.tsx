import { createContext, RefObject, useContext, useRef, useState } from "react";
import { apiClient } from "../App";
import { ADD_ITINERARY } from "../GraphQL/AddItinerary";
import { ADD_CLIMB } from "../GraphQL/AddClimb";
import { getGrade, getGradeType } from "../functions";

export type Trip = {
    selectedArea: any | null;
    startDate: Date | null;
    endDate: Date | null;
    itineraryId: string | null;
    addedClimbs: { [climbId: string]: any };
};

export type TripContextType = {
    trip: RefObject<Trip>;
    createItinerary: (name: string) => Promise<void>;
    addClimbToItinerary: (climb: any, crag: any) => Promise<void>;
    removeClimbFromItinerary: (climbId: string) => Promise<void>;
    isClimbInItinerary: (climbId: string) => boolean;
};

export const TripContext = createContext<TripContextType | null>(null);

export const useTrip = () => {
    const context = useContext(TripContext);
    if (!context) throw new Error("useTrip must be used within a TripProvider");
    return context;
};

export const TripProvider = ({ children }: any) => {
    const trip = useRef<Trip>({
        selectedArea: null,
        startDate: null,
        endDate: null,
        itineraryId: null,
        addedClimbs: {}
    });

    const [toggle, setToggle] = useState(false);

    const createItinerary = async (name: string) => {
        const { data } = await apiClient.mutate({
            mutation: ADD_ITINERARY,
            variables: { name }
        });

        const newItinerary = data?.createItinerary;
        if (!newItinerary) {
            throw new Error("No itinerary returned.");
        }

        trip.current.itineraryId = newItinerary.id;
        trip.current.addedClimbs = {};
        setToggle(prev => !prev);
    };

    const addClimbToItinerary = async (climb: any, crag: any) => {
        if (!trip.current.itineraryId) return;
        console.log(climb)
        const { data } = await apiClient.mutate({
            mutation: ADD_CLIMB,
            variables: {
                itineraryId: trip.current.itineraryId,
                climb: {
                    uuid: climb.uuid,
                    name: climb.name,
                    grade: getGrade(climb.grades),
                    type: getGradeType(climb.type).join(", "),
                    crag: {
                        uuid: crag.uuid,
                        name: crag.area_name,
                        area: trip.current.selectedArea?.area_name || ""
                    }
                }
            }
        });

        trip.current.addedClimbs[climb.uuid] = { 
            ...climb, 
            crag: {
                uuid: crag.uuid,
                name: crag.area_name,
                area: crag.area || "",
            },
            itineraryId: trip.current.itineraryId
        };
        setToggle(prev => !prev);
        console.log(data);
    };

    const removeClimbFromItinerary = async (climbId: string) => {
        if (!trip.current.itineraryId) return;

        // const { data } = await apiClient.mutate({
        //     mutation: REMOVE_CLIMB,
        //     variables: {
        //         itineraryId: trip.current.itineraryId,
        //         climbId
        //     }
        // });

        delete trip.current.addedClimbs[climbId];
        setToggle(prev => !prev);
    };

    const isClimbInItinerary = (climbId: string) => {
        return !!trip.current.addedClimbs[climbId];
    };

    return (
        <TripContext.Provider value={{
            trip,
            createItinerary,
            addClimbToItinerary,
            removeClimbFromItinerary,
            isClimbInItinerary
        }}>
            {children}
        </TripContext.Provider>
    );
};