import { useState, useEffect } from 'react';
import './StudentForm.css'


// Form to add or edit student details.
const emptyForm = { name: '', email: '', age: '' };

const StudentForm = ({ onSubmit, onCancel,editData}) => {
    const [form, setForm] = useState(emptyForm)
    const [errors, setErrors] = useState({})

    // It checks if we edited data or added data and according to set the value.
    useEffect(() => {
        if (editData) {
            setForm({ name: editData.name, email: editData.email, age: String(editData.age) });
        } else {
            setForm(emptyForm);
        }
        setErrors({});
    }, [editData]);

    // Validate the form details of Student
    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required.';
        if (!form.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!form.email.includes("@") || !form.email.includes(".")) {
            newErrors.email = 'Enter a valid email address.';
        }
        if (!form.age.trim()) {
            newErrors.age = 'Age is required.';
        } else if (
            isNaN(Number(form.age)) || 
            Number(form.age) <= 0 || 
            !Number.isInteger(Number(form.age))) 
            {
                newErrors.age = 'Age must be a positive whole number.';
            }
        return newErrors;
    };

    // if any changes in form then it will set the value.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    // On the submission of google form.
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        return;
        }
        onSubmit({ name: form.name.trim(), email: form.email.trim(), age: Number(form.age) });
    };
   return (
    <div className='form-backdrop'>
        <div className='form-modal'>
            <div className='form-header'>
                <h2>{editData ? 'Edit Student':'Add Student'}</h2>
                <button className='form-close-btn' onClick={onCancel} aria-label='Close'>Close</button>
            </div>
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="e.g. Dhyey Patel"
                        value={form.name}
                        onChange={handleChange}
                        className={errors.name ? 'input-error' : ''}
                        />
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="e.g. dhyey@gmail.com"
                        value={form.email}
                        onChange={handleChange}
                        className={errors.email ? 'input-error' : ''}
                        />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        id="age"
                        name="age"
                        type="number"
                        placeholder="e.g. 21"
                        value={form.age}
                        onChange={handleChange}
                        className={errors.age ? 'input-error' : ''}
                        min="1"
                        />
                    {errors.age && <span className="error-msg">{errors.age}</span>}
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="btn btn-primary">
                    {editData ? 'Save Changes' : 'Add Student'}
                    </button>
                </div>
            </form>
        </div>
    </div>
   );
}

export default StudentForm;

