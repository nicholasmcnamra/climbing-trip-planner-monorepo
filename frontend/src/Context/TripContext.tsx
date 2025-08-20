import { createContext, RefObject, useContext, useEffect, useRef, useState } from "react";
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
    trip: Trip;
    createItinerary: (name: string) => Promise<void>;
    addClimbToItinerary: (climb: any, crag: any) => Promise<void>;
    removeClimbFromItinerary: (climbId: string) => Promise<void>;
    isClimbInItinerary: (climbId: string) => boolean;
    setTrip: React.Dispatch<React.SetStateAction<Trip>>;
};

export const TripContext = createContext<TripContextType | null>(null);

export const useTrip = () => {
    const context = useContext(TripContext);
    if (!context) throw new Error("useTrip must be used within a TripProvider");
    return context;
};

const LOCAL_STORAGE_KEY = "tripState";

export const TripProvider = ({ children }: any) => {
    const initialTrip: Trip = (() => {
        try {
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (!saved) return {
                selectedArea: null,
                startDate: null,
                endDate: null,
                itineraryId: null,
                addedClimbs: {}
            };
            const parsed = JSON.parse(saved);
            return {
                ...parsed,
                startDate: parsed.startDate ? new Date(parsed.startDate) : null,
                endDate: parsed.endDate ? new Date(parsed.endDate) : null
            };
        } catch {
            return {
                selectedArea: null,
                startDate: null,
                endDate: null,
                itineraryId: null,
                addedClimbs: {}
            };
        }
    })();

    const [trip, setTrip] = useState<Trip>(initialTrip);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trip));
    }, [trip]);

    const createItinerary = async (name: string) => {
        const { data } = await apiClient.mutate({
            mutation: ADD_ITINERARY,
            variables: { name }
        });

        const newItinerary = data?.createItinerary;
        if (!newItinerary) {
            throw new Error("No itinerary returned.");
        }

        setTrip(prev => ({
            ...prev,
            itineraryId: newItinerary.id,
            addedClimbs: {}
        }));
    };

    const addClimbToItinerary = async (climb: any, crag: any) => {
        if (!trip.itineraryId) return;
        console.log(climb)
        const { data } = await apiClient.mutate({
            mutation: ADD_CLIMB,
            variables: {
                itineraryId: trip.itineraryId,
                climb: {
                    uuid: climb.uuid,
                    name: climb.name,
                    grade: getGrade(climb.grades),
                    type: getGradeType(climb.type).join(", "),
                    crag: {
                        uuid: crag.uuid,
                        name: crag.area_name,
                        area: trip.selectedArea?.area_name || ""
                    }
                }
            }
        });

        setTrip(prev => ({
            ...prev,
            addedClimbs: {
                ...prev.addedClimbs,
                [climb.uuid]: {
                    ...climb,
                    crag: {
                        uuid: crag.uuid,
                        name: crag.area_name,
                        area: crag.area || ""
                    },
                    itineraryId: trip.itineraryId
                }
            }
        }));
        console.log(data);
    };

    const removeClimbFromItinerary = async (climbId: string) => {
        if (!trip.itineraryId) return;

        setTrip(prev => {
            const updated = { ...prev.addedClimbs };
            delete updated[climbId];
            return { ...prev, addedClimbs: updated };
        });
    };

    const isClimbInItinerary = (climbId: string) => {
        return !!trip.addedClimbs[climbId];
    };

    return (
        <TripContext.Provider value={{
            trip,
            createItinerary,
            addClimbToItinerary,
            removeClimbFromItinerary,
            isClimbInItinerary,
            setTrip
        }}>
            {children}
        </TripContext.Provider>
    );
};