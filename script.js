document.addEventListener('DOMContentLoaded', () => {
  let printers = JSON.parse(localStorage.getItem('printers') || '[]');
  let filaments = JSON.parse(localStorage.getItem('filaments') || '[]');
  let models = JSON.parse(localStorage.getItem('models') || '[]');
  let hourlyRates = JSON.parse(localStorage.getItem('hourlyRates') || '[]');
  let electricityPrices = JSON.parse(localStorage.getItem('electricityPrices') || '[]');

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => (Math.random() * 16 | 0).toString(16));
  }

  function toDecimalHours(hhmm) {
    if (!hhmm || !/^\d+:\d{2}$/.test(hhmm)) return 0;
    const [h, m] = hhmm.split(':').map(Number);
    return h >= 0 && m >= 0 && m < 60 ? h + m / 60 : 0;
  }

  function toHHMM(decimalHours) {
    if (!decimalHours || isNaN(decimalHours)) return '00:00';
    const h = Math.floor(decimalHours);
    const m = Math.round((decimalHours - h) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  const burgerBtn = document.getElementById('burger-btn');
  const burgerMenu = document.getElementById('burger-menu');
  burgerBtn.addEventListener('click', e => {
    e.stopPropagation();
    burgerMenu.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!burgerMenu.contains(e.target) && !burgerBtn.contains(e.target)) burgerMenu.classList.remove('open');
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
  document.getElementById('theme-select').addEventListener('change', e => {
    const theme = e.target.value;
    applyTheme(theme);
    localStorage.setItem('theme', theme);
    burgerMenu.classList.remove('open');
  });
  applyTheme(localStorage.getItem('theme') || 'system');
  document.getElementById('theme-select').value = localStorage.getItem('theme') || 'system';

  let currentTimeField = null;
  window.openTimePicker = fieldId => {
    currentTimeField = fieldId;
    const modal = document.getElementById('time-picker-modal');
    const hoursScroll = document.getElementById('hours-scroll');
    const minutesScroll = document.getElementById('minutes-scroll');
    const timeInput = document.getElementById('time-input');
    let [h, m] = (document.getElementById(fieldId).value || '00:00').split(':').map(Number);
    timeInput.value = document.getElementById(fieldId).value || '00:00';

    hoursScroll.innerHTML = '';
    for (let i = 0; i <= 100; i++) {
      const div = document.createElement('div');
      div.textContent = i.toString().padStart(2, '0');
      div.onclick = () => timeInput.value = `${(h = i).toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      hoursScroll.appendChild(div);
    }

    minutesScroll.innerHTML = '';
    for (let i = 0; i < 60; i++) {
      const div = document.createElement('div');
      div.textContent = i.toString().padStart(2, '0');
      div.onclick = () => timeInput.value = `${h.toString().padStart(2, '0')}:${(m = i).toString().padStart(2, '0')}`;
      minutesScroll.appendChild(div);
    }

    timeInput.oninput = () => {
      const value = timeInput.value;
      if (/^\d+:\d{2}$/.test(value)) {
        [h, m] = value.split(':').map(Number);
        if (h >= 0 && m >= 0 && m < 60) timeInput.value = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      }
    };
    modal.style.display = 'flex';
  };

  window.confirmTime = () => {
    const timeInput = document.getElementById('time-input').value;
    if (/^\d+:\d{2}$/.test(timeInput)) {
      const [h, m] = timeInput.split(':').map(Number);
      if (h >= 0 && m >= 0 && m < 60) {
        document.getElementById(currentTimeField).value = timeInput;
        document.getElementById('time-picker-modal').style.display = 'none';
        currentTimeField = null;
      } else alert('Bitte geben Sie eine gültige Zeit ein (Stunden: >=0, Minuten: 0-59).');
    } else alert('Bitte geben Sie eine gültige Zeit im Format HH:MM ein.');
  };

  window.closeTimePicker = () => {
    document.getElementById('time-picker-modal').style.display = 'none';
    currentTimeField = null;
  };

  window.showPage = (pageId, event) => {
    if (event) event.preventDefault();
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId)?.classList.remove('hidden');
    burgerMenu.classList.remove('open');
  };

  window.togglePrinterMulticolor = () => document.getElementById('printer-color-count-section').classList.toggle('hidden', !document.getElementById('printer-multicolor').checked);

  window.toggleModelMulticolor = () => {
    document.getElementById('model-color-count-section').classList.toggle('hidden', !document.getElementById('model-multicolor').checked);
    updateModelFilaments();
  };

  window.updateModelFilaments = () => {
    const isMulticolor = document.getElementById('model-multicolor').checked;
    const colorCount = parseInt(document.getElementById('model-color-count').value) || 1;
    const container = document.getElementById('model-filaments');
    container.innerHTML = '';
    const filamentOptions = '<option value="">Wählen...</option>' + filaments.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
    for (let i = 0; i < (isMulticolor ? colorCount : 1); i++) {
      container.innerHTML += `
        <div class="filament-entry">
          <label class="block font-semibold">Filament ${isMulticolor ? (i + 1) : ''}</label>
          <select class="model-filament border p-2 w-full rounded">${filamentOptions}</select>
          <label class="block font-semibold mt-2">Filamentverbrauch (Gramm)</label>
          <input type="number" class="model-filament-usage border p-2 w-full rounded" min="0" />
        </div>`;
    }
  };

  function updatePrinterList() {
    const select = document.getElementById('printer');
    const list = document.getElementById('printer-list');
    select.innerHTML = '<option value="">Wählen...</option>';
    list.innerHTML = '';
    printers.forEach(p => {
      select.innerHTML += `<option value="${p.id}">${p.name}</option>`;
      list.innerHTML += `
        <li class="flex justify-between bg-white p-2 rounded shadow">
          <span>${p.name} - ${p.price} €, ${p.hours} h, ${p.power} kW${p.isMulticolor ? `, Multicolor (${p.colorCount})` : ''}</span>
          <div>
            <button onclick="editPrinter('${p.id}')" class="bg-green-500 text-white p-1 rounded hover:bg-green-600 mr-2">Bearbeiten</button>
            <button onclick="deletePrinter('${p.id}')" class="bg-red-500 text-white p-1 rounded hover:bg-red-600">Löschen</button>
          </div>
        </li>`;
    });
    localStorage.setItem('printers', JSON.stringify(printers));
  }

  function updateFilamentList() {
    const select = document.getElementById('filament');
    const list = document.getElementById('filament-list');
    select.innerHTML = '<option value="">Wählen...</option>';
    list.innerHTML = '';
    filaments.forEach(f => {
      const props = [f.metallic === 'none' ? '' : f.metallic === 'silver' ? 'Silber' : 'Gold', f.gloss === 'matte' ? 'Matt' : 'Glänzend'].filter(p => p).join(', ');
      select.innerHTML += `<option value="${f.id}">${f.name}</option>`;
      list.innerHTML += `
        <li class="flex justify-between bg-white p-2 rounded shadow">
          <span><span class="color-dot" style="background-color: ${f.color}"></span>${f.name}${props ? ` (${props})` : ''} - ${f.price} €/kg</span>
          <div>
            <button onclick="editFilament('${f.id}')" class="bg-green-500 text-white p-1 rounded hover:bg-green-600 mr-2">Bearbeiten</button>
            <button onclick="deleteFilament('${f.id}')" class="bg-red-500 text-white p-1 rounded hover:bg-red-600">Löschen</button>
          </div>
        </li>`;
    });
    localStorage.setItem('filaments', JSON.stringify(filaments));
    updateModelFilaments();
  }

  function updateModelList() {
    const select = document.getElementById('model');
    const list = document.getElementById('model-list');
    select.innerHTML = '<option value="">Kein Modell auswählen</option>';
    list.innerHTML = '';
    models.forEach(m => {
      const filamentInfo = m.isMulticolor ? `Multicolor (${m.filaments.length})` : `${m.filamentUsage} g`;
      select.innerHTML += `<option value="${m.id}">${m.name}</option>`;
      list.innerHTML += `
        <li class="flex justify-between bg-white p-2 rounded shadow">
          <span>${m.name} - Druck: ${toHHMM(m.printTime)}, Filament: ${filamentInfo}, Vorb.: ${toHHMM(m.prepTime)}, Nachb.: ${toHHMM(m.postTime)}, Design: ${toHHMM(m.designTime / m.sales)}/Einheit (Verkäufe: ${m.sales})</span>
          <div>
            <button onclick="editModel('${m.id}')" class="bg-green-500 text-white p-1 rounded hover:bg-green-600 mr-2">Bearbeiten</button>
            <button onclick="deleteModel('${m.id}')" class="bg-red-500 text-white p-1 rounded hover:bg-red-600">Löschen</button>
          </div>
        </li>`;
    });
    localStorage.setItem('models', JSON.stringify(models));
  }

  function updateHourlyRateList() {
    const select = document.getElementById('hourly-rate-select');
    const list = document.getElementById('hourly-rate-list');
    select.innerHTML = '<option value="">Wählen...</option>';
    list.innerHTML = '';
    hourlyRates.forEach(h => {
      select.innerHTML += `<option value="${h.id}">${h.name} (${h.rate} €/h)</option>`;
      list.innerHTML += `
        <li class="flex justify-between bg-white p-2 rounded shadow">
          <span>${h.name} - ${h.rate} €/h</span>
          <div>
            <button onclick="editHourlyRate('${h.id}')" class="bg-green-500 text-white p-1 rounded hover:bg-green-600 mr-2">Bearbeiten</button>
            <button onclick="deleteHourlyRate('${h.id}')" class="bg-red-500 text-white p-1 rounded hover:bg-red-600">Löschen</button>
          </div>
        </li>`;
    });
    localStorage.setItem('hourlyRates', JSON.stringify(hourlyRates));
  }

  function updateElectricityPriceList() {
    const select = document.getElementById('electricity-price-select');
    const list = document.getElementById('electricity-price-list');
    select.innerHTML = '<option value="">Wählen...</option>';
    list.innerHTML = '';
    electricityPrices.forEach(e => {
      select.innerHTML += `<option value="${e.id}">${e.name} (${e.price} €/kWh)</option>`;
      list.innerHTML += `
        <li class="flex justify-between bg-white p-2 rounded shadow">
          <span>${e.name} - ${e.price} €/kWh</span>
          <div>
            <button onclick="editElectricityPrice('${e.id}')" class="bg-green-500 text-white p-1 rounded hover:bg-green-600 mr-2">Bearbeiten</button>
            <button onclick="deleteElectricityPrice('${e.id}')" class="bg-red-500 text-white p-1 rounded hover:bg-red-600">Löschen</button>
          </div>
        </li>`;
    });
    localStorage.setItem('electricityPrices', JSON.stringify(electricityPrices));
  }

  window.checkMulticolorCompatibility = () => {
    const modelId = document.getElementById('model').value;
    const printerId = document.getElementById('printer').value;
    const warning = document.getElementById('multicolor-warning');
    const printerSelect = document.getElementById('printer');
    warning.classList.add('hidden');
    printerSelect.classList.remove('error-border');

    const model = models.find(m => m.id === modelId);
    const printer = printers.find(p => p.id === printerId);

    if (model && printer && model.isMulticolor) {
      if (!printer.isMulticolor) {
        warning.textContent = 'Der ausgewählte Drucker unterstützt kein Multicolor-Druck.';
        warning.classList.remove('hidden');
        printerSelect.classList.add('error-border');
      } else if (printer.colorCount < model.filaments.length) {
        warning.textContent = `Der ausgewählte Drucker unterstützt nur ${printer.colorCount} Farben. Dieses Modell benötigt ${model.filaments.length} Farben.`;
        warning.classList.remove('hidden');
        printerSelect.classList.add('error-border');
      }
    }
  };

  window.fillModelData = () => {
    const modelId = document.getElementById('model').value;
    const model = models.find(m => m.id === modelId);
    const filamentSection = document.getElementById('filament-section');
    const filamentUsageInput = document.getElementById('filament-usage');
    const multicolorSection = document.getElementById('multicolor-filaments');

    checkMulticolorCompatibility();

    if (model) {
      document.getElementById('print-time').value = toHHMM(model.printTime);
      document.getElementById('prep-time').value = toHHMM(model.prepTime);
      document.getElementById('post-time').value = toHHMM(model.postTime);
      document.getElementById('design-time').value = toHHMM(model.designTime / model.sales);
      if (model.isMulticolor) {
        filamentSection.classList.add('hidden');
        filamentUsageInput.classList.add('hidden');
        multicolorSection.classList.remove('hidden');
        multicolorSection.innerHTML = model.filaments.map((f, i) => `
          <div class="filament-entry">
            <label class="block font-semibold">Filament ${i + 1}</label>
            <select class="multicolor-filament border p-2 w-full rounded">
              <option value="">Wählen...</option>
              ${filaments.map(fil => `<option value="${fil.id}" ${fil.id === f.filamentId ? 'selected' : ''}>${fil.name}</option>`).join('')}
            </select>
            <label class="block font-semibold mt-2">Filamentverbrauch (Gramm)</label>
            <input type="number" class="multicolor-filament-usage border p-2 w-full rounded" min="0" value="${f.usage}" />
          </div>`).join('');
      } else {
        filamentSection.classList.remove('hidden');
        filamentUsageInput.classList.remove('hidden');
        multicolorSection.classList.add('hidden');
        document.getElementById('filament').value = model.filaments[0]?.filamentId || '';
        document.getElementById('filament-usage').value = model.filamentUsage;
      }
    } else {
      document.getElementById('print-time').value = '';
      document.getElementById('filament').value = '';
      document.getElementById('filament-usage').value = '';
      document.getElementById('prep-time').value = '';
      document.getElementById('post-time').value = '';
      document.getElementById('design-time').value = '';
      filamentSection.classList.remove('hidden');
      filamentUsageInput.classList.remove('hidden');
      multicolorSection.classList.add('hidden');
    }
  };

  window.fillHourlyRate = () => {
    const rateId = document.getElementById('hourly-rate-select').value;
    const rate = hourlyRates.find(h => h.id === rateId);
    document.getElementById('hourly-rate').value = rate ? rate.rate : '';
  };

  window.fillElectricityPrice = () => {
    const priceId = document.getElementById('electricity-price-select').value;
    const price = electricityPrices.find(e => e.id === priceId);
    document.getElementById('electricity-price').value = price ? price.price : '';
  };

  let editingPrinterId = null;
  document.getElementById('printer-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('printer-name').value.trim();
    const price = parseFloat(document.getElementById('printer-price').value);
    const hours = parseFloat(document.getElementById('printer-hours').value);
    const power = parseFloat(document.getElementById('printer-power').value);
    const isMulticolor = document.getElementById('printer-multicolor').checked;
    const colorCount = isMulticolor ? parseInt(document.getElementById('printer-color-count').value) : 0;

    if (!name || isNaN(price) || price < 0 || isNaN(hours) || hours <= 0 || isNaN(power) || power < 0.01 || power > 2) {
      alert('Bitte füllen Sie alle Felder korrekt aus (Preis ≥ 0, Stunden > 0, Stromaufnahme: 0,01–2 kW).');
      return;
    }

    const printerData = { id: editingPrinterId || generateUUID(), name, price, hours, power, isMulticolor, colorCount };
    if (editingPrinterId) {
      printers[printers.findIndex(p => p.id === editingPrinterId)] = printerData;
      editingPrinterId = null;
      document.getElementById('printer-submit').textContent = 'Hinzufügen';
    } else {
      printers.push(printerData);
    }
    updatePrinterList();
    document.getElementById('printer-form').reset();
    togglePrinterMulticolor();
  });

  window.editPrinter = id => {
    const printer = printers.find(p => p.id === id);
    if (printer) {
      editingPrinterId = id;
      document.getElementById('printer-name').value = printer.name;
      document.getElementById('printer-price').value = printer.price;
      document.getElementById('printer-hours').value = printer.hours;
      document.getElementById('printer-power').value = printer.power;
      document.getElementById('printer-multicolor').checked = printer.isMulticolor;
      document.getElementById('printer-color-count').value = printer.colorCount || 1;
      togglePrinterMulticolor();
      document.getElementById('printer-submit').textContent = 'Speichern';
    }
  };

  window.deletePrinter = id => {
    printers = printers.filter(p => p.id !== id);
    updatePrinterList();
  };

  let editingFilamentId = null;
  document.getElementById('filament-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('filament-name').value.trim();
    const color = document.getElementById('filament-color').value;
    const metallic = document.getElementById('filament-metallic').value;
    const gloss = document.getElementById('filament-gloss').value;
    const price = parseFloat(document.getElementById('filament-price').value);

    if (!name || isNaN(price) || price < 0) {
      alert('Bitte füllen Sie alle Felder korrekt aus (Preis ≥ 0).');
      return;
    }

    const filamentData = { id: editingFilamentId || generateUUID(), name, color, metallic, gloss, price };
    if (editingFilamentId) {
      filaments[filaments.findIndex(f => f.id === editingFilamentId)] = filamentData;
      editingFilamentId = null;
      document.getElementById('filament-submit').textContent = 'Hinzufügen';
    } else {
      filaments.push(filamentData);
    }
    updateFilamentList();
    document.getElementById('filament-form').reset();
    document.getElementById('filament-color').value = '#ff0000';
    document.getElementById('filament-metallic').value = 'none';
    document.getElementById('filament-gloss').value = 'matte';
  });

  window.editFilament = id => {
    const filament = filaments.find(f => f.id === id);
    if (filament) {
      editingFilamentId = id;
      document.getElementById('filament-name').value = filament.name;
      document.getElementById('filament-color').value = filament.color;
      document.getElementById('filament-metallic').value = filament.metallic;
      document.getElementById('filament-gloss').value = filament.gloss;
      document.getElementById('filament-price').value = filament.price;
      document.getElementById('filament-submit').textContent = 'Speichern';
    }
  };

  window.deleteFilament = id => {
    filaments = filaments.filter(f => f.id !== id);
    updateFilamentList();
  };

  let editingModelId = null;
  document.getElementById('model-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('model-name').value.trim();
    const printTime = toDecimalHours(document.getElementById('model-print-time').value || '00:00');
    const prepTime = toDecimalHours(document.getElementById('model-prep-time').value || '00:00');
    const postTime = toDecimalHours(document.getElementById('model-post-time').value || '00:00');
    const designTime = toDecimalHours(document.getElementById('model-design-time').value || '00:00');
    const sales = parseInt(document.getElementById('model-sales').value);
    const isMulticolor = document.getElementById('model-multicolor').checked;

    let filamentData;
    if (isMulticolor) {
      filamentData = Array.from(document.querySelectorAll('#model-filaments .filament-entry')).map(entry => ({
        filamentId: entry.querySelector('.model-filament').value,
        usage: parseFloat(entry.querySelector('.model-filament-usage').value)
      }));
      if (!filamentData.every(f => f.filamentId && f.usage > 0)) {
        alert('Bitte füllen Sie alle Filamentangaben korrekt aus (Filament auswählen, Verbrauch > 0).');
        return;
      }
    } else {
      const filamentId = document.querySelector('#model-filaments .model-filament').value;
      const filamentUsage = parseFloat(document.querySelector('#model-filaments .model-filament-usage').value);
      if (!filamentId || filamentUsage <= 0) {
        alert('Bitte geben Sie ein Filament und einen Verbrauch > 0 an.');
        return;
      }
      filamentData = [{ filamentId, usage: filamentUsage }];
    }

    if (!name || printTime <= 0 || sales < 1) {
      alert('Bitte füllen Sie alle Pflichtfelder korrekt aus (Name, Druckzeit > 0, Verkäufe ≥ 1).');
      return;
    }

    const modelData = {
      id: editingModelId || generateUUID(),
      name,
      printTime,
      prepTime,
      postTime,
      designTime,
      sales,
      isMulticolor,
      filaments: isMulticolor ? filamentData : [],
      filamentUsage: isMulticolor ? 0 : filamentData[0].usage
    };

    if (editingModelId) {
      models[models.findIndex(m => m.id === editingModelId)] = modelData;
      editingModelId = null;
      document.getElementById('model-submit').textContent = 'Hinzufügen';
    } else {
      models.push(modelData);
    }
    updateModelList();
    document.getElementById('model-form').reset();
    document.getElementById('model-sales').value = 1;
    document.getElementById('model-multicolor').checked = false;
    toggleModelMulticolor();
  });

  window.editModel = id => {
    const model = models.find(m => m.id === id);
    if (model) {
      editingModelId = id;
      document.getElementById('model-name').value = model.name;
      document.getElementById('model-print-time').value = toHHMM(model.printTime);
      document.getElementById('model-prep-time').value = toHHMM(model.prepTime);
      document.getElementById('model-post-time').value = toHHMM(model.postTime);
      document.getElementById('model-design-time').value = toHHMM(model.designTime);
      document.getElementById('model-sales').value = model.sales;
      document.getElementById('model-multicolor').checked = model.isMulticolor;
      document.getElementById('model-color-count').value = model.filaments.length || 1;
      toggleModelMulticolor();
      updateModelFilaments();
      if (model.isMulticolor) {
        const entries = document.querySelectorAll('#model-filaments .filament-entry');
        model.filaments.forEach((f, i) => {
          if (entries[i]) {
            entries[i].querySelector('.model-filament').value = f.filamentId;
            entries[i].querySelector('.model-filament-usage').value = f.usage;
          }
        });
      } else {
        const entry = document.querySelector('#model-filaments .filament-entry');
        entry.querySelector('.model-filament').value = model.filaments[0]?.filamentId || '';
        entry.querySelector('.model-filament-usage').value = model.filamentUsage;
      }
      document.getElementById('model-submit').textContent = 'Speichern';
    }
  };

  window.deleteModel = id => {
    models = models.filter(m => m.id !== id);
    updateModelList();
  };

  let editingHourlyRateId = null;
  document.getElementById('hourly-rate-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('hourly-rate-name').value.trim();
    const rate = parseFloat(document.getElementById('hourly-rate-value').value);

    if (!name || isNaN(rate) || rate < 0) {
      alert('Bitte füllen Sie alle Felder korrekt aus (Satz ≥ 0).');
      return;
    }

    const rateData = { id: editingHourlyRateId || generateUUID(), name, rate };
    if (editingHourlyRateId) {
      hourlyRates[hourlyRates.findIndex(h => h.id === editingHourlyRateId)] = rateData;
      editingHourlyRateId = null;
      document.getElementById('hourly-rate-submit').textContent = 'Hinzufügen';
    } else {
      hourlyRates.push(rateData);
    }
    updateHourlyRateList();
    document.getElementById('hourly-rate-form').reset();
  });

  window.editHourlyRate = id => {
    const rate = hourlyRates.find(h => h.id === id);
    if (rate) {
      editingHourlyRateId = id;
      document.getElementById('hourly-rate-name').value = rate.name;
      document.getElementById('hourly-rate-value').value = rate.rate;
      document.getElementById('hourly-rate-submit').textContent = 'Speichern';
    }
  };

  window.deleteHourlyRate = id => {
    hourlyRates = hourlyRates.filter(h => h.id !== id);
    updateHourlyRateList();
  };

  let editingElectricityPriceId = null;
  document.getElementById('electricity-price-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('electricity-price-name').value.trim();
    const price = parseFloat(document.getElementById('electricity-price-value').value);

    if (!name || isNaN(price) || price < 0.01 || price > 1) {
      alert('Bitte füllen Sie alle Felder korrekt aus (Preis: 0,01–1 €/kWh).');
      return;
    }

    const priceData = { id: editingElectricityPriceId || generateUUID(), name, price };
    if (editingElectricityPriceId) {
      electricityPrices[electricityPrices.findIndex(e => e.id === editingElectricityPriceId)] = priceData;
      editingElectricityPriceId = null;
      document.getElementById('electricity-price-submit').textContent = 'Hinzufügen';
    } else {
      electricityPrices.push(priceData);
    }
    updateElectricityPriceList();
    document.getElementById('electricity-price-form').reset();
  });

  window.editElectricityPrice = id => {
    const price = electricityPrices.find(e => e.id === id);
    if (price) {
      editingElectricityPriceId = id;
      document.getElementById('electricity-price-name').value = price.name;
      document.getElementById('electricity-price-value').value = price.price;
      document.getElementById('electricity-price-submit').textContent = 'Speichern';
    }
  };

  window.deleteElectricityPrice = id => {
    electricityPrices = electricityPrices.filter(e => e.id !== id);
    updateElectricityPriceList();
  };

  window.resetCalculator = () => {
    document.getElementById('calc-form').reset();
    document.getElementById('result').classList.add('hidden');
    document.getElementById('multicolor-warning').classList.add('hidden');
    document.getElementById('printer').classList.remove('error-border');
    document.getElementById('filament-section').classList.remove('hidden');
    document.getElementById('filament-usage').classList.remove('hidden');
    document.getElementById('multicolor-filaments').classList.add('hidden');
    document.getElementById('failure-rate').value = 10;
  };

  document.getElementById('calc-form').addEventListener('submit', e => {
    e.preventDefault();
    const modelId = document.getElementById('model').value;
    const printerId = document.getElementById('printer').value;
    const warning = document.getElementById('multicolor-warning');
    const printerSelect = document.getElementById('printer');
    warning.classList.add('hidden');
    printerSelect.classList.remove('error-border');

    const model = models.find(m => m.id === modelId);
    const printer = printers.find(p => p.id === printerId);

    if (!printerId) {
      alert('Bitte wählen Sie einen Drucker aus.');
      return;
    }

    if (model && model.isMulticolor) {
      if (!printer.isMulticolor) {
        warning.textContent = 'Der ausgewählte Drucker unterstützt keinen Multicolor-Druck.';
        warning.classList.remove('hidden');
        printerSelect.classList.add('error-border');
        return;
      } else if (printer.colorCount < model.filaments.length) {
        warning.textContent = `Der ausgewählte Drucker unterstützt nur ${printer.colorCount} Farben. Dieses Modell benötigt ${model.filaments.length} Farben.`;
        warning.classList.remove('hidden');
        printerSelect.classList.add('error-border');
        return;
      }
    }

    const printTime = toDecimalHours(document.getElementById('print-time').value || '00:00');
    const prepTime = toDecimalHours(document.getElementById('prep-time').value || '00:00');
    const postTime = toDecimalHours(document.getElementById('post-time').value || '00:00');
    const designTime = toDecimalHours(document.getElementById('design-time').value || '00:00');
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value) || 0;
    const electricityPrice = parseFloat(document.getElementById('electricity-price').value) || 0;
    const failureRate = parseFloat(document.getElementById('failure-rate').value) || 0;

    if (printTime <= 0) {
      alert('Bitte geben Sie eine Druckzeit größer als 0 ein.');
      return;
    }

    let totalFilamentCost = 0;
    if (model && model.isMulticolor) {
      const filamentData = Array.from(document.querySelectorAll('#multicolor-filaments .filament-entry')).map(entry => ({
        filamentId: entry.querySelector('.multicolor-filament').value,
        usage: parseFloat(entry.querySelector('.multicolor-filament-usage').value)
      }));

      if (!filamentData.every(f => f.filamentId && f.usage > 0)) {
        alert('Bitte geben Sie für alle Filamente einen Verbrauch > 0 an.');
        return;
      }

      filamentData.forEach(f => {
        const filament = filaments.find(fil => fil.id === f.filamentId);
        if (filament) totalFilamentCost += (f.usage * filament.price) / 1000;
      });
    } else {
      const filamentId = document.getElementById('filament').value;
      const filamentUsage = parseFloat(document.getElementById('filament-usage').value) || 0;

      if (!filamentId) {
        alert('Bitte wählen Sie ein Filament aus.');
        return;
      }
      if (filamentUsage <= 0) {
        alert('Bitte geben Sie einen Filamentverbrauch > 0 an.');
        return;
      }

      const filament = filaments.find(f => f.id === filamentId);
      if (filament) totalFilamentCost = (filamentUsage * filament.price) / 1000;
    }

    const depreciationCost = (printer.price / printer.hours) * printTime;
    const electricityCost = printer.power * printTime * electricityPrice;
    const laborCost = (prepTime + postTime + designTime) * hourlyRate;
    const subtotal = depreciationCost + electricityCost + totalFilamentCost + laborCost;
    const failureCost = subtotal * (failureRate / 100);
    const totalCost = subtotal + failureCost;

    document.getElementById('depreciation').textContent = depreciationCost.toFixed(2);
    document.getElementById('electricity').textContent = electricityCost.toFixed(2);
    document.getElementById('filament-cost').textContent = totalFilamentCost.toFixed(2);
    document.getElementById('labor').textContent = laborCost.toFixed(2);
    document.getElementById('failure').textContent = failureCost.toFixed(2);
    document.getElementById('total').textContent = totalCost.toFixed(2);
    document.getElementById('result').classList.remove('hidden');
  });

  // Funktion zum Speichern der Daten als JSON-Datei
  document.getElementById('save-data-btn').addEventListener('click', () => {
    const data = {
      printers: printers,
      filaments: filaments,
      models: models,
      hourlyRates: hourlyRates,
      electricityPrices: electricityPrices
    };
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `3D_Print_Master_Data_${new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '_')}_${new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }).replace(/:/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    burgerMenu.classList.remove('open');
  });

  // Funktion zum Laden der Daten aus einer JSON-Datei
  document.getElementById('load-data-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Bestätigung vor dem Laden der Daten anzeigen
    const confirmLoad = window.confirm('Achtung: Das Laden einer Datei wird alle aktuellen Daten überschreiben. Möchten Sie fortfahren?');
    if (!confirmLoad) {
      event.target.value = ''; // Datei-Input zurücksetzen
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const loadedData = JSON.parse(e.target.result);

        // Validierung der geladenen Daten
        if (!loadedData.printers || !Array.isArray(loadedData.printers) ||
            !loadedData.filaments || !Array.isArray(loadedData.filaments) ||
            !loadedData.models || !Array.isArray(loadedData.models) ||
            !loadedData.hourlyRates || !Array.isArray(loadedData.hourlyRates) ||
            !loadedData.electricityPrices || !Array.isArray(loadedData.electricityPrices)) {
          throw new Error('Ungültiges Dateiformat: Die Datei enthält nicht die erwarteten Daten.');
        }

        // Aktualisiere die globalen Variablen mit den geladenen Daten
        printers = loadedData.printers;
        filaments = loadedData.filaments;
        models = loadedData.models;
        hourlyRates = loadedData.hourlyRates;
        electricityPrices = loadedData.electricityPrices;

        // Speichere die geladenen Daten in localStorage
        localStorage.setItem('printers', JSON.stringify(printers));
        localStorage.setItem('filaments', JSON.stringify(filaments));
        localStorage.setItem('models', JSON.stringify(models));
        localStorage.setItem('hourlyRates', JSON.stringify(hourlyRates));
        localStorage.setItem('electricityPrices', JSON.stringify(electricityPrices));

        // Aktualisiere die UI-Listen
        updatePrinterList();
        updateFilamentList();
        updateModelList();
        updateHourlyRateList();
        updateElectricityPriceList();

        // Schließe das Burger-Menü
        burgerMenu.classList.remove('open');

        // Datei-Input-Feld zurücksetzen
        event.target.value = '';

        alert('Daten erfolgreich geladen!');
      } catch (error) {
        console.error('Fehler beim Laden der Datei:', error);
        alert('Fehler beim Laden der Datei: ' + error.message);
      }
    };
    reader.onerror = () => {
      alert('Fehler beim Lesen der Datei.');
    };
    reader.readAsText(file);
  });

  updatePrinterList();
  updateFilamentList();
  updateModelList();
  updateHourlyRateList();
  updateElectricityPriceList();
});