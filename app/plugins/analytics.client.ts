// export default defineNuxtPlugin(() => {
//   const gaId = "G-BCEKQE6TL2";
//   const gtmId = "GTM-M9WVZ9DK";
//   const analyticsWindow = window as Window & {
//     dataLayer?: unknown[];
//     gtag?: (...args: unknown[]) => void;
//   };

//   const dataLayer = analyticsWindow.dataLayer ??= [];
//   analyticsWindow.gtag ??= function (..._args: unknown[]) {
//     dataLayer.push(arguments);
//   };
//   analyticsWindow.gtag("js", new Date());
//   analyticsWindow.gtag("config", gaId);

//   useHead({
//     script: [
//       {
//         key: "google-analytics",
//         src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
//         async: true,
//       },
//       {
//         key: "google-tag-manager",
//         innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
//       },
//     ],
//   });
// });