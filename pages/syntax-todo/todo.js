function addTextElement(textSize) {
  const newText = document.createElement('div');
  newText.contentEditable = true;
  newText.className = 'widget';
  newText.style.fontSize = textSize;
  newText.textContent = `Edit me :-)`;
  universe.appendChild(newText);
  makeDraggable(makeState(newText), newText);
}

function addCheckboxElement() {
  const newCheckbox = document.createElement('div');
  newCheckbox.className = 'widget';
  newCheckbox.innerHTML = `<input type="checkbox">`;
  newCheckbox.addEventListener("change", function() {
    parse();
  });
  universe.appendChild(newCheckbox);
  makeDraggable(makeState(newCheckbox), newCheckbox);
}

function clamp(x, lo, hi) { return x < lo ? lo : x > hi ? hi : x; }

function makeState(el) {
  return {
    eventToCoordinates(event) { return { x: event.clientX, y: event.clientY }; },
    dragging: false,
    _pos: { x: 0, y: 0 },
    get pos() { return this._pos },
    set pos(p) {
      const container = el.parentNode.getBoundingClientRect();
      const bounds = el.getBoundingClientRect();
      this._pos = {
        x: clamp(p.x, 0, container.width - bounds.width),
        y: clamp(p.y, 0, container.height - bounds.height)
      };
      el.style.transform =
        `translate(${this._pos.x}px,${this._pos.y}px)`;
    },
  }
}

function makeDraggable(state, el) {
  // from https://www.redblobgames.com/making-of/draggable/
  function start(event) {
    if (event.button !== 0) return; // left button only
    let { x, y } = state.eventToCoordinates(event);
    state.dragging = { dx: state.pos.x - x, dy: state.pos.y - y };
    el.style.userSelect = 'none'; // if there's text
    el.style.webkitUserSelect = 'none'; // safari
  }

  function end(_event) {
    state.dragging = null;
    el.style.userSelect = ''; // if there's text
    el.style.webkitUserSelect = ''; // safari
  }

  function move(event) {
    if (!state.dragging) return;
    el.setPointerCapture(event.pointerId);
    let { x, y } = state.eventToCoordinates(event);
    state.pos = { x: x + state.dragging.dx, y: y + state.dragging.dy };
  }

  el.addEventListener('pointerdown', start);
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  el.addEventListener('pointermove', move);
  el.addEventListener('touchmove', (e) => {
    // Prevent scroll on mobile, but still allow clicking on checkboxes and
    // contenteditables
    if (state.dragging) e.preventDefault();
  });
}

const observer = new MutationObserver((mutations, observer) => {
  parse();
});

function unobserve() {
  observer.disconnect();
}

function reobserve() {
  observer.observe(universe, { attributes: true, childList: true, subtree: true, characterData: true });
}

class ParseError {
  constructor(text, el) {
    this.text = text;
    this.el = el;
  }
}

function parse() {
  unobserve();
  const elements = universe.querySelectorAll('.widget');

  universe.removeAttribute("data-error");
  for (const el of elements) {
    el.removeAttribute("data-error");
  }

  const widgets = elements.values().toArray().map((el) => {
    const bounds = el.getBoundingClientRect();
    return {
      el,
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height,
    }
  });

  try {
    const todoList = parseTodoList(widgets);

    for (const task of todoList.tasks) {
      const checked = task.checkbox.childNodes.item(0).checked;
      task.text.classList.toggle("checked", checked);
    }
  } catch (e) {
    if (e.el) {
      e.el.setAttribute("data-error", e.text);
    } else {
      universe.setAttribute("data-error", e.text);
    }
  }
  reobserve();
}

function parseTodoList(widgets) {
  // Sort vertically
  widgets.sort((a, b) => a.y - b.y);

  // Title is the topmost widget
  const top = widgets.shift();
  if (top === undefined) { throw new ParseError("Missing title") }
  const title = parseTitle(top);

  // Parse each task item
  let tasks = [];
  while (widgets.length > 0) {
    tasks.push(parseTask(widgets));
  }

  return {
    title,
    tasks,
  }
}

function parseTitle(widget) {
  const fontSize = parseTextSize(widget);
  if (fontSize < 24) { throw new ParseError("Text is not a title (font size is less than 24px)", widget.el) }
  return widget.el;
}

function parseTask(widgets) {
  // We expect `widgets` to be sorted vertically

  // Take the topmost text
  const textIndex = widgets.findIndex((w) => parses(parseText, w));
  if (textIndex === -1) { throw new ParseError("Missing text") }
  const text = widgets[textIndex];
  widgets.splice(textIndex, 1);

  // Take the closest checkbox to its left
  let checkboxes = Array.from(widgets
    .entries()
    .filter(([_, w]) => w.x < text.x)
    .filter(([_, w]) => parses(parseCheckbox, w)));
  checkboxes.sort((a, b) => distance(a[1], text) - distance(b[1], text));
  const checkbox = checkboxes.shift();
  if (checkbox === undefined) { throw new ParseError("Missing checkbox for text", text.el) }
  widgets.splice(checkbox[0], 1);

  return {
    checkbox: checkbox[1].el,
    text: text.el,
  }
}

function parses(parser, widget) {
  try {
    parser(widget);
    return true;
  } catch (e) {
    return false;
  }
}

function parseText(widget) {
  const fontSize = parseTextSize(widget);
  if (fontSize >= 24) { throw new ParseError("Text is not regular (font size is not less than 24px)", widget.el) }
  return widget;
}

function parseCheckbox(widget) {
  if (widget.el.childElementCount != 1) { throw new ParseError("Extra or missing children", widget.el) }
  const inner = widget.el.childNodes.item(0);
  if (inner === undefined) { throw new ParseError("Not a checkbox", widget.el) }
  if (inner.tagName !== "INPUT") { throw new ParseError("Not a checkbox", widget.el) }
  if (inner.type !== "checkbox") { throw new ParseError("Not a checkbox", widget.el) }
  return widget;
}

function parseTextSize(widget) {
  if (parses(parseCheckbox, widget)) { throw new ParseError("Expected text, found checkbox", widget.el) }
  let fontSize = 16;
  const match = widget.el.style.fontSize.match("(.+)px");
  if (match) {
    fontSize = +match[1];
  }
  return fontSize
}

function distance(a, b) {
  Math.abs(Math.sqrt(a.x * a.x + a.y * a.y) - Math.sqrt(b.x * b.x + b.y * b.y))
}

document.addEventListener("DOMContentLoaded", function() {
  const universe = document.querySelector('#universe');

  parse();
});
