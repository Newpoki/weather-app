export const formatHumidity = (temperature: number | undefined) => {
  if (temperature == null) {
    return "N/A";
  }

  return `${temperature.toFixed()} %`;
};
