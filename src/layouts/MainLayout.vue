<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
         CIU Library
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Navigations
        </q-item-label>
        
          <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'Main Page',
    icon: 'home',
    link: '/',
    middlewares:''
  },
  {
    title: 'User Panel',
    caption: 'User management',
    icon: 'person',
    link: '/user',
    middlewares:'admin'
  },
  {
    title: 'Books',
    caption: 'Create / Add / Delete books',
    icon: 'menu_book',
    link: '/book',
    middlewares:'admin'
  },
  {
    title: 'Currently Borrowed',
    caption: 'Borrowed book lists',
    icon: 'import_contacts',
    link: '/borrowed',
    middlewares:'user'
  },
  {
    title: 'Currently Returned',
    caption: 'Returned book lists',
    icon: 'local_library',
    link: '/returned',
    middlewares:'user'
  },
  {
    title: 'Fine management',
    caption: 'Penalty management system',
    icon: 'description',
    link: '/fine',
    middlewares:'admin'
  },
  {
    title: 'Generate QR code',
    caption: 'Generate tag on new book',
    icon: 'qr_code',
    link: '/generator',
    middlewares:'admin'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  methods:{
    logout(){
      this.type = '';
      this.loggedIn = false;
      this.$router.push('/');
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
       return this.$store.state.example.loggedIn;
      },
      set(value){
        this.$store.commit('example/loggedInUpdate', value); 
      },
    }
  },

  setup () {
    const leftDrawerOpen = ref(false)
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
