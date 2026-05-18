import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setUser } from '../../user/userSlice'
import { setLoading, setError, clearAuthState } from '../authSlice'
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  InputGroup
} from 'react-bootstrap'
import { FaUser, FaBirthdayCake, FaHeartbeat, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import bloodDonation from "../../../assets/images/blood-donation.gif"

function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, error } = useAppSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    bloodType: '',
    governorate: ''
  })

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
    dispatch(clearAuthState())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearAuthState())
    dispatch(setLoading(true))

    if (!formData.name || !formData.phone || !formData.age || !formData.bloodType || !formData.governorate) {
      dispatch(setError('Please fill in all fields'))
      dispatch(setLoading(false))
      return
    }

    const age = parseInt(formData.age)
    if (isNaN(age) || age < 1 || age > 120) {
      dispatch(setError('Please enter a valid age (1-120)'))
      dispatch(setLoading(false))
      return
    }

    const cleanedPhone = formData.phone.replace(/\s/g, '')
    const phoneRegex = /^(01)[0-2,5]{1}[0-9]{8}$/
    if (!phoneRegex.test(cleanedPhone)) {
      dispatch(setError('Please enter a valid Egyptian phone number (e.g., 01012345678)'))
      dispatch(setLoading(false))
      return
    }

    try {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || []
      const phoneExists = existingUsers.some(
        (user) => user.phone === cleanedPhone
      )
      
      if (phoneExists) {
        dispatch(setError('This phone number is already registered.'))
        toast.error('This phone number is already registered.', {
          position: 'top-center',
          autoClose: 2000,
          theme: 'colored',
        })
        dispatch(setLoading(false))
        return
      }

      const userData = {
        id: Date.now(),
        name: formData.name,
        phone: cleanedPhone,
        age: parseInt(formData.age),
        bloodType: formData.bloodType,
        governorate: formData.governorate,
        registrationTime: new Date().toISOString(),
        ratings: []
      }

      existingUsers.push(userData)
      localStorage.setItem('users', JSON.stringify(existingUsers))

      dispatch(setUser(userData))

      toast.success('Registration successful!', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored',
      })

      setTimeout(() => {
        navigate('/login')
      }, 2000)

    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Registration failed. Please try again.'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <img
                  src={bloodDonation}
                  alt="Blood Donation"
                  style={{ width: '80px', height: '80px', marginBottom: '15px' }}
                />
                <h2 className="fw-bold mb-2" style={{ color: '#c0392b' }}>
                  Create Account
                </h2>
                <p className="text-muted">Sign up to get started</p>
              </div>

              {error && (
                <Alert variant="danger" dismissible onClose={() => dispatch(clearAuthState())}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaPhone /></InputGroup.Text>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="01X XXXX XXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      pattern="01[0-2,5]{1}[0-9]{8}"
                    />
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Egyptian phone number format (e.g., 01012345678)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaBirthdayCake /></InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="age"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={handleChange}
                      min="1"
                      max="120"
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Blood Type</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaHeartbeat /></InputGroup.Text>
                    <Form.Select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select blood type</option>
                      {bloodTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Governorate</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaMapMarkerAlt /></InputGroup.Text>
                    <Form.Select
                      name="governorate"
                      value={formData.governorate}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select your governorate</option>
                      {egyptGovernorates.map((gov) => (
                        <option key={gov} value={gov}>{gov}</option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  size="lg"
                  disabled={loading}
                  style={{
                    backgroundColor: '#c0392b',
                    border: 'none',
                  }}
                >
                  {loading ? 'Creating account...' : 'Sign Up'}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <span className="text-muted">Already have an account? </span>
                <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#c0392b' }}>
                  Sign in
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Register