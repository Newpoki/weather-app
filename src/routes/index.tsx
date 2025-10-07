import { BERLIN_CITY_ID } from "@/api/fetch-city-by-id";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  loader: () => {
    throw redirect({
      to: "/city/$city-id",
      params: { "city-id": BERLIN_CITY_ID },
    });
  },
});

function App() {
  return null;
}
