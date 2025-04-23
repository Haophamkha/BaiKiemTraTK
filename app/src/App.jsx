import { useState } from 'react';
import './App.css';

function App() {
  // Danh sách sinh viên mẫu
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn A', class: 'CNTT1', age: 20 },
    { id: 2, name: 'Trần Thị B', class: 'CNTT2', age: 21 },
    { id: 3, name: 'Lê Văn C', class: 'CNTT1', age: 19 },
  ]);

  // Hàm xử lý xoá sinh viên
  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-10">
        Student Management App
      </h1>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wide">Tên</th>
              <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wide">Lớp</th>
              <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wide">Tuổi</th>
              <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wide">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-300"
              >
                <td className="py-4 px-6 text-gray-700 font-medium">{student.name}</td>
                <td className="py-4 px-6 text-gray-700">{student.class}</td>
                <td className="py-4 px-6 text-gray-700">{student.age}</td>
                <td className="py-4 px-6">
                  <button
                    className="bg-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-md"
                    onClick={() => handleDelete(student.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;