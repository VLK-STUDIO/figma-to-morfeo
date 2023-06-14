export const getHexAndOpacity = (rgba: RGBA) => {
  const { r, g, b, a } = rgba;
  const hexR = r.toString(16).padStart(2, "0").toUpperCase();
  const hexG = g.toString(16).padStart(2, "0").toUpperCase();
  const hexB = b.toString(16).padStart(2, "0").toUpperCase();
  const opacityPercent = `${a * 100}`;
  return { hex: `${hexR}${hexG}${hexB}`, opacityPercent };
};
