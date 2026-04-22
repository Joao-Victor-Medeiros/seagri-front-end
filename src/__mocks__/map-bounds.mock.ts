export const DISTRITO_FEDERAL_BOUNDING_BOX = {
    north: -15.48,
    south: -16.05,
    east: -47.3,
    west: -48.28,
} as const;

export const isWithinDistritoFederalBoundingBox = ({
    lat,
    lng,
}: {
    lat: number;
    lng: number;
}): boolean => {
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        return false;
    }

    return (
        lat <= DISTRITO_FEDERAL_BOUNDING_BOX.north &&
        lat >= DISTRITO_FEDERAL_BOUNDING_BOX.south &&
        lng <= DISTRITO_FEDERAL_BOUNDING_BOX.east &&
        lng >= DISTRITO_FEDERAL_BOUNDING_BOX.west
    );
};
