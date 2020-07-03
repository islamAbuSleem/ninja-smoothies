<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id);">delete</i>

        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <i v-for="(ingre, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ingre }}</span>
          </i>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
                <router-link :to="{name: 'edit', params:{
          smoothie_slug:smoothie.slug
        }}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      smoothies: [],
      ref: firebase.firestore().collection("smoothies")
    };
  },
  methods: {
    deleteSmoothie(id) {
      this.ref
        .doc(id)
        .delete() //delete from database
        .then(() => {
          // delete in frontEnd
          this.smoothies = this.smoothies.filter(smoothie => {
            return smoothie.id !== id;
          });
        });
    }
  },
  created() {
    this.ref.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        let smoothie = doc.data();
        smoothie.id = doc.id;
        this.smoothies.push(smoothie);
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 30px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 20px auto;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 1.4em;
  color: #999;
  cursor: pointer;
}

</style>
