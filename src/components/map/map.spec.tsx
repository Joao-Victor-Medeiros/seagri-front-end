import { createElement } from "react";
import { describe, expect, it } from "@jest/globals";
import { render, waitFor } from "@testing-library/react";
import { MapComponent } from "@/components/map";
import { RootProvider } from "@/state/root-provider";
import { DISTRITO_FEDERAL_BOUNDING_BOX, isWithinDistritoFederalBoundingBox, toFourDecimalPlaces } from "@/utils/map-bounds";

describe("renderização e integração com a biblioteca de mapas", () => {
	it("deve renderizar o componente de mapa leaflet para o usuario", async () => {
		// Arrange
		const tree = createElement(RootProvider, null, createElement(MapComponent));

		// Act
		const { container } = render(tree);

		// Assert
		await waitFor(() => {
			const leafletContainer = container.querySelector(".leaflet-container");
			expect(leafletContainer).not.toBeNull();
		});
	});
});

describe("analise coordenadas limites que sejam do DF - BVA", () => {
	it("deve validar coordenadas com bvaLimiteCoordenadas", () => {
		expect(isWithinDistritoFederalBoundingBox({ lat: -15.48, lng: -47.8 })).toBe(true);
		expect(isWithinDistritoFederalBoundingBox({ lat: -16.05, lng: -47.8 })).toBe(true);
		expect(isWithinDistritoFederalBoundingBox({ lat: -15.4799, lng: -47.8 })).toBe(false);
		expect(isWithinDistritoFederalBoundingBox({ lat: -16.0501, lng: -47.8 })).toBe(false);
	});
});

describe("verificar precisão das casas decimais para coordenadas", () => {
	it("deve converter número para 4 dígitos pós virgula", () => {
		expect(toFourDecimalPlaces(-15.751451162585285)).toBe(-15.7515);
		expect(toFourDecimalPlaces(-47.80001)).toBe(-47.8);
		expect(toFourDecimalPlaces(-15.123456)).toBe(-15.1235);
		expect(toFourDecimalPlaces(-47.3)).toBe(-47.3);
	});
})
