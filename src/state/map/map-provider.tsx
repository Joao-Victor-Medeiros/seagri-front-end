import { useMemo, useReducer, type ReactNode } from "react";
import { MapContext } from "./map-context";
import { mapInitialState } from "./map-initial-state";
import { mapReducer } from "./map-reducer";

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider = ({ children }: MapProviderProps) => {
  const [state, dispatch] = useReducer(mapReducer, mapInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
