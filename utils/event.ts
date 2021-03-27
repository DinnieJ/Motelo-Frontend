export const stopEventFromParentElement = (event: Event) => {
  event.stopPropagation();
}