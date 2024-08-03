<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="handleLogin">
                  <h1>Login</h1>
                  <p class="text-body-secondary">Acesso sua conta</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="email"
                      placeholder="Email"
                      autocomplete="username"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="password"
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      required
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton :disabled="isLoading" @click="handleLogin" color="primary" class="px-4">
                        <span v-if="!isLoading">Login</span>
                        <span v-else>
                          <CSpinner size="sm" class="ms-2" />
                        </span>
                      </CButton>
                    </CCol>
                  </CRow>
                  <p v-if="error" class="text-danger">{{ error }}</p>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/auth'

const email = ref('')
const password = ref('')
const error = ref(null)
const isLoading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  console.log('handleLogin called')
  isLoading.value = true
  error.value = null

  try {
    console.log('Attempting login with:', { email: email.value, password: password.value })
    const response = await login(email.value, password.value)
    console.log('API response:', response)
    if (response && response.token) {
      localStorage.setItem('token', response.token)
      router.push('/dashboard')
    } else {
      error.value = 'Login falhou. Token não encontrado.'
    }
  } catch (err) {
    console.error('Login error:', err)
    error.value = 'Erro ao fazer login. Verifique suas credenciais.'
  } finally {
    isLoading.value = false
  }
}
</script>
