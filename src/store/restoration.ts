export const createRestoreGuard = () => {
  let activeToken: number | null = null;
  let nextToken = 0;

  return {
    start: () => {
      if (activeToken !== null) {
        return null;
      }

      nextToken += 1;
      activeToken = nextToken;
      return activeToken;
    },
    finish: (token: number | null) => {
      if (token === null || activeToken !== token) {
        return false;
      }

      activeToken = null;
      return true;
    },
    invalidate: () => {
      activeToken = null;
      nextToken += 1;
    },
  };
};
