<template>
  <q-page class="text-center q-pt-xl">
    <h3>Library Management</h3>
    <div class="display-block">
       <q-btn to="/user/login" label="User Panel" class="q-mr-lg" glossy icon="person" size="md" color="primary" rounded />
       <q-btn to="/library/login" label="Librarian Panel" glossy icon="support_agent" size="md" color="warning" rounded />
    </div>
   
  </q-page>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  setup(){
    return{
      //
    }
  }
})
</script>
