import { useState, useEffect } from 'react';
import StudentItem from './Components/StudentItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents
      ? JSON.parse(savedStudents)
      : [
          { id: 1, name: 'Nguyễn Văn A', class: 'CNTT1', age: 20 },
          { id: 2, name: 'Trần Thị B', class: 'CNTT2', age: 21 },
          { id: 3, name: 'Lê Văn C', class: 'CNTT1', age: 19 },
          { id: 4, name: 'Phạm Thị D', class: 'CNTT3', age: 22 },
          { id: 5, name: 'Đỗ Văn E', class: 'CNTT2', age: 20 },
          { id: 6, name: 'Vũ Thị F', class: 'CNTT3', age: 21 },
          { id: 7, name: 'Bùi Văn G', class: 'CNTT1', age: 23 },
        ];
  });

  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [age, setAge] = useState('');

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editClass, setEditClass] = useState('');
  const [editAge, setEditAge] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
    toast.error('🗑️ Xóa sinh viên thành công!');
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!name || !className || !age) {
      toast.warn('⚠️ Vui lòng nhập đầy đủ thông tin!');
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
    toast.success('🎉 Thêm sinh viên thành công!');
  };

  const handleEdit = (student) => {
    setEditId(student.id);
    setEditName(student.name);
    setEditClass(student.class);
    setEditAge(student.age);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editName || !editClass || !editAge) {
      toast.warn('⚠️ Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    setStudents(
      students.map((student) =>
        student.id === editId
          ? { ...student, name: editName, class: editClass, age: parseInt(editAge) }
          : student
      )
    );
    setEditId(null);
    setEditName('');
    setEditClass('');
    setEditAge('');
    toast.info('✅ Cập nhật sinh viên thành công!');
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditName('');
    setEditClass('');
    setEditAge('');
  };

  const classList = [...new Set(students.map((student) => student.class))];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedClass === '' || student.class === selectedClass)
  );

  return (
    <div className="container max-w-6xl mx-auto px-4 py-10 bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} />

      <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
        🎓 Student Management App
      </h1>

      {/* Form thêm sinh viên */}
      <div className="mb-10 bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Thêm sinh viên mới</h2>
        <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Họ tên</label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Lớp</label>
            <input
              type="text"
              placeholder="CNTT1"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Tuổi</label>
            <input
              type="number"
              placeholder="20"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 shadow-lg transition-all"
            >
              ➕ Thêm sinh viên
            </button>
          </div>
        </form>
      </div>

      {/* Tìm kiếm và lọc lớp */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Tìm kiếm theo tên</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nhập tên sinh viên..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Lọc theo lớp</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
          >
            <option value="">-- Tất cả các lớp --</option>
            {classList.map((cls, idx) => (
              <option key={idx} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bảng danh sách sinh viên */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wide">Tên</th>
              <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wide">Lớp</th>
              <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wide">Tuổi</th>
              <th className="py-4 px-6 font-semibold text-sm uppercase tracking-wide">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <StudentItem
                key={student.id}
                student={student}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
                isEditing={editId === student.id}
                editName={editName}
                editClass={editClass}
                editAge={editAge}
                setEditName={setEditName}
                setEditClass={setEditClass}
                setEditAge={setEditAge}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
