<template>
  <div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      
    }
  },
  created() {
    axios.get('/user/userinfo')
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err); 
    })
  },
  methods: {
    
  },
}
</script>