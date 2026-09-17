export const createRestoreGuard = () => {
  let isActive = false;

  return {
    start: () => {
      if (isActive) {
        return false;
      }

      isActive = true;
      return true;
    },
    finish: () => {
      isActive = false;
    },
  };
};
