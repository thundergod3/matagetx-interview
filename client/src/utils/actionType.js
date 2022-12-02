const actionType = (type) => ({
  ROOT: `${type}`,
  REQUEST: `${type}_REQUEST`,
  SUCCEEDED: `${type}_SUCCEEDED`,
  FAILED: `${type}_FAILED`,
  RESET: `${type}_RESET`,
});

export default actionType;
