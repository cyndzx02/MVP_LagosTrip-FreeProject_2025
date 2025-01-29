<template>
  <div class="row home-page">
    <div class="logo-agro d-flex justify-content-center">
      <img
        src="../assets/agronova-logo.png"
        alt="Logo"
        class="img-fluid agro-logo"
      />
    </div>
    <div class="row location-and-basket border">
      <div class="location align-self-center row">
        <span class="col town-location">
          <i class="bi bi-geo-alt-fill location"></i>
          <p class="town">Cotonou</p>
        </span>
        <div class="col basket-only">
          <i class="bi bi-basket2 border basket-logo col"></i>
        </div>
      </div>
    </div>

    <div class="row search_bar">
      <span class="input-group">
        <i class="bi bi-search icon"></i>

        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="De quoi avez vous besoin aujourd'hui ?"
          @input="onSearch"
        />
      </span>
    </div>
    <div class="cards border mt-5"></div>

    <div class="mt-3 container">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="fw-bold">Nos catégories</h5>
        <a href="#" class="text-black fw-bold">Voir plus &gt;</a>
      </div>

      <div class="row mt-3">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="col-4 col-md-3 text-center">
          <div class="category-circle mt-2">
            <img :src="category.icon" :alt="category.name" class="img-fluid" />
          </div>
          <!-- <p class="mt-2">{{ category.name }}</p> -->
        </div>
      </div>
    </div>
    <!-- <div class="categories-voirplus border">
        <p class="categories">Nos Categories</p>
    </div> -->
    <!-- <div class="nouveaute border">
        <p class="nouveaute">Nouveautes !</p>
    </div> -->
    <div class="fruit&legume border">
      <p class="fruit-and-legumes">Fruits & Legumes</p>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo.png";
export default {
  name: "Home",
  data() {
    return {
      searchQuery: "",
      categories: [
        { name: "Fruits", icon: "" },
        { name: "Légumes", icon: "" },
        { name: "Viandes", icon: "" },
        { name: "Poissons", icon: "" },
        { name: "Epicerie", icon: "" },
        { name: "Crèmerie", icon: "" },
        { name: "Surgelés", icon: "" },
        { name: "Entretien", icon: "" },
      ],
    };
  },
  methods: {
    onSearch() {
      this.$emit("search", this.searchQuery);
    },
  },
};
</script>

<style>
.category-circle {
  width: 80px;
  height: 80px;
  background-color: #0a2850;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.category-circle img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
.town-location {
  margin-top: 2%;
}
.basket-only {
  margin-top: 2% !important;
}
.basket-logo {
  position: relative;
  margin-left: 50%;
  /* border: 7px 0 0 7px; */
  height: 10% !important;
  width: 30% !important;
  border-width: 1px !important;
}
.search_bar {
  align-content: center !important;
  margin-top: -1% !important;
  max-width: 1000px;
  margin: auto;
  border-right: none !important;
}

.location {
  margin-left: 8% !important;
}

.town {
  margin-left: 11%;
  margin-top: -3.5%;
}

.icon {
  background-color: white;
  border: 10%;
  border: 1px solid #ced4da;
  border-right: none !important;
  border-radius: 5px 0 0 5px;
  padding: 6px 12px;
}

.logo-agro {
  margin-top: -4%;
}
.form-control {
  border-radius: 0 5px 5px 0;
}

.home-page {
  background-color: white !important;
}

.location-and-basket {
  margin-top: -5%;
  margin-right: 10% !important;
}
</style>
