<template>
  <q-page>
  <p style="margin: 10px;
  margin-left: 16px;
  font-size: 20px;
  font-weight: bold;
  color: #025dff;">Book panel</p>
  <div class="q-pa-md q-gutter-sm">
  <q-btn @click="create = true" color="primary" label="Add book" />
</div>
<q-dialog v-model="create">
    <q-card>
      <q-card-section>
        <div class="text-h6">Book Create Form</div>
        <hr>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input outlined class="q-mb-sm" v-model="name" label="Name" />
        <q-input outlined class="q-mb-sm" v-model="author" label="Author" />
        <q-input outlined class="q-mb-sm" v-model="price" label="Price" />
        <q-input outlined  class="q-mb-sm" v-model="quantity" label="Quantity" />
        <q-input outlined  class="q-mb-sm" v-model="description" label="Description" />
        <q-btn v-if="rfidGet" @click="fetchRfid()" label="Capture fingerprint" style="width:100%" color="primary" />
        <span v-else>{{rfid}}</span>
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
  <th>Name</th>
  <th>Author</th>
  <th>Price</th>
  <th>Quantity</th>
  <th>Description</th>
  
  <th>Action</th>
</tr>
<tr v-for="(u,index) in user">
  <td>{{index+1}}</td>
  <td>{{u.name}}</td>
  <td>{{u.author}}</td>
  <td>{{u.price}}</td>
  <td>{{u.quantity}}</td>
  <td>{{u.description}}</td>
  <td>
    <q-btn color="red" @click="deleteUser(u.id)" size="sm" class="q-ml-sm q-mr-sm" label="Delete Book" />
  </td>
</tr>
</table>

  </q-page>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Book',
  data(){
    return{
      user:[],
      name:'',
      author:'',
      price:'',
      description:'',
      quantity:'',
      departments:["cse","eee","civil","mechanical"],
      semesters:[1,2,3,4,5,6,7,8],
      create:false,
      first_name:'',
      last_name:'',
      email:'',
      fingerprint:'srogvknfslkff24123vs31313sc1',
      students_id:'',
      department:'',
      semester:'',
      rfid:'',
      rfidGet:true
    }
  },
  mounted(){
    //console.log(this.uri);
   this.fetchUser();
  },
  methods:{
    deleteUser(id){
      fetch(this.uri+'books.php?userDelete='+id).then(()=>{
        alert('Book deleted');
        this.fetchUser();  
      });
    },
    fetchUser(){
      fetch(this.uri+'books.php?value=1').then((response)=>response.json()).then((responseJson)=>{
      console.log(responseJson);
      this.user = responseJson;
    })
    },
    fetchRfid(){
      fetch(this.uri+'sensor.php?current=1').then((response)=>response.json()).then((responseJson)=>{
        console.log(responseJson);
        this.rfid = responseJson[0].students_id;
        this.rfidGet = false;
       
      });
    },
    insertUser(){
    fetch(this.uri+'books.php?name='+this.name+'&description='+this.description+'&author='+this.author+'&price='+this.price+'&quantity='+this.quantity+'&rfid='+this.rfid).then(()=>{
      alert("Book fetched");
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
  }
}
})
</script>