<template>
  <div id="projects">
    <v-app-bar elevation="5" app>
      <v-spacer />

      <v-btn color="secondary" @click.stop="logout">Logout</v-btn>
    </v-app-bar>

    <v-main class="main-projects">
      <v-container class="pa-10" fluid>
        <div class="text-h6 pb-5 text-center">Projects</div>

        <v-row align="center" class="pb-5" justify="end" no-gutters>
          <v-col class="pr-5" cols="auto">Sort By</v-col>
          <v-col cols="auto">
            <v-select v-model="sortOption" :items="sortOptions" solo />
          </v-col>
        </v-row>

        <v-data-table
          :headers="headers"
          :items-per-page="itemsPerPage"
          :server-items-length.sync="totalItems"
          :page.sync="page"
          :items="items"
        ></v-data-table>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

const ITEMS_PER_PAGE = 5;

export default {
  name: "Projectsa",

  data() {
    return {
      sortOptions: [
        { text: "Recent Projects", value: "RECENT_PROJECTS_DESC" },
        { text: "Category Name ↓ (Asc)", value: "CATEGORY_NAME_ASC" },
        { text: "Category Name ↑ (Desc)", value: "CATEGORY_NAME_DESC" },
        { text: "Username ↓ (Asc)", value: "USERNAME_ASC" },
        { text: "Project Title ↓ (Asc)", value: "PROJECT_TITLE_ASC" }
      ],

      sortOption: "RECENT_PROJECTS",

      totalItems: 0,
      itemsPerPage: ITEMS_PER_PAGE,
      page: 1,

      headers: [
        {
          text: "Project Title",
          align: "start",
          sortable: false,
          value: "project_title"
        },

        {
          text: "Username",
          align: "center",
          sortable: false,
          value: "username"
        },

        {
          text: "Category Name",
          align: "center",
          sortable: false,
          value: "category_name"
        }
      ],

      items: []
    };
  },

  computed: mapState(["token"]),

  watch: {
    page: function() {
      this.fetchProjects();
    },

    sortOption: function() {
      this.fetchProjects();
    }
  },

  methods: {
    ...mapActions(["setToken"]),

    logout() {
      this.setToken(false);
      this.$router.replace({ name: "Login" });
    },

    async fetchProjects() {
      const offset = (this.page - 1) * ITEMS_PER_PAGE;
      const limit = ITEMS_PER_PAGE;

      const projectsResponse = await this.$http.get("/api/projects", {
        params: {
          sortOption: this.sortOption,
          offset,
          limit
        },
        headers: {
          authorization: this.token
        }
      });

      this.totalItems = projectsResponse.data.total;
      this.items = projectsResponse.data.data;
    }
  },

  mounted() {
    if (!this.token) {
      this.$router.replace({ name: "Login" });
    } else {
      this.fetchProjects();
    }
  }
};
</script>

<style lang="scss" scoped>
.main-projects {
  background: #ddd;
}
</style>

<style lang="scss">
#projects {
  .v-data-footer__select {
    display: none !important;
  }
}
</style>
