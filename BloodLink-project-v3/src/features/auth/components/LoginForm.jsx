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
import { FaPhone } from 'react-icons/fa'
import DonorGif from "../../../assets/images/world-blood-donor-day.gif"

function LoginForm() {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ phone: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    dispatch(clearAuthState())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearAuthState())
    dispatch(setLoading(true))

    const cleanedPhone = formData.phone.replace(/\s/g, '')

    if (!cleanedPhone) {
      dispatch(setError('Please enter your phone number'))
      dispatch(setLoading(false))
      return
    }

    const phoneRegex = /^01[0-2,5][0-9]{8}$/
    if (!phoneRegex.test(cleanedPhone)) {
      dispatch(setError('Please enter a valid Egyptian phone number (e.g., 01012345678)'))
      dispatch(setLoading(false))
      return
    }

    try {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || []

      if (storedUsers.length === 0) {
        dispatch(setError('No account found. Please sign up first.'))
        dispatch(setLoading(false))
        return
      }

      const matchedUser = storedUsers.find((u) => u.phone === cleanedPhone)

      if (!matchedUser) {
        dispatch(setError('Phone number not found. Please check your number or sign up.'))
        dispatch(setLoading(false))
        return
      }

      const updatedUser = {
        ...matchedUser,
        loginTime: new Date().toISOString()
      }

      dispatch(setUser(updatedUser))
      
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      navigate('/', { replace: true })
    } catch (err) {
      console.error('Login error:', err)
      dispatch(setError('Login failed. Please try again.'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center py-5"
      style={{ minHeight: '90vh', backgroundColor: '#f8f9fa' }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <Row className="g-0 flex-column flex-md-row">
              <Col
                xs={12}
                md={5}
                className="d-flex align-items-center justify-content-center text-dark"
                style={{ backgroundColor: 'white' }}
              >
                <div className="text-center px-3 py-4">
                  <img
                    src={DonorGif}
                    alt="Welcome"
                    className="mb-3"
                    style={{ width: '80px' }}
                  />
                  <h3 className="fw-bold mb-2">Welcome Back!</h3>
                  <p className="small text-muted">
                    Sign in to continue helping others
                  </p>
                </div>
              </Col>

              <Col
                xs={12}
                md={7}
                className="text-white"
                style={{ backgroundColor: '#c0392b' }}
              >
                <Card.Body className="p-4 p-md-5">
                  <div className="text-center mb-4">
                    <h4 className="fw-bold mb-2 text-white">Login</h4>
                    <p className="small text-light">
                      Use your registered phone number
                    </p>
                  </div>

                  {error && (
                    <Alert
                      variant="light"
                      dismissible
                      onClose={() => dispatch(clearAuthState())}
                      className="text-danger bg-white border-danger"
                    >
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold text-white">
                        Phone Number
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text style={{ backgroundColor: '#fff' }}>
                          <FaPhone color="#c0392b" />
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          name="phone"
                          placeholder="01X XXXX XXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          pattern="01[0-2,5][0-9]{8}"
                          inputMode="numeric"
                          autoComplete="tel"
                          className="border-0"
                          style={{ backgroundColor: '#f8f9fa' }}
                        />
                      </InputGroup>
                      <Form.Text className="text-light">
                        Example: 01012345678
                      </Form.Text>
                    </Form.Group>

                    <Button
                      type="submit"
                      className="w-100 py-2 fw-semibold border-0 mt-2"
                      style={{ backgroundColor: 'white', color: '#c0392b' }}
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </Form>

                  <div className="text-center mt-4">
                    <span className="text-light small">
                      Don't have an account?{' '}
                    </span>
                    <Link
                      to="/register"
                      className="fw-bold text-decoration-none"
                      style={{ color: 'white' }}
                    >
                      Sign up
                    </Link>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm
