// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    Accept: 'application/json'
  }
})

export async function fetchIdeas({ page = 1, size = 10, sort = '-published_at' }) {
  try {
    const response = await api.get('/ideas', {
      params: {
        'page[number]': page,
        'page[size]': size,
        'append[]': ['small_image', 'medium_image'],
        sort: sort ?? '-published_at' 
      }
    })

    return response.data
  } catch (error) {
    console.error('Gagal fetch data:', error)
    return {
      data: [],
      meta: { pagination: { total: 0 } }
    }
  }
}

