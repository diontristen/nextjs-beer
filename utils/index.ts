export const getCurrentState = (state: Record<string, any >): any | null => {
    try {
      return JSON.parse(JSON.stringify(state));
    } catch (e) {
      return null;
    }
  };