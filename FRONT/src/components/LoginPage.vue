<template>
  <div class="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-100 px-4 py-8 sm:py-12">
    <div class="w-full max-w-md">
      <form
        class="card-soft space-y-5 p-6 sm:p-10"
        @submit.prevent="handleSubmit"
      >
        <h1 class="text-2xl font-bold text-slate-900 sm:text-3xl">Connexion</h1>
        <p class="text-sm text-slate-500">Bon retour parmi nous.</p>

        <div>
          <label class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="input-field"
          />
        </div>

        <div>
          <label class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Mot de passe
          </label>
          <input
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            class="input-field"
          />
          <p v-if="passwordError" class="mt-1 text-xs text-red-600">{{ passwordError }}</p>
        </div>

        <p v-if="serverError" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {{ serverError }}
        </p>

        <button
          type="submit"
          class="btn-primary w-full text-base"
          :disabled="loading"
        >
          {{ loading ? 'Connexion…' : 'Se connecter' }}
        </button>

        <p class="text-center text-sm text-slate-600">
          Pas de compte ?
          <router-link to="/register" class="font-semibold text-brand-500 hover:underline">
            S'inscrire
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      passwordError: '',
      serverError: '',
      loading: false,
    }
  },
  methods: {
    async handleSubmit() {
      this.serverError = ''
      this.passwordError =
        this.password.length > 5
          ? ''
          : 'Le mot de passe doit faire au moins 6 caractères'
      if (this.passwordError) return

      this.loading = true
      try {
        const { data } = await axios.post(`${API_BASE_URL}/login`, {
          email: this.email,
          password: this.password,
        })
        if (data?.token) localStorage.setItem('auth_token', data.token)
        this.$router.push('/home')
      } catch (error) {
        this.serverError =
          error.response?.data?.message || 'Email ou mot de passe invalide.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
