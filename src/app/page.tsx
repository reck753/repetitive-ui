import { H1 } from "@repetitive-ui/primitives/heading/Heading";
import { StatefulAuthenticatorPage } from "@repetitive-ui/ui/auth/StatefulAuthenticator";
import { Logo } from "@repetitive-ui/ui/logo/Logo";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <StatefulAuthenticatorPage>
        <H1 className="text-2xl text-center pt-12">
          Welcome to <Logo />
        </H1>
      </StatefulAuthenticatorPage>
    </Suspense>
  );
}
