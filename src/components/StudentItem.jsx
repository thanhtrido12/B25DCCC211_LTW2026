import React from 'react';

const StudentItem = ({ student, onDelete }) => {
  const { id, name, score, class: className } = student;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{className}</td>
      <td>{score}</td>
      <td>
        <button 
          className="btn-delete" 
          onClick={() => onDelete(id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;