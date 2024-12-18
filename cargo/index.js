const cargoList = [
  {
    id: 'CARGO001',
    name: 'Строительные материалы',
    status: 'В пути',
    origin: 'Москва',
    destination: 'Казань',
    departureDate: '2024-11-24',
  },
  {
    id: 'CARGO002',
    name: 'Хрупкий груз',
    status: 'Ожидает отправки',
    origin: 'Санкт-Петербург',
    destination: 'Екатеринбург',
    departureDate: '2024-11-26',
  },
];

function renderCargoTable(filteredCargoList) {
  const tableBody = document.getElementById('cargoTable');
  tableBody.innerHTML = '';
  filteredCargoList.forEach((cargo) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cargo.id}</td>
      <td>${cargo.name}</td>
      <td class="status-${cargo.status.toLowerCase().replace(' ', '-')}">
          <select class="form-select" onchange="updateStatus('${
            cargo.id
          }', this.value)">
              <option value="Ожидает отправки" ${
                cargo.status === 'Ожидает отправки' ? 'selected' : ''
              }>Ожидает отправки</option>
              <option value="В пути" ${
                cargo.status === 'В пути' ? 'selected' : ''
              }>В пути</option>
              <option value="Доставлен" ${
                cargo.status === 'Доставлен' ? 'selected' : ''
              }>Доставлен</option>
          </select>
      </td>
      <td>${cargo.origin}</td>
      <td>${cargo.destination}</td>
      <td>${cargo.departureDate}</td>
    `;
    tableBody.appendChild(row);
  });
}

document
  .getElementById('statusFilter')
  .addEventListener('change', function (event) {
    const selectedStatus = event.target.value;

    const filteredCargoList = selectedStatus
      ? cargoList.filter((cargo) => cargo.status === selectedStatus)
      : cargoList;

    renderCargoTable(filteredCargoList);
  });

function updateStatus(id, status) {
  const cargo = cargoList.find((c) => c.id === id);

  if (status === 'Доставлен') {
    const currentDate = new Date();
    const departureDate = new Date(cargo.departureDate);

    if (departureDate > currentDate) {
      alert(
        'Ошибка: нельзя установить статус "Доставлен" для груза, дата отправления которого в будущем.'
      );
      return;
    }
  }

  cargo.status = status;
  renderCargoTable(cargoList);
}

document
  .getElementById('cargoForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('cargoName').value;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departureDate').value;

    if (!name || !origin || !destination || !departureDate) {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    const newCargo = {
      id: `CARGO${String(cargoList.length + 1).padStart(3, '0')}`,
      name,
      status: 'Ожидает отправки',
      origin,
      destination,
      departureDate,
    };

    cargoList.push(newCargo);
    renderCargoTable(cargoList);
    document.getElementById('cargoForm').reset();
  });

renderCargoTable(cargoList);
