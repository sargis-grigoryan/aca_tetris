export const shapes = {
  O: [
    {
      i: -2,
      j: 4,
    },
    {
      i: -2,
      j: 5,
    },
    {
      i: -1,
      j: 4,
    },
    {
      i: -1,
      j: 5,
    },
  ],
  I: [
    {
      i: -4,
      j: 5,
    },
    {
      i: -3,
      j: 5,
    },
    {
      i: -2,
      j: 5,
    },
    {
      i: -1,
      j: 5,
    },
  ],
  S: [
    {
      i: -2,
      j: 4,
    },
    {
      i: -2,
      j: 5,
    },
    {
      i: -1,
      j: 3,
    },
    {
      i: -1,
      j: 4,
    },
  ],
  Z: [
    {
      i: -2,
      j: 3,
    },
    {
      i: -2,
      j: 4,
    },
    {
      i: -1,
      j: 4,
    },
    {
      i: -1,
      j: 5,
    },
  ],
  L: [
    {
      i: -3,
      j: 5,
    },
    {
      i: -2,
      j: 5,
    },
    {
      i: -1,
      j: 5,
    },
    {
      i: -1,
      j: 6,
    },
  ],
  J: [
    {
      i: -3,
      j: 5,
    },
    {
      i: -2,
      j: 5,
    },
    {
      i: -1,
      j: 5,
    },
    {
      i: -1,
      j: 4,
    },
  ],
  T: [
    {
      i: -2,
      j: 4,
    },
    {
      i: -2,
      j: 5,
    },
    {
      i: -2,
      j: 6,
    },
    {
      i: -1,
      j: 5,
    },
  ],
}

export function generateRandomShape(shapes) {
    const shapeInitials = Object.keys(shapes);
    const randomShape = shapeInitials[Math.floor(Math.random() * shapeInitials.length)];

    return randomShape;
}