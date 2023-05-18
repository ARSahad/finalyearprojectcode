<template>
  <q-page>
  <p style="margin: 10px;
  margin-left: 16px;
  font-size: 20px;
  font-weight: bold;
  color: #025dff;">Book Return panel</p>
<table class="custom-table">
<tr>
  <th>id</th>
  <th>User Id</th>
  <th>Book Id</th>
  <th>Borrow Time</th>
  <th>Return Time</th>
  <th>Barcode</th>
</tr>
<tr v-for="(u,index) in user">
  <td>{{index+1}}</td>
  <td>{{u.user_id}}</td>
  <td>{{u.book_id}}</td>
  <td>{{u.borrow_time}}</td>
  <td>{{u.return_time}}</td>
  <td>{{u.book_barcode}}</td>
</tr>
</table>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Returned',
  data(){
    return{
      user:[],
      returnDate:'',
      name:'',
      author:'',
      price:'',
      description:'',
      quantity:'',
      departments:["CSE","EEE","ETE","English", "BBA", "LAW"],
      semesters:[1,2,3,4,5,6,7,8, 9,10,11,12],
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
    //console.log(this.uri);
   this.fetchUser();
  },
  methods:{
    deleteUser(id){
      fetch(this.uri+'borrow_book.php?userDelete='+id).then(()=>{
        alert('Book deleted');
        this.fetchUser();  
      });
    },
    fetchUser(){
      fetch(this.uri+'borrow_book.php?returned=1').then((response)=>response.json()).then((responseJson)=>{
      console.log(responseJson);
      this.user = responseJson;
    })
    },
    insertUser(){
      fetch(this.uri+"borrow_book.php",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({name: this.name,author:this.author,price:this.price,quantity:this.quantity,description:this.description})
})
.then((response)=>{ 
alert('Book added');
this.fetchUser();
}).catch((error)=>{
console.log(error);
})
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