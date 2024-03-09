import { StatelessAuthenticatorPage } from "@repetitive-ui/ui/stateless-auth/StatelessAuthenticator";
import { Logo } from "@repetitive-ui/ui/logo/Logo";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <StatelessAuthenticatorPage>
        <Logo />
      </StatelessAuthenticatorPage>
    </Suspense>
  );
}
