/* ==========================================================================
   Halcourt Search — Analytics (GA4)
   ========================================================================== */

(function() {
  'use strict';

  const COOKIE_CONSENT_STORAGE_KEY = 'cookieConsent';
  const COOKIE_CONSENT_ACCEPTED_VALUE = 'accepted';
  const COOKIE_CONSENT_ACCEPTED_EVENT_NAME = 'halcourt:cookie-consent-accepted';
  const GOOGLE_TAG_MANAGER_SCRIPT_ID = 'google-tag-manager';
  const GA_MEASUREMENT_ID_META_NAME = 'ga-measurement-id';

  function getMeasurementId() {
    const meta = document.querySelector('meta[name="' + GA_MEASUREMENT_ID_META_NAME + '"]');
    if (!meta) return '';
    const content = meta.getAttribute('content');
    if (!content) return '';
    return content.trim();
  }

  function hasAcceptedCookies() {
    try {
      return localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === COOKIE_CONSENT_ACCEPTED_VALUE;
    } catch (err) {
      return false;
    }
  }

  function isGoogleTagManagerLoaded() {
    return Boolean(document.getElementById(GOOGLE_TAG_MANAGER_SCRIPT_ID));
  }

  function addGoogleTagManagerScript(measurementId) {
    if (isGoogleTagManagerLoaded()) return;
    const script = document.createElement('script');
    script.id = GOOGLE_TAG_MANAGER_SCRIPT_ID;
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }

  function initializeGtag(measurementId) {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = window.gtag || gtag;
    window.gtag('js', new Date());
    window.gtag('config', measurementId);
  }

  function loadGoogleAnalytics() {
    const measurementId = getMeasurementId();
    if (!measurementId) return;
    if (isGoogleTagManagerLoaded()) return;
    addGoogleTagManagerScript(measurementId);
    initializeGtag(measurementId);
  }

  function handleConsentAccepted() {
    if (!hasAcceptedCookies()) return;
    loadGoogleAnalytics();
  }

  if (hasAcceptedCookies()) {
    loadGoogleAnalytics();
  }

  window.addEventListener(COOKIE_CONSENT_ACCEPTED_EVENT_NAME, handleConsentAccepted);
})();

