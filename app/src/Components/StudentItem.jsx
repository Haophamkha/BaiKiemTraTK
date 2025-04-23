import React from 'react';

const StudentItem = ({
  student,
  isEditing,
  editName,
  editClass,
  editAge,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-300">
      {isEditing ? (
        <>
          <td className="py-4 px-6">
            <input
              type="text"
              value={editName}
              onChange={(e) => onEditChange('name', e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </td>
          <td className="py-4 px-6">
            <input
              type="text"
              value={editClass}
              onChange={(e) => onEditChange('class', e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </td>
          <td className="py-4 px-6">
            <input
              type="number"
              value={editAge}
              onChange={(e) => onEditChange('age', e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </td>
          <td className="py-4 px-6 flex gap-2">
            <button
              onClick={onSaveEdit}
              className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-md"
            >
              Lưu
            </button>
            <button
              onClick={onCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-md"
            >
              Hủy
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="py-4 px-6 text-gray-700 font-medium">{student.name}</td>
          <td className="py-4 px-6 text-gray-700">{student.class}</td>
          <td className="py-4 px-6 text-gray-700">{student.age}</td>
          <td className="py-4 px-6 flex gap-2">
            <button
              onClick={() => onEdit(student)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-md"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-md"
            >
              Xoá
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default StudentItem;
