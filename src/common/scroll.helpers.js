export const getScrollDownPercentage = (window) => {
  const pageHeight = window.document.documentElement.scrollHeight;
  const { clientHeight } = window.document.documentElement;
  const scrollPos = window.pageYOffset;
  const currentPosition = scrollPos + clientHeight;
  const percentageScrolled = currentPosition / pageHeight;
  return percentageScrolled;
};
