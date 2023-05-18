<template>
    <q-page>
      <p style="margin: 10px;
    margin-left: 16px;
    font-size: 20px;
    font-weight: bold;
    color: #025dff;">Fine</p>
      <div class="q-ml-lg q-mr-lg">
        <q-input outlined class="q-mb-sm" v-model="fineAmount" label="Fine Amount" />
        <q-input outlined class="q-mb-sm" v-model="fineDuration" label="Fine Duration" />
        <q-btn label="Configure" style="width:100%" color="primary" />
      </div>
    </q-page>
  </template>
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'Fine',
    data(){
      return{
        fineAmount:'',
        fineDuration:''
      }
    }
  })
  </script>