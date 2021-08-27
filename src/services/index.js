import axios from 'axios'

export function getAllStudents(){
    return axios.get('/api/list')
}