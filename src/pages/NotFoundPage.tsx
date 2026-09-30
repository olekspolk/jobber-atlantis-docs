import { Link } from "@jobber/components/Link";
import { Typography } from "@jobber/components/Typography";
import { type ReactElement, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePageReady } from "../site/pageReady";
import { usePageTitle } from "../site/usePageTitle";
import styles from "./NotFoundPage.module.css";

const sealife = ["🐟", "🐠", "🐡", "🐙", "🦑", "🪼"];
const randomFish = () => <div className={styles.fish}>{sealife[Math.floor(Math.random() * sealife.length)]}</div>;

// The site's 404: a creature swims by every 30 seconds.
export const NotFoundPage = () => {
  usePageTitle("Not Found");
  usePageReady();
  const { pathname } = useLocation();
  const notFound = pathname.includes("components") ? "component" : "page";
  const showDeveloperMessage = window.location.host.includes("localhost") && notFound === "component";
  const [fish, setFish] = useState<ReactElement | null>(randomFish);
  const timer = useRef(0);

  useEffect(() => {
    const swim = () => {
      setFish(null);
      requestAnimationFrame(() => setFish(randomFish()));
      timer.current = window.setTimeout(swim, 30000);
    };
    timer.current = window.setTimeout(swim, 30000);
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <div className={styles.container}>
      {fish}
      <div className={styles.content}>
        <Typography element="h1" fontWeight="bold">
          🧜 404 - Lost at Sea
        </Typography>
        <Typography size="large">
          {"It seems you've ventured into uncharted waters. Atlantis might be hidden, but this "}
          {notFound}
          {" definitely doesn't exist!"}
        </Typography>
        {showDeveloperMessage && (
          <div>
            <Link url="/component-not-found" external={false}>
              Are you a developer and expecting something to be here?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
