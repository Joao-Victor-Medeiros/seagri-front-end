import { useEffect } from "react";
import { useMapContext } from "@/state/map/map-context";
import { DEFAULT_USER_LOCATION } from "@/utils/constants";

export const useUserGeolocation = () => {
  const { state, dispatch } = useMapContext();

  useEffect(() => {
    if (state.userLocation) {
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch({
            type: "SET_USER_LOCATION",
            payload: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        () => {
          dispatch({
            type: "SET_USER_LOCATION",
            payload: DEFAULT_USER_LOCATION,
          });
        },
      );
      return;
    }

    dispatch({
      type: "SET_USER_LOCATION",
      payload: DEFAULT_USER_LOCATION,
    });
  }, [dispatch, state.userLocation]);

  return {
    userLocation: state.userLocation,
  };
};
