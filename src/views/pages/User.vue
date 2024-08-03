<template>
    <div>
      <ul>
        <li v-for="user in users" :key="user.id">{{ user.name }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import api from '@/services/api'
  
  const users = ref([])
  
  const fetchUsers = async () => {
    try {
      console.log('Fetching users...')
      const response = await api.get('/users')
      console.log('Response:', response)
      users.value = response.data
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  }
  
  onMounted(() => {
    console.log('Component mounted')
    fetchUsers()
  })
  </script>
  
  <style>
  /* Adicione seus estilos aqui */
  </style>
  