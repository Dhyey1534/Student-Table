import ExcelJS from 'exceljs';
import './StudentTable.css'

const StudentTable = ({ students, onEdit, onDelete }) => {
    // this function is to export Excel file of filtered students.
    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Students");

        // Add header row
        worksheet.addRow(["ID", "Name", "Email", "Age"]);

        // Add student data
        students.forEach((s) => {
            worksheet.addRow([s.id, s.name, s.email, s.age]);
        });

        // Download file
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer]);
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "students.xlsx";
        a.click();

        URL.revokeObjectURL(url);
    };


    return (
        <div className='table-wrapper'>
            <div className='table-toolbar'>
                <span className='table-count'>
                    {students.length} {students.length === 1 ? 'student' : 'students'} found
                </span>
                <button className="btn btn-export" onClick={handleExport} disabled={students.length === 0}> Download Excel </button>
            </div>
            {students.length === 0 ? (
                <div className="empty-state">
                <p>No students found. Try a different search or add a new student.</p>
                </div>
            ) : (
                <div className='table-scroll'>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id}>
                                <td className="row-index" data-label="#">{index + 1}</td>
                                <td data-label="Name">
                                    <div className="student-name-cell">
                                        <span>{student.name}</span>
                                    </div>
                                </td>
                                <td className="email-cell" data-label="Email">{student.email}</td>
                                <td data-label="Age"><span className="age-badge">{student.age}</span></td>
                                <td data-label="Actions">
                                    <div className="action-buttons">
                                    <button className="btn btn-edit" onClick={() => onEdit(student)}> Edit</button>
                                    <button className="btn btn-delete" onClick={() => onDelete(student)}>Delete</button>
                                    </div>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}

export default StudentTable;