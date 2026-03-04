const pick = <T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      acc[key] = object[key];
    }
    return acc;
  }, {} as Pick<T, K>);
};

export default pick;
