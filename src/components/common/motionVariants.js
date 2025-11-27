export const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export const staggeredChildren = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const cardEntrance = {
  hidden: { opacity: 0, scale: 0.98, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export const loaderBar = {
  initial: { opacity: 0.5, y: 0 },
  animate: (custom) => ({
    opacity: [0.5, 1, 0.5],
    y: [0, -18, 0],
    transition: {
      delay: custom,
      duration: 0.9,
      ease: "easeInOut",
      repeat: Infinity,
    },
  }),
};
