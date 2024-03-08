import { H1 } from "@repetitive-ui/primitives/heading/Heading";
import { Span } from "@repetitive-ui/primitives/span/Span";

type LogoProps = { size?: "small" | "large" };

export const Logo = ({ size = "large" }: LogoProps) => {
  const mainSize = size === "large" ? "text-3xl" : "text-xl";
  const secondarySize = size === "large" ? "text-xl" : "text-sm";

  return (
    <H1 className={`${mainSize} font-bold text-center`}>
      {"Repetitive"}
      <Span
        className={`${secondarySize} font-bold text-center -ml-0.5 text-primary`}
      >
        {".ui"}
      </Span>
    </H1>
  );
};
