import { updateVariantName } from "./utils";

describe("updateVariantName", () => {
  it("should return a new name with the variantName replaced for the selected propertyName", () => {
    const newName = updateVariantName({
      instanceName: "Radius=S, Border width=A",
      newVariantName: "X",
      propertyName: "Radius",
    });
    expect(newName).toBe("Radius=X, Border width=A");
  });
});
