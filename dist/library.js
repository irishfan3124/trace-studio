{
  const dialog = $('libraryDialog');
  const search = $('drawingSearch');
  const categoryList = $('drawingCategories');
  const grid = $('drawingGrid');
  const drawings = Object.entries(drawingLibrary).flatMap(([category, entries]) =>
    entries.map(([name, path]) => ({ name, category, path }))
  );
  let category = 'All';
  let selected = null;

  function drawArtwork(drawing, size) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const context = canvas.getContext('2d');
    context.scale(size / 100, size / 100);
    context.strokeStyle = '#354c40';
    context.lineWidth = 1.65;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.stroke(new Path2D(drawing.path));
    return canvas;
  }

  function selectDrawing(drawing) {
    useLibraryDrawing(drawArtwork(drawing, 720), drawing.name);
    selected = drawing;
    dialog.close();
    $('viewer').scrollIntoView({ block: 'nearest' });
  }

  function drawingCard(drawing) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'drawing-card';
    const thumbnail = drawArtwork(drawing, 210);
    thumbnail.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.textContent = drawing.name;
    button.append(thumbnail, label);
    button.onclick = () => selectDrawing(drawing);
    return button;
  }

  const cards = new Map();

  function showDrawings() {
    const terms = search.value.toLowerCase().trim().split(/\s+/);
    const visible = drawings.filter(drawing =>
      (category === 'All' || drawing.category === category) &&
      terms.every(term => `${drawing.name} ${drawing.category}`.toLowerCase().includes(term))
    );
    const buttons = visible.map(drawing => {
      if (!cards.has(drawing)) cards.set(drawing, drawingCard(drawing));
      const button = cards.get(drawing);
      button.setAttribute('aria-current', String(drawing === selected && $('fileName').textContent === drawing.name));
      return button;
    });
    grid.replaceChildren(...buttons);
    $('drawingCount').textContent = `${visible.length} ${visible.length === 1 ? 'drawing' : 'drawings'}`;
    $('drawingEmpty').hidden = visible.length > 0;
    $('drawingScroll').scrollTop = 0;
  }

  for (const name of ['All', ...Object.keys(drawingLibrary)]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = name;
    button.setAttribute('aria-pressed', String(name === category));
    button.onclick = () => {
      category = name;
      for (const filter of categoryList.children) {
        filter.setAttribute('aria-pressed', String(filter === button));
      }
      showDrawings();
    };
    categoryList.append(button);
  }

  search.addEventListener('input', showDrawings);
  $('openLibrary').onclick = () => {
    showDrawings();
    dialog.showModal();
  };
  $('closeLibrary').onclick = () => dialog.close();
}
