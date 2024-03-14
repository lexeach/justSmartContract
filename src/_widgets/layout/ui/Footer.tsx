import { FlexHorizontal } from "@shared/ui/Grid";
import styles from "./Footer.module.scss";
import { ExternalLink } from "@shared/ui/ExternalLink";

export const Footer = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <FlexHorizontal>
          <ExternalLink href="https://webence.netlify.app">
            webence
          </ExternalLink>
          <p>|</p>
          <ExternalLink href="mailto:contact@justsmartcontracts.dev">
            Email
          </ExternalLink>
          <p>|</p>
          <p>Donations: 0xb8D4217B314192857a2Ba34F413008F4EAdfd0f0</p>
        </FlexHorizontal>
      </div>
    </div>
  );
};
