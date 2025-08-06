import { it } from "node:test";
import { createContext, RefObject, useContext, useRef, useState } from "react";

export type Trip = {
    selectedArea: any | null,
    selectedCrags: any[]
    startDate: Date | null,
    endDate: Date | null,
    gearList: any[],
    itinerary: {
        [area: string]: any[]; //will eventually be Climb[]
    };
};

export type TripContextType = {
    trip: RefObject<Trip>;
    addClimbToItinerary: (areaId: string, climb: any) => void;
    removeClimbFromItinerary: (areaId: string, climbId: string) => void;
    isClimbInItinerary: (areaId: string, climbId: string) => boolean;
};
export const TripContext = createContext<TripContextType | null>(null);

export const useTrip = () => {
    const context = useContext(TripContext);
    if (!context) {
        throw new Error("useTrip must be used within a TripProvider");
    }
    return context;
}

export const TripProvider = ({ children }:any) => {
    const trip = useRef<Trip>({
        selectedArea: null,
        selectedCrags: [],
        startDate: null,
        endDate: null,
        gearList: [],
        itinerary: {}
    });

    const [toggleAdded, setToggleAdded] = useState<boolean>(false);

    const addClimbToItinerary = (areaId: string, climb: any) => {
        const itinerary = trip.current.itinerary;

        if (!itinerary[areaId]) {
            itinerary[areaId] = [];
        }

        const alreadyAdded = itinerary[areaId].some((c:any) => c.id === climb.id);
        if (!alreadyAdded) {
            itinerary[areaId].push(climb);
            setToggleAdded(prev => !prev);
        }
    };

    const removeClimbFromItinerary = (areaId: string, climbId: string) => {
        const itinerary = trip.current.itinerary;

        if (itinerary[areaId]) {
            itinerary[areaId] = itinerary[areaId].filter((c:any) => c.id !== climbId);

            if (itinerary[areaId].length === 0) {
                delete itinerary[areaId];
            }
            setToggleAdded(prev => !prev);
        }
    };

    const isClimbInItinerary = (area: string, climbId: string): boolean => {
        const itinerary = trip.current.itinerary;
        return (
            itinerary[area]?.some((c:any) => c.id === climbId) ?? false
        );
    };

    return (
        <TripContext.Provider value={{trip, addClimbToItinerary, removeClimbFromItinerary, isClimbInItinerary}}>
            {children}
        </TripContext.Provider>
    )
}

