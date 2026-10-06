export default defineNuxtPlugin(() => {
  const analyticsWindow = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  if (analyticsWindow.gtag) return;

  const dataLayer = analyticsWindow.dataLayer ??= [];
  analyticsWindow.gtag = function (..._args: unknown[]) {
    dataLayer.push(arguments);
  };
  analyticsWindow.gtag("js", new Date());
  analyticsWindow.gtag("config", "G-BCEKQE6TL2");
  useHead({
    script: [{
      key: "google-analytics",
      src: "https://www.googletagmanager.com/gtag/js?id=G-BCEKQE6TL2",
      async: true,
    }],
  });
});
