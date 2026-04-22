import { createElement } from "react";
import { describe, expect, it } from "@jest/globals";
import { render, waitFor } from "@testing-library/react";
import { MapComponent } from "@/components/map";
import { RootProvider } from "@/state/root-provider";

describe("MapComponent", () => {
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
