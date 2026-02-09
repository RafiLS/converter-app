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

    window.dispatchEvent(new Event("consent-updated"));

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

    window.dispatchEvent(new Event("consent-updated"));

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="cookies-overlay"></div>

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
