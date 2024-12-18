import React, { useState } from 'react';

function CargoForm({ addCargo }) {
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('Москва');
  const [destination, setDestination] = useState('Москва');
  const [departureDate, setDepartureDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !departureDate) {
      setError('Пожалуйста, заполните все поля!');
      return;
    }

    const newCargo = {
      id: `CARGO${String(Date.now()).slice(-4)}`, // Генерация уникального id
      name,
      status: 'Ожидает отправки',
      origin,
      destination,
      departureDate,
    };

    addCargo(newCargo);
    setName('');
    setOrigin('Москва');
    setDestination('Москва');
    setDepartureDate('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-3 mb-2">
          <label htmlFor="cargoName" className="form-label">
            Название груза
          </label>
          <input
            type="text"
            className="form-control"
            id="cargoName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="origin" className="form-label">
            Пункт отправления
          </label>
          <select
            className="form-select"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          >
            <option value="Москва">Москва</option>
            <option value="Санкт-Петербург">Санкт-Петербург</option>
            <option value="Казань">Казань</option>
            <option value="Екатеринбург">Екатеринбург</option>
          </select>
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="destination" className="form-label">
            Пункт назначения
          </label>
          <select
            className="form-select"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          >
            <option value="Москва">Москва</option>
            <option value="Санкт-Петербург">Санкт-Петербург</option>
            <option value="Казань">Казань</option>
            <option value="Екатеринбург">Екатеринбург</option>
          </select>
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="departureDate" className="form-label">
            Дата отправления
          </label>
          <input
            type="date"
            className="form-control"
            id="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
        </div>
        <div className="col-md-1 d-flex align-items-end">
          <button type="submit" className="btn btn-primary">
            Добавить
          </button>
        </div>
      </div>
    </form>
  );
}

export default CargoForm;
