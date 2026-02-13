import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./Sidebar.css";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const Sidebar: React.FC = () => {
  const [rerender, setRerender] = useState(0);
  //const hasConsent = Cookies.get("user_consent") === "true";
const hasConsent = true; // força consentimento para validação

  useEffect(() => {
    const update = () => setRerender(Math.random());
    window.addEventListener("consent-updated", update);
    return () => window.removeEventListener("consent-updated", update);
  }, []);

  useEffect(() => {
    if (!hasConsent) return;

    window.adsbygoogle = window.adsbygoogle || [];

    const interval = setInterval(() => {
      try {
        window.adsbygoogle.push({});
        clearInterval(interval);
      } catch {
        console.warn("Ads ainda não prontos");
      }
    }, 500);

    return () => clearInterval(interval);
  }, [hasConsent, rerender]);

  if (!hasConsent) {
    return (
      <aside className="sidebar">
        <span className="ad-label">Advertisement disabled.</span>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <span className="ad-label">Advertisement</span>

      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2074067560911145"
        data-ad-slot="1491947858"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
};

export default Sidebar;
