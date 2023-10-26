export const trackEvent = (dataElement) => {
    window._st('addTagProperties', dataElement);
    window._st('loadTags');
};
