import { useEffect } from "react";
import Cookies from "js-cookie";
import "./Sidebar.css";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const Sidebar: React.FC = () => {
  const hasConsent: boolean = Cookies.get("user_consent") === "true";

 useEffect(() => {
  if (!hasConsent) return;

  const interval = setInterval(() => {
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      try {
        window.adsbygoogle.push({});
        clearInterval(interval);
      } catch (e) {
        console.warn("Ads ainda não prontos");
      }
    }
  }, 500);

  return () => clearInterval(interval);
}, [hasConsent]);


  if (!hasConsent) {
    return (
      <aside className="sidebar">
        <span className="ad-label">Publicidade desativada</span>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <span className="ad-label">Publicidade</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXX" // substitui pelo teu Publisher ID
        data-ad-slot="1234567890"            // substitui pelo Ad Slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
};

export default Sidebar;
