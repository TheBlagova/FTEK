import React from 'react';

function CargoTable({ cargoList, updateStatus }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Ожидает отправки':
        return 'bg-warning text-dark'; // желтый фон для "Ожидает отправки"
      case 'В пути':
        return 'bg-primary text-white'; // синий фон для "В пути"
      case 'Доставлен':
        return 'bg-success text-white'; // зеленый фон для "Доставлен"
      default:
        return '';
    }
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Номер груза</th>
          <th>Название груза</th>
          <th>Статус</th>
          <th>Откуда</th>
          <th>Куда</th>
          <th>Дата отправления</th>
        </tr>
      </thead>
      <tbody>
        {cargoList.map((cargo) => (
          <tr key={cargo.id}>
            <td>{cargo.id}</td>
            <td>{cargo.name}</td>
            <td>
              <select
                className="form-select"
                value={cargo.status}
                onChange={(e) => updateStatus(cargo.id, e.target.value)}
              >
                <option
                  value="Ожидает отправки"
                  className={getStatusClass(cargo.status)}
                >
                  Ожидает отправки
                </option>
                <option value="В пути" className={getStatusClass(cargo.status)}>
                  В пути
                </option>
                <option
                  value="Доставлен"
                  className={getStatusClass(cargo.status)}
                >
                  Доставлен
                </option>
              </select>
            </td>
            <td>{cargo.origin}</td>
            <td>{cargo.destination}</td>
            <td>{cargo.departureDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CargoTable;
