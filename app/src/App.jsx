import { useState } from 'react';
import './App.css';

function App() {
  // Danh sách sinh viên
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn A', class: 'CNTT1', age: 20 },
    { id: 2, name: 'Trần Thị B', class: 'CNTT2', age: 21 },
    { id: 3, name: 'Lê Văn C', class: 'CNTT1', age: 19 },
  ]);

  // State cho form input
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [age, setAge] = useState('');

  // Hàm xử lý xoá sinh viên
  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  // Hàm xử lý thêm sinh viên
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!name || !className || !age) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    const newStudent = {
      id: students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1,
      name,
      class: className,
      age: parseInt(age),
    };
    setStudents([...students, newStudent]);
    setName('');
    setClassName('');
    setAge('');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-10">
        Student Management App
      </h1>

      {/* Form thêm sinh viên */}
      <div className="max-w-4xl mx-auto mb-8 bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Thêm sinh viên mới</h2>
        <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Họ tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Lớp"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Tuổi"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md"
          >
            Thêm sinh viên
          </button>
        </form>
      </div>

      {/* Bảng danh sách sinh viên */}
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