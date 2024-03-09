import { StatefulAuthenticatorPage } from "@repetitive-ui/ui/stateful-auth/StatefulAuthenticator";
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
