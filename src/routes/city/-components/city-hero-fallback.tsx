export const CityHeroFallback = () => {
  return (
    <div className="bg-card text-muted-foreground flex flex-col items-center justify-center gap-3 rounded-[20px] py-[121px]">
      <div className="flex justify-center gap-2.5">
        <span
          className="bg-neutral-0 aspect-square w-3 animate-[bounce_0.6s_infinite] rounded-full"
          style={{ animationDelay: "0ms" }}
        ></span>
        <span
          className="bg-neutral-0 aspect-square w-3 animate-[bounce_0.6s_infinite] rounded-full"
          style={{ animationDelay: "200ms" }}
        ></span>
        <span
          className="bg-neutral-0 aspect-square w-3 animate-[bounce_0.6s_infinite] rounded-full"
          style={{ animationDelay: "400ms" }}
        ></span>
      </div>

      <p className="text-preset-6">Loading...</p>
    </div>
  );
};
