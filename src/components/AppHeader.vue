<template>
  <nav>
    <div class="nav-wrapper light-blue">
      <ul class="left">
        <a
          class="dropdown-trigger flexbox-center"
          style="width: 300px; justify-content: left"
          href="#"
          data-target="menu-dropdown"
        >
          <span style="font-size: x-large">🧭 Navigation</span>
        </a>
        <ul id="menu-dropdown" class="dropdown-content">
          <div v-if="!isLoggedIn">
            <li>
              <a
                style="font-size: x-large; color: black"
                @click="$emit('open-login-modal')"
                class="flexbox-center"
                >🔑 {{ loginText }}</a
              >
              <div class="vl-button"></div>
            </li>
            <li class="divider" tabindex="-1"></li>
          </div>
          <div v-else>
            <li>
              <a class="flexbox-center" style="font-size: x-large; color: black"
                >🧍 {{ loginText }}</a
              >
            </li>
            <li>
              <a
                class="flexbox-center"
                style="font-size: x-large; color: black"
                @click="$emit('open-username-modal')"
                ><small>Chat username:</small> <br />
                🧍‍♂️{{ displayName }} <br /><small
                  >Click to edit chat username ⬆️</small
                ></a
              >
            </li>
            <li>
              <a
                class="flexbox-center"
                style="font-size: x-large; color: black"
                @click="logout()"
                >🔐 Logout</a
              >
            </li>
            <li class="divider" tabindex="-1"></li>
          </div>
          <router-link v-for="item in routerList" :key="item.to" :to="item.to">
            <li
              style="
                font-size: x-large;
                width: 300px;
                margin-left: -15px;
                justify-content: left;
              "
              class="flexbox-center"
            >
              <div style="margin-left: 15px">{{ item.title }}</div>
            </li>
          </router-link>
        </ul>
      </ul>

      <!-- brand logo -->
      <a href="#!" class="brand-logo right">Logo</a>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    window.M.AutoInit();
  },
};
</script>
<style>
.flexbox-center {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  align-items: center;
}
</style>