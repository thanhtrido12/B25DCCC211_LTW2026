import React, { useState } from 'react';
import StudentTable from './components/StudentTable';
import './App.css';

const initialStudents = [
  { id: 'B23DCCN001', name: 'Nguyễn Văn An', score: 8.5, class: 'D23CNPM01' },
  { id: 'B23DCCN002', name: 'Trần Thị Bích', score: 4.5, class: 'D23CNPM02' },
  { id: 'B23DCCN003', name: 'Lê Hoàng Nam', score: 9.0, class: 'D23CNPM01' },
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [formData, setFormData] = useState({ 
    id: '', 
    name: '', 
    score: '', 
    class: '' 
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const { id, name, score, class: className } = formData;

    
    if (!id.trim() || !name.trim() || !className.trim() || score === '') {
      setErrorMessage('Vui lòng điền đầy đủ Mã SV, Họ tên, Lớp và Điểm!');
      return;
    }

   
    const isExisted = students.some(
      (student) => student.id.toLowerCase() === id.trim().toLowerCase()
    );
    if (isExisted) {
      setErrorMessage(`Mã sinh viên "${id.trim()}" đã tồn tại!`);
      return;
    }

    const numScore = parseFloat(score);

    
    if (isNaN(numScore) || numScore < 0 || numScore > 10) {
      setErrorMessage('Điểm số không hợp lệ! Vui lòng nhập từ 0 đến 10.');
      return;
    }

    const newStudent = {
      id: id.trim().toUpperCase(),
      name: name.trim(),
      score: numScore,
      class: className.trim(),
    };

    setStudents((prev) => [...prev, newStudent]);
    setFormData({ id: '', name: '', score: '', class: '' });
    setErrorMessage('');
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter((student) => {
    if (filterType === 'GIOI') return student.score >= 8;
    if (filterType === 'TRUOT') return student.score < 5;
    return true;
  });

  const totalCount = students.length;
  const averageScore = totalCount > 0
    ? (students.reduce((acc, cur) => acc + cur.score, 0) / totalCount).toFixed(2)
    : '0.00';

  return (
    <div className="container">
      <h2>Ứng dụng Quản lý Điểm Sinh viên</h2>

      <div className="card">
        <h3>Thêm sinh viên mới</h3>
        <form onSubmit={handleAddStudent} className="form-group">
          <input
            type="text"
            name="id"
            placeholder="Mã SV (VD: B23DCCN004)"
            value={formData.id}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="class"
            placeholder="Lớp (VD: D23CNPM01)"
            value={formData.class}
            onChange={handleInputChange}
          />
          <input
            type="number"
            step="0.1"
            name="score"
            placeholder="Điểm (0 - 10)"
            value={formData.score}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn-add">Thêm</button>
        </form>
        {errorMessage && <p className="error-text">{errorMessage}</p>}
      </div>

      <div className="summary-filter-card">
        <div className="summary-info">
          <p>{`Tổng số lượng sinh viên: ${totalCount}`}</p>
          <p>{`Điểm trung bình toàn lớp: ${averageScore}`}</p>
        </div>

        <div className="filter-buttons">
          <button 
            className={`btn-filter ${filterType === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilterType('ALL')}
          >
            Tất cả
          </button>
          <button 
            className={`btn-filter ${filterType === 'GIOI' ? 'active' : ''}`}
            onClick={() => setFilterType('GIOI')}
          >
            Giỏi (Điểm &gt;= 8)
          </button>
          <button 
            className={`btn-filter ${filterType === 'TRUOT' ? 'active' : ''}`}
            onClick={() => setFilterType('TRUOT')}
          >
            Trượt môn (Điểm &lt; 5)
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Danh sách sinh viên</h3>
        <StudentTable 
          students={filteredStudents} 
          onDelete={handleDeleteStudent} 
        />
      </div>
    </div>
  );
};

export default App;