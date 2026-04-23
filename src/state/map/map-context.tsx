import { createContext, useContext } from "react";
import type { Dispatch } from "react";
import type { MapState } from "@/interfaces/state.interface";
import type { MapAction } from "./map-actions";

interface MapContextValue {
  state: MapState;
  dispatch: Dispatch<MapAction>;
}

export const MapContext = createContext<MapContextValue | undefined>(undefined);

export const useMapContext = (): MapContextValue => {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error("useMapContext must be used inside MapProvider");
  }

  return context;
};
