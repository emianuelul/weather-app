export default class DomStuff {
  static createH = (type, content) => {
    if (type < 1 || type > 6) {
      return new Error(`Invalid Header Type: ${type}`);
    }

    const h = document.createElement(`h${type}`);
    h.textContent = content;

    return h;
  };

  static createP = (content) => {
    const p = document.createElement('p');
    p.textContent = content;

    return p;
  };

  static createDiv = (identifier) => {
    if (identifier[0] !== '.' && identifier[0] !== '#') {
      return new Error('First character must be an identifier');
    }

    const div = document.createElement('div');
    if (identifier[0] === '.') {
      div.classList.add(identifier.replace('.', ''));
    } else if (identifier[0] === '#') {
      div.id = identifier.replace('#', '');
    }

    return div;
  };
}
