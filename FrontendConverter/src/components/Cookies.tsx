import { useState } from "react";
import Cookies from "js-cookie";
import "./Cookies.css";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const CookiesBanner: React.FC = () => {
  const [visible, setVisible] = useState(!Cookies.get("user_consent"));

  const acceptCookies = () => {
    Cookies.set("user_consent", "true", { expires: 365 });

    window.gtag?.("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });

    setVisible(false);
  };

  const rejectCookies = () => {
    Cookies.set("user_consent", "false", { expires: 365 });

    window.gtag?.("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Overlay que bloqueia o site */}
      <div className="cookies-overlay"></div>

      {/* Banner */}
      <div className="cookies-banner">
        <div className="cookies-box">
          <p>
            Este site utiliza cookies para melhorar a experiência e mostrar
            publicidade personalizada.
          </p>

          <div className="cookies-buttons">
            <button className="accept" onClick={acceptCookies}>
              Aceitar
            </button>
            <button className="reject" onClick={rejectCookies}>
              Recusar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiesBanner;
