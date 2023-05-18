
  <template>
    <q-page>
      <p style="margin: 10px;
    margin-left: 16px;
    font-size: 20px;
    font-weight: bold;
    color: #025dff;">Generate QR code</p>
      <div class="q-ml-lg q-mr-lg">
        <q-input outlined class="q-mb-sm" v-model="bookId" label="Enter Book ID" />
        <q-btn label="Generate QR Code" @click="generateQR()" style="width:100%" color="primary" />
      </div>
      <div v-if="generated">
        <qrcode-vue :value="value" class="text-center" foreground="green" :size="size" level="H" />
      </div>
    </q-page>
  </template>
  <script>
  import { defineComponent } from 'vue'
  import QrcodeVue from 'qrcode.vue'
  export default defineComponent({
    name: 'Fine',
    data(){
      return{
        bookId:'',
        generated:false,
        value:''
      }
    },
    components: {
      QrcodeVue,
    },
    methods:{
      generateQR(){
        var dang = parseInt(this.bookId)+11569874;
        this.value = dang.toString();
        this.generated = true;
      }
    }
  })
  </script>