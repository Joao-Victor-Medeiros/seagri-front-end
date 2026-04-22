import { describe, expect, it, jest } from "@jest/globals";
import type L from "leaflet";
import { useMapDrawing } from "@/hooks/map/use-map-drawing";
import type { GeoJsonPolygonFeature } from "@/interfaces/map.interface";

const dispatchMock = jest.fn();

type GeoJsonAction = {
	type: "SET_POLYGON_GEOJSON";
	payload: GeoJsonPolygonFeature | null;
};

jest.mock("@/state/map/map-context", () => ({
	useMapContext: () => ({
		state: {
			selectedLocation: null,
			polygonCoordinates: [],
			polygonGeoJSON: null,
		},
		dispatch: dispatchMock,
	}),
}));

describe("useMapDrawing - selecao de poligono", () => {
	it("deve gerar GeoJSON com coordenadas validas e faixa correta de lat/lng", () => {
		// Arrange
		dispatchMock.mockClear();
		const polygon = {
			getLatLngs: () => [
				[
					{ lat: -15.7939, lng: -47.8828 },
					{ lat: -15.7942, lng: -47.8834 },
					{ lat: -15.7928, lng: -47.8841 },
				],
			],
		} as unknown as L.Polygon;
		const { handlePolygonSelect } = useMapDrawing();

		// Act
		handlePolygonSelect(polygon);

		// Assert
		const geoJsonDispatch = dispatchMock.mock.calls
			.map((call) => call[0] as GeoJsonAction | undefined)
			.find((action) => action?.type === "SET_POLYGON_GEOJSON");

		expect(geoJsonDispatch).toBeDefined();
		expect(geoJsonDispatch.payload).not.toBeNull();

		const ring = geoJsonDispatch.payload.geometry.coordinates[0] as number[][];
		expect(ring.length).toBeGreaterThanOrEqual(4);

		for (const [lng, lat] of ring) {
			expect(lat).toBeGreaterThanOrEqual(-90);
			expect(lat).toBeLessThanOrEqual(90);
			expect(lng).toBeGreaterThanOrEqual(-180);
			expect(lng).toBeLessThanOrEqual(180);
		}
	});

	it("deve fechar o poligono repetindo o primeiro ponto no ultimo ponto (AAA)", () => {
		// Arrange
		dispatchMock.mockClear();
		const polygon = {
			getLatLngs: () => [
				[
					{ lat: -10.1, lng: -50.1 },
					{ lat: -10.2, lng: -50.4 },
					{ lat: -10.4, lng: -50.2 },
				],
			],
		} as unknown as L.Polygon;
		const { handlePolygonSelect } = useMapDrawing();

		// Act
		handlePolygonSelect(polygon);

		// Assert
		const geoJsonDispatch = dispatchMock.mock.calls
			.map((call) => call[0] as GeoJsonAction | undefined)
			.find((action) => action?.type === "SET_POLYGON_GEOJSON");

		expect(geoJsonDispatch).toBeDefined();
		expect(geoJsonDispatch.payload).not.toBeNull();

		const ring = geoJsonDispatch.payload.geometry.coordinates[0] as number[][];
		const firstPoint = ring[0];
		const lastPoint = ring[ring.length - 1];

		expect(lastPoint).toEqual(firstPoint);
	});
});
