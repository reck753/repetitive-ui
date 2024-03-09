import { H1 } from "@repetitive-ui/primitives/heading/Heading";
import { StatefulAuthenticatorPage } from "@repetitive-ui/ui/auth/StatefulAuthenticator";
import { Logo } from "@repetitive-ui/ui/logo/Logo";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <StatefulAuthenticatorPage>
        <Logo />
      </StatefulAuthenticatorPage>
    </Suspense>
  );
}
