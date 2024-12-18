import React, { useState } from 'react';
import CargoTable from './components/CargoTable';
import CargoForm from './components/CargoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [cargoList, setCargoList] = useState([
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
  ]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const addCargo = (newCargo) => {
    setCargoList([...cargoList, newCargo]);
  };

  const updateStatus = (id, newStatus) => {
    const updatedCargoList = cargoList.map((cargo) => {
      if (cargo.id === id) {
        if (newStatus === 'Доставлен') {
          const departureDate = new Date(cargo.departureDate);
          const currentDate = new Date();
          if (departureDate > currentDate) {
            setErrorMessage(
              `Ошибка: нельзя установить статус "Доставлен" для груза, дата отправления которого в будущем.`
            );
            return cargo;
          }
        }
        setErrorMessage('');
        return { ...cargo, status: newStatus };
      }
      return cargo;
    });
    setCargoList(updatedCargoList);
  };

  const filteredCargoList = filterStatus
    ? cargoList.filter((cargo) => cargo.status === filterStatus)
    : cargoList;

  return (
    <div className="container mt-5">
      <h2>Отслеживание грузов</h2>

      <div className="mb-3">
        <label htmlFor="statusFilter" className="form-label">
          Фильтр по статусу
        </label>
        <select
          id="statusFilter"
          className="form-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Все</option>
          <option value="Ожидает отправки">Ожидает отправки</option>
          <option value="В пути">В пути</option>
          <option value="Доставлен">Доставлен</option>
        </select>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <CargoForm addCargo={addCargo} />
      <CargoTable cargoList={filteredCargoList} updateStatus={updateStatus} />
    </div>
  );
}

export default App;
