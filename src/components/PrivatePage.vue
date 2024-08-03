<template>
    <div v-if="isAuthenticated">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { isLoggedIn } from '@/services/auth'
  
  const isAuthenticated = ref(false)
  const router = useRouter()
  
  onMounted(() => {
    if (isLoggedIn()) {
      isAuthenticated.value = true
    } else {
      router.push('/pages/login')
    }
  })
  </script>
  