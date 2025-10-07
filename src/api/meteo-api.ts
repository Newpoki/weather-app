import z from "zod";

/** API used to get data about a multiple cities or a specific city */
const OPEN_METEO_GEOCODING_API_BASE_URL =
  "https://geocoding-api.open-meteo.com/v1";

/** API used for most of the API calls, such as the forecast for example */
const OPEN_METEO_API_BASE_URL = "https://api.open-meteo.com/v1";

export const METEO_API_ERRORS = {
  NOT_FOUND: {
    CODE: "NOT_FOUND",
    MESSAGE: "Location ID not found.",
  },
  UNKNOWN: {
    TITLE: "Something went wrong",
    CODE: "UNKNOWN",
    MESSAGE:
      "We couldn't connect to the server (API error). Please try again in a few moments.",
  },
} as const;

const errorSchema = z.object({
  error: z.literal(true),
  reason: z.string(),
});

const checkForAPIError = (json: unknown) => {
  const errorCheck = errorSchema.safeParse(json);

  if (!errorCheck.success) {
    return json;
  }

  if (errorCheck.data.reason === METEO_API_ERRORS.NOT_FOUND.MESSAGE) {
    throw new Error(errorCheck.data.reason, {
      cause: METEO_API_ERRORS.NOT_FOUND.CODE,
    });
  }

  throw new Error(errorCheck.data.reason, {
    cause: METEO_API_ERRORS.UNKNOWN.CODE,
  });
};

export const openMeteoAPI = async (endpoint: `/${string}`) => {
  const response = await fetch(`${OPEN_METEO_API_BASE_URL}${endpoint}`);

  const json = await response.json();

  return checkForAPIError(json);
};

export const openMeteoGeocodingAPI = async (endpoint: `/${string}`) => {
  const response = await fetch(
    `${OPEN_METEO_GEOCODING_API_BASE_URL}${endpoint}`,
  );

  const json = await response.json();

  return checkForAPIError(json);
};
