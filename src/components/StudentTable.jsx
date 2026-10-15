import React from 'react';
import StudentItem from './StudentItem';

const StudentTable = ({ students, onDelete }) => {
  if (students.length === 0) {
    return <p className="empty-text">Không có sinh viên nào phù hợp.</p>;
  }

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Mã SV</th>
          <th>Họ tên</th>
          <th>Lớp</th>
          <th>Điểm số</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentItem 
            key={student.id} 
            student={student} 
            onDelete={onDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;