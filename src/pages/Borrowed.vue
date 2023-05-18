<template>
  <q-page>
  <p style="margin: 10px;
  margin-left: 16px;
  font-size: 20px;
  font-weight: bold;
  color: #025dff;">Book Borrow panel</p>
  <div class="q-pa-md q-gutter-sm">
  <q-btn @click="create = true" color="primary" label="Borrow Book" />
  <q-btn @click="logout()" color="primary" label="Logout" />
</div>
<q-dialog v-model="create">
    <q-card>
      <q-card-section>
        <div class="text-h6">Book Borrow</div>
        <hr>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-btn v-if="getFinger" @click="captureFinger()" class="q-mb-sm" label="Capture fingerprint" style="width:100%" color="primary" />
        <span v-else>{{fingerprint}}</span>
        <q-btn v-if="qrFinding" @click="qrFinding = false" label="Capture Barcode" class="q-mb-sm" style="width:100%" color="primary" />
        <qrcode-stream v-else @detect="onDetect" @decode="onDecode"></qrcode-stream>
        <span>{{qr}}</span>
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
  <th>User Id</th>
  <th>Book Id</th>
  <th>Borrow Time</th>
  <th>Return Time</th>
  <th>Barcode</th>
  
  <th>Action</th>
</tr>
<tr v-for="(u,index) in user">
  <td>{{index+1}}</td>
  <td>{{u.user_id}}</td>
  <td>{{u.book_id}}</td>
  <td>{{u.borrow_time}}</td>
  <td>{{u.return_time}}</td>
  <td>{{u.book_barcode}}</td>
  <td>
    <q-btn color="red" @click="deleteUser(u.id)" size="sm" class="q-ml-sm q-mr-sm" label="Return Book" />
  </td>
</tr>
</table>

  </q-page>
</template>
<script>
import { defineComponent } from 'vue'
import { QrcodeStream } from 'vue3-qrcode-reader'
export default defineComponent({
  name: 'Borrowed',
  components: {
    QrcodeStream,
  },
  data(){
    return{
      qrFinding:true,
      user:[],
      returnDate:'',
      name:'',
      author:'',
      price:'',
      description:'',
      quantity:'',
      departments:["CSE","EEE","ETE","English","LAW"],
      semesters:[1,2,3,4,5,6,7,8,9,10,11,12],
      create:false,
      first_name:'',
      last_name:'',
      email:'',
      fingerprint:'srogvknfslkff24123vs31313sc1',
      students_id:'',
      department:'',
      semester:'',
      getFinger:true,
      qr:''
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
      fetch(this.uri+'borrow_book.php?userDelete='+id).then(()=>{
        alert('Book Returned');
        this.fetchUser();  
      });
    },
    onDecode(deocdedString){
      this.qr = deocdedString;
      console.log(deocdedString);
      this.qrFinding = true;
    },
    async onDetect(detectedCodes){
     //
    },
    captureFinger(){
        fetch(this.uri+'sensor.php?current=1').then((response)=>response.json()).then((responseJson)=>{
        console.log(responseJson);
        this.fingerprint = responseJson[0].fingerprint;
        this.getFinger = false;
        // this.user = responseJson;
      });
      },
    fetchUser(){
      fetch(this.uri+'borrow_book.php?value=1').then((response)=>response.json()).then((responseJson)=>{
      console.log(responseJson);
      this.user = responseJson;
    })
    },
    insertUser(){
      var book = parseInt(this.qr)-11569874;
      console.log(book);
      fetch(this.uri+'borrow_book.php?fingerprint='+this.fingerprint+'&book='+book+'&book_barcode='+this.qr).then(()=>{
        alert('Book borrow added');
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