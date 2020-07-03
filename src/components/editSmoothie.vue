<template>
  <div class="container">

    <h2 class="center-align indigo-text">Edit {{smoothie.title}}</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie title:</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div class="field add-ingredient added-ing">
        <label v-for="(ing,index) in smoothie.ingredients" :key="index">{{ing}}<span @click="deleteItem(index)">×</span></label>
      </div>
      <div class="field add-ingredient">
        <label for="title" class="add-ingredient">Smoothie title:</label>
        <input
          type="text"
          class="add-ingredient"
          name="title"
          @keydown.tab.prevent="addIng"
          v-model="another"
        >
      </div>
      <div class="field center-align submit-btn">
        <p class="red-text" v-if="msg">{{msg}}</p>
        <button class="btn pink">Update smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import slugify from "slugify"

export default {
  name: "edit-smoothie",
  data() {
    return {
      smoothie:null,
      msg:null,
      another:null
    };
  },
  created (){
    let ref = firebase.firestore().collection("smoothies").where('slug', '==', this.$route.params.smoothie_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      })
    })
  },
  methods:{
    editSmoothie(){
            if(this.smoothie.title){
        this.msg = null;
        this.smoothie.slug = slugify(this.smoothie.title,{
          replacement: '-',              //each space will be replaced with -
          remove: /[$*_+~.()'"!\-:@]/g,   //remove all those characters when user enters
          lower: true                  // letters will be lower case
        });
        firebase.firestore().collection('smoothies').doc(this.smoothie.id).update({
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug
        }).then(() => {
          this.$router.push({name: 'index'})
        }).catch(err => {
          console.error(err);
        })
      }else{
        this.msg = "You must enter a title"
      }
    },
    deleteItem(index){
            this.smoothie.ingredients.splice(index,1)
        },
         addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.msg = null;
      } else {
        this.msg = "You must add some ingredients";
      }
    },
  }
};
</script>

<style lang="scss" scoped>
  form {
    margin: 40px auto;
    max-width: 500px;
    .added-ing {
      margin: 20px 0;
      display: flex;
      flex-wrap: wrap;
      label {
        padding: 2px 9px;
        background-color: #eaeaea;
        font-size: 0.9em;
        border-radius: 9px;
        margin: 6px;
        span{
          margin-left: 6px;
          transition: text-shadow .16s ease-in-out;
          &:hover{
            text-shadow: 0px 1px 1px #2c2929;
            font-weight: 600;
            cursor:pointer;
            
          }
        }
      }
    }
    .submit-btn {
      margin-top: 30px;
    }
  }
</style>
