import { Div } from "@repetitive-ui/primitives/div/Div";
import { Logo } from "@repetitive-ui/ui/logo/Logo";
import { cn } from "@repetitive-ui/utils";
import { Link } from "@repetitive-ui/primitives/link/Link";
import { Span } from "@repetitive-ui/primitives/span/Span";
import { ReactNode } from "react";

type UiDemo = {
  name: string;
  demoHref: string;
};

type UiDemoCardProps = {
  ui: UiDemo;
};

const UiCard = ({ ui }: UiDemoCardProps) => {
  return (
    <Link href={ui.demoHref}>
      <Div className="flex flex-col items-center justify-center p-3 border rounded-md min-h-40 hover:scale-105 transform transition duration-300 hover:border-primary/75 bg-background">
        <Span className="text-lg font-medium">{ui.name}</Span>
      </Div>
    </Link>
  );
};

type UiDemoListContainerProps = {
  children: ReactNode;
  numberOfDemos: number;
};

const makeDynamicContainerClassName = (numberOfDemos: number) => {
  switch (numberOfDemos) {
    case 1:
      return "";
    case 2:
      return "sm:grid-cols-2 sm:max-w-3xl";
    case 3:
      return "sm:grid-cols-2 sm:max-w-5xl";
    default:
      return "sm:grid-cols-2 xl:grid-cols-3 sm:max-w-none xl:max-w-6xl";
  }
};

const UiDemoListContainer = ({
  children,
  numberOfDemos,
}: UiDemoListContainerProps) => {
  const dynamicClassName = makeDynamicContainerClassName(numberOfDemos);
  return (
    <Div className="flex flex-col gap-10 pt-6">
      <Div className="flex justify-center">
        <Div
          className={cn([
            "grid gap-5 w-full grid-cols-1 max-w-sm",
            dynamicClassName,
          ])}
        >
          {children}
        </Div>
      </Div>
    </Div>
  );
};

type UiDemoListProps = {
  uis: UiDemo[];
};

const UiDemoList = ({ uis }: UiDemoListProps) => {
  return (
    <UiDemoListContainer numberOfDemos={uis.length}>
      {uis.map((ui) => (
        <UiCard key={ui.demoHref} ui={ui} />
      ))}
    </UiDemoListContainer>
  );
};

const uis: UiDemo[] = [
  {
    name: "Stateful Authenticator",
    demoHref: "/stateful-auth",
  },
];

export default function Home() {
  return (
    <Div className="flex min-h-dvh flex-col flex-1 py-12 px-4 lg:px-10 gap-6">
      <Logo />
      <UiDemoList uis={uis} />
    </Div>
  );
}
