export function createElement(tag, classNames, attributes = {}) {
    const element = document.createElement(tag);
    if (classNames) element.className = classNames;
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    return element;
}
