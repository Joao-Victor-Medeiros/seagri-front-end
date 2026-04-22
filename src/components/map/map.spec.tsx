import { createElement } from "react";
import { describe, expect, it } from "@jest/globals";
import { render, waitFor } from "@testing-library/react";
import { MapComponent } from "@/components/map";
import { RootProvider } from "@/state/root-provider";
import { isWithinDistritoFederalBoundingBox } from "@/utils/map-bounds";

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
	it("deve aceitar coordenadas exatamente nos limites da Bounding Box do DF", () => {
		expect(isWithinDistritoFederalBoundingBox({ lat: -15.48, lng: -47.8 })).toBe(true);
		expect(isWithinDistritoFederalBoundingBox({ lat: -16.05, lng: -47.8 })).toBe(true);
		expect(isWithinDistritoFederalBoundingBox({ lat: -15.8, lng: -47.3 })).toBe(true);
		expect(isWithinDistritoFederalBoundingBox({ lat: -15.8, lng: -48.28 })).toBe(true);
	});

	it("deve rejeitar coordenadas imediatamente fora dos limites da Bounding Box do DF", () => {
		expect(isWithinDistritoFederalBoundingBox({ lat: -15.4799, lng: -47.8 })).toBe(false);
		expect(isWithinDistritoFederalBoundingBox({ lat: -16.0501, lng: -47.8 })).toBe(false);
		expect(isWithinDistritoFederalBoundingBox({ lat: -15.8, lng: -47.2999 })).toBe(false);
		expect(isWithinDistritoFederalBoundingBox({ lat: -15.8, lng: -48.2801 })).toBe(false);
	});
});

describe("verificar precisão das casas decimais para coordenadas", () => {

})
