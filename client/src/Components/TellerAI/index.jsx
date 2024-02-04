import React, { useEffect } from "react";

const index = () => {
  useEffect(() => {
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

    return () => {};
  }, []);
  return null;
};

export default index;
