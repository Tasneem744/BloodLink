import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { setUser } from '../../user/userSlice'

function EditProfile({ closeModal }) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  const [formData, setFormData] = useState(user)

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const egyptGovernorates = [
    'Alexandria', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Cairo', 'Dakahlia',
    'Damietta', 'Faiyum', 'Gharbia', 'Giza', 'Ismailia', 'Kafr El Sheikh', 'Luxor',
    'Matruh', 'Minya', 'Monufia', 'New Valley', 'North Sinai', 'Port Said', 'Qalyubia',
    'Qena', 'Red Sea', 'Sharqia', 'Sohag', 'South Sinai', 'Suez'
  ].sort()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.map(u =>
      u.phone === user.phone ? { ...u, ...formData } : u
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    dispatch(setUser({ ...user, ...formData }))

    toast.success('Profile updated successfully!', {
      position: 'top-center',
      autoClose: 2000,
      theme: 'colored'
    })

    closeModal()
  }

  return (
    <Form onSubmit={handleSave}>
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Blood Type</Form.Label>
        <Form.Select
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
        >
          <option value="">Select Blood Type</option>
          {bloodTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Governorate</Form.Label>
        <Form.Select
          name="governorate"
          value={formData.governorate}
          onChange={handleChange}
        >
          <option value="">Select Governorate</option>
          {egyptGovernorates.map((gov) => (
            <option key={gov} value={gov}>{gov}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button
        variant="danger"
        type="submit"
        className="w-100"
        style={{ backgroundColor: '#c0392b', border: 'none' }}
      >
        Save Changes
      </Button>
    </Form>
  )
}

export default EditProfile
