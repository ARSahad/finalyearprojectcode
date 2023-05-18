<template>
    <q-page>
    <p style="margin: 10px;
    margin-left: 16px;
    font-size: 20px;
    font-weight: bold;
    color: #025dff;">User panel</p>
    <div class="q-pa-md q-gutter-sm">
    <q-btn @click="create = true" color="primary" label="Add user" />
    <q-btn @click="logout()" color="primary" label="Logout" />
  </div>
  <q-dialog v-model="create">
      <q-card>
        <q-card-section>
          <div class="text-h6">User Create Form</div>
          <hr>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input outlined class="q-mb-sm" v-model="first_name" label="First Name" />
          <q-input outlined class="q-mb-sm" v-model="last_name" label="Last Name" />
          <q-input outlined class="q-mb-sm" v-model="email" label="Email" />
          <q-select outlined class="q-mb-sm" v-model="department" :options="departments" label="Departments" />
          <q-select outlined class="q-mb-sm" v-model="semester" :options="semesters" label="Semester" />
          <q-input outlined  class="q-mb-sm" v-model="students_id" label="Student Id" />
          <q-btn v-if="getFinger" @click="captureFinger()" label="Capture fingerprint" style="width:100%" color="primary" />
          <span v-else>{{fingerprint}}</span>

        </q-card-section>

        <q-card-actions style="min-width: 50vw" align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn flat label="Save" @click="insertUser()" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  <table class="custom-table">
  <tr>
    <th>id</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Department</th>
    <th>Semester</th>
    <th>Student Id</th>
    <th>Action</th>
  </tr>
  <tr v-for="(u,index) in user">
    <td>{{index+1}}</td>
    <td>{{u.first_name}}</td>
    <td>{{u.last_name}}</td>
    <td>{{u.email}}</td>
    <td>{{u.department}}</td>
    <td>{{u.semester}}</td>
    <td>{{u.student_id}}</td>
    <td>
      <q-btn color="red" @click="deleteUser(u.id)" size="sm" class="q-ml-sm q-mr-sm" label="Delete User" />
    </td>
  </tr>
</table>

    </q-page>
  </template>
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'User',
    data(){
      return{
        user:[],
        getFinger:true,
        departments:["CSE","EEE","ETE","English", "BBA", "LAW"],
        semesters:[1,2,3,4,5,6,7,8,9,10,11,12],
        create:false,
        first_name:'',
        last_name:'',
        email:'',
        fingerprint:'srogvknfslkff24123vs31313sc1',
        students_id:'',
        department:'',
        semester:'',
      }
    },
    mounted(){
     this.fetchUser();
    },
    methods:{
      logout(){
      this.type = '';
      this.loggedIn = false;
      this.$router.push('/');
    },
      deleteUser(id){
        fetch(this.uri+'user.php?userDelete='+id).then(()=>{
          alert('User deleted');
          this.fetchUser();  
        });
      },
      fetchUser(){
        fetch(this.uri+'user.php?value=1').then((response)=>response.json()).then((responseJson)=>{
        console.log(responseJson);
        this.user = responseJson;
      })
      },
      captureFinger(){
        fetch(this.uri+'sensor.php?current=1').then((response)=>response.json()).then((responseJson)=>{
        console.log(responseJson);
        this.fingerprint = responseJson[0].fingerprint;
        this.getFinger = false;
        // this.user = responseJson;
      });
      },
      insertUser(){
        fetch(this.uri+'user.php?emailPost='+this.email+'&first_name='+this.first_name+'&last_name='+this.last_name+'&fingerprint='+this.fingerprint+'&student_id='+this.students_id+'&semester='+this.semester+'&department='+this.department).then(()=>{
          alert("User added");
          this.fetchUser();
        });
        
      }
    },
    computed: {
    uri: {
      get () {
        return this.$store.state.example.apiUri
      },
      set (val) {
        // this.$store.commit('showcase/updateDrawerState', val)
      }
    },
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
       return this.$store.state.example.loggedIn;
      },
      set(value){
        this.$store.commit('example/loggedInUpdate', value); 
      },
    }
  }
  })
  </script>