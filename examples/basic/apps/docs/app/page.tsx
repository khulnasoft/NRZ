import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ThemeImage
          className={styles.logo}
          srcLight="nrz-dark.svg"
          srcDark="nrz-light.svg"
          alt="Nrz logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>apps/docs/app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://khulnasoft.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Nrz&demo-url=https%3A%2F%2Fexamples-basic-web.khulnasoft.sh%2F&from=templates&project-name=Monorepo+with+Nrz&repository-name=monorepo-nrz&repository-url=https%3A%2F%2Fgithub.com%2Fkhulnasoft%2Fnrz%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=khulnasoft&utm_source=create-nrz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/khulnasoft.svg"
              alt="Khulnasoft logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nrz.build/repo/docs?utm_source"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
        <Button appName="docs" className={styles.secondary}>
          Open alert
        </Button>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://khulnasoft.com/templates?search=nrz&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nrz.build?utm_source=create-nrz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nrz.build →
        </a>
      </footer>
    </div>
  );
}
