export const checkExhaustiveness = (target: never): Error => {
  // return new Error(`Unknown type: ${target satisfies never}`);
  return new Error(`Unknown type: ${(target as { type: "__invalid__" }).type}`);
};
