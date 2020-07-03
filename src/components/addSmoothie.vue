<template>
  <div class="container add-smoothie">
    <h2 class="center-align indigo-text">Add New Smoothie</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="field add-ingredient added-ing">
        <label v-for="(ing,index) in ingredients" :key="index">{{ing}}<span @click="deleteItem(index)">×</span></label>
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
        <button class="btn pink">Add smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import slugify from "slugify"
export default {
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      msg: null,
      slug:null
    };
  },
  methods: {
    addSmoothie() {
      if(this.title){
        this.msg = null;
        this.slug = slugify(this.title,{
          replacement: '-',              //each space will be replaced with -
          remove: /[$*_+~.()'"!\-:@]/g,   //remove all those characters when user enters
          lower: true                  // letters will be lower case
        });
        firebase.firestore().collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
        }).then(() => {
          this.$router.push({name: 'index'})
        }).catch(err => {
          console.error(err);
        })
      }else{
        this.msg = "You must enter a title"
      }
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.msg = null;
      } else {
        this.msg = "You must add some ingredients";
      }
    },
       deleteItem(index){
            this.ingredients.splice(index,1)
        }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.add-smoothie {
  padding: 30px;
  h2 {
    font-size: 2em;
  }
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
}
</style>
