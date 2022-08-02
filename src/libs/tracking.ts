import ReactGA from "react-ga";

/* this is for initialize GA setup */
export const initGA = (trackingId) => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.initialize(trackingId);
  }
};

/* this is for getting url website when user access our websites */
export const PageView = () => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
};

/**
 * Event - Add custom tracking event.
 * This's for tracking when event clicked something like that they'll send the data to GA
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
export const Event = (category, action, label) => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.event({
      category: category,
      action: "Action: " + action + " Label: " + label,
      label: label,
    });
  }
};
