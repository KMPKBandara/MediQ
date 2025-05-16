export const formateDate = (date, config) => {
  const defaultOptions = { day: "numaric", month: "long", year: "numaric" };
  const options = config ? config : defaultOptions;

  return new Date(date).toLocaleDateString("en-US", options);
};
