export const updateVariantName = ({
  instanceName,
  newVariantName,
  propertyName,
}: {
  instanceName: string;
  newVariantName: string;
  propertyName: string;
}) => {
  const regex = new RegExp(`${propertyName}=[^,]+`, "i");
  const newSlice = `${propertyName}=${newVariantName}`;
  const updatedName = instanceName.slice().replace(regex, newSlice);
  return updatedName;
};
