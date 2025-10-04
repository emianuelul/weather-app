import DomStuff from './DomStuff/DomStuff';

const processor = (function () {
  const app = document.getElementById('app');
  app.appendChild(DomStuff.createH(1, 'Hello, World!'));

  const div = DomStuff.createDiv('.dick');
  app.appendChild(div);
})();
