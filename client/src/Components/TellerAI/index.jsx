import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/Auth";

const index = () => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      (function (w, d, s, o, f, js, fjs) {
        w["botsonic_widget"] = o;
        w[o] =
          w[o] ||
          function () {
            (w[o].q = w[o].q || []).push(arguments);
          };
        (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
        js.id = o;
        js.src = f;
        js.async = 1;
        fjs.parentNode.insertBefore(js, fjs);
      })(
        window,
        document,
        "script",
        "Botsonic",
        "https://widget.writesonic.com/CDN/botsonic.min.js"
      );

      window.Botsonic("init", {
        serviceBaseUrl: "https://api.botsonic.ai",
        token: "d901214d-8749-4cd8-a6c8-2740b736e316",
      });
    }

    return () => {};
  }, [user]); // Depend on 'user' so the effect runs whenever 'user' changes

  return null;
};

export default index;
