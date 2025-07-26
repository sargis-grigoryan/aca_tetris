import { SHAPES } from "./shapes";

export const getRandomShape = () => {
  const shapeKeys = Object.keys(SHAPES);
  const randomKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
  const shapeData = SHAPES[randomKey];
  return shapeData.blocks.map(({ i, j }) => ({
    i: i - 1,
    j,
    color: shapeData.color,
  }));
};
