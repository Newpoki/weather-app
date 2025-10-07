import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { Header } from "@/components/header/header";

type RootContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-8 md:gap-12">
        <Header />

        <Outlet />
      </div>

      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: "Tanstack Query",
            render: <ReactQueryDevtools initialIsOpen={false} />,
          },
        ]}
      />
    </>
  );
}
