import { useState, useEffect, useMemo } from 'react';
import studentsData from './data/students';
import Loader from './components/Loader';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import ConfirmDialog from './components/ConfirmDialog';
import './App.css';

let nextId = studentsData.length + 1;

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(studentsData);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredStudents = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter(
      (s) => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
    );
  }, [students, search]);

    const handleAddStudent = (data) => {
    setStudents((prev) => [...prev, { id: nextId++, ...data }]);
    setShowForm(false);
    showToast('Student added successfully!');
  };

  const handleEditStudent = (data) => {
    setStudents((prev) => prev.map((s) => (s.id === editStudent.id ? { ...s, ...data } : s)));
    setEditStudent(null);
    setShowForm(false);
    showToast('Student updated successfully!');
  };

const handleDeleteConfirm = () => {
    setStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    showToast(`${deleteTarget.name} has been removed.`, 'danger');
    setDeleteTarget(null);
  };

  const openEdit = (student) => {
    setEditStudent(student);
    setShowForm(true);
  };

  const openAdd = () => {
    setEditStudent(null);
    setShowForm(true);
  };

  const handleFormSubmit = (data) => {
    if (editStudent) handleEditStudent(data);
    else handleAddStudent(data);
  };


  return (
    <>
      {loading && <Loader />}

      {showForm && (
        <StudentForm
          editData={editStudent}
          onSubmit={handleFormSubmit}
          onCancel={() => { setShowForm(false); setEditStudent(null); }}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}


      <div className="app-container">
        <header className="app-header">
          <div className="header-brand">
            <div>
              <h1>Students Table Manager</h1>
              <p>Manage, search, and export your student records</p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-chip">
              <span className="stat-value">{students.length}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
        </header>

        <div className="app-controls">
          <div className="search-wrapper">
            <input
              type="text"
              id="search-input"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')} aria-label="Clear search">✕</button>
            )}
          </div>
          <button id="add-student-btn" className="btn btn-primary" onClick={openAdd}>
            Add Student
          </button>
        </div>

        <StudentTable
          students={filteredStudents}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
        />
      </div>
    </>
  )
}

export default App
