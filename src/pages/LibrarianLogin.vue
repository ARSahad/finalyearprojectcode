<template>
    <q-page>
      <p style="margin: 10px;
    margin-left: 16px;
    font-size: 20px;
    font-weight: bold;
    color: #025dff;">Librarian Login</p>
      <div class="q-ml-lg q-mr-lg">
        <q-input outlined class="q-mb-sm" v-model="username" label="Enter User Name" />
        <q-input outlined class="q-mb-sm" type="password" v-model="password" label="Enter Password" />
        <q-btn @click="login" label="Login" style="width:100%" color="primary" />
      </div>
    </q-page>
  </template>
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'Fine',
    data(){
      return{
        username:'',
        password:''
      }
    },
    computed:{
    type:{
      get(){
        return this.$store.state.example.type;
      },
      set(value){
        this.$store.commit('example/typeUpdate', value); 
      },
    },
    loggedIn:{
      get(){
       return  this.$store.state.example.loggedIn;
      },
      set(value){
        this.$store.commit('example/loggedInUpdate', value); 
      },
    }
  },
  methods:{
        login(){
            if(this.username === 'admin' && this.password === '12345'){
                this.type = 'admin';
                this.loggedIn = true;
                this.$router.push('/user');
            }else{
                alert('Wrong username and password');
            }
        }
    }
  })
  </script>