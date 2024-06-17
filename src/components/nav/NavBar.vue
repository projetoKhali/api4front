<template>
  <nav>
    <div :class="'oracle-logo'" />
    <ul :class="'router-link-list'" v-if="$router.options.routes">
      <li
        v-for="route in $router.options.routes.filter(
          route => !route.meta?.hide,
        )"
        :key="route.path"
      >
        <RecursiveRouterLink
          :route="route"
          :setSubMenu="setSubMenu"
          :getSubMenu="getSubMenu"
          :getRouteGroupClass="getRouteGroupClass"
        />
      </li>
    </ul>
    <ul
      :id="'router-link-group'"
      :class="'router-link-list router-link-group'"
      :style="{ display: getSubMenu()?.status ? 'flex' : 'none' }"
    >
      <li v-for="child in getSubMenu()?.items" :key="child.path">
        <RecursiveRouterLink
          :route="{
            ...child,
            path: (`${getSubMenu()?.base}/` || '') + child.path,
          }"
          :setSubMenu="setSubMenu"
          :getSubMenu="getSubMenu"
          :getRouteGroupClass="getRouteGroupClass"
        />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import router from '../../router';
import RecursiveRouterLink from './RecursiveRouterLink.vue';
import { removeSpecialCharacters } from '../../util';

type SubMenu = {
  base: string;
  status: boolean;
  items?: Array<any>;
};

const isSubMenuOpen = ref<SubMenu>({ status: false });
const moustPosition = ref({ x: 0, y: 0 });

export default {
  router,
  components: {
    RecursiveRouterLink,
  },
  setup() {
    const setSubMenu = (subMenu: SubMenu) => {
      if (!subMenu.status) {
        if (subMenu.base !== isSubMenuOpen.value.base) {
          subMenu.status = true;
        }
      }

      isSubMenuOpen.value = subMenu;

      if (!!isSubMenuOpen.value.status) {
        const subMenuElement = document.getElementById('router-link-group');

        if (!subMenuElement) {
          return;
        }

        const targetElement = document.getElementById(
          `router-link-group-button-${removeSpecialCharacters(subMenu.base)}`,
        );

        if (!targetElement) {
          subMenu.status = false;
          return;
        }

        const targetElementBoundaries = targetElement.getBoundingClientRect();

        subMenuElement.style.top = `${targetElementBoundaries.bottom}px`;
        subMenuElement.style.left = `${targetElementBoundaries.left}px`;
        subMenuElement.style.width = `${targetElementBoundaries.width}px`;
      }
    };

    const getSubMenu = () => isSubMenuOpen.value;

    const getRouteGroupClass = computed(() => (route: any) => {
      const classes = ['router-link'];

      if (window.location.href.includes(route?.path)) {
        classes.push('router-link-active');
      }

      if (
        isSubMenuOpen.value.status &&
        isSubMenuOpen.value.base === route.path
      ) {
        classes.push('router-link-expanded');
      }

      return classes.join(' ');
    });

    return {
      setSubMenu,
      getSubMenu,
      getRouteGroupClass,
    };
  },
};
</script>

<style scoped>
*,
*:deep(*) {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 20px;
}

.oracle-logo {
  height: 20px;
  width: 32px;
  min-width: 32px;
  border: 6px solid #9f382a;
  border-radius: 16px;
  padding: 0;
}

nav {
  background-color: #361a4d;
  border-bottom: 4px solid #b782e3;
}

nav:deep(.router-link-list) {
  justify-content: space-evenly;
  flex-wrap: wrap;
  list-style-type: none;
}

nav:deep(.router-link) {
  z-index: 2;
  border: none;
  background: transparent;
  color: #ffccff;
  text-decoration: none;
  cursor: pointer;
}

nav:deep(.router-link:hover) {
  background: #ff99ff;
  border-radius: 4px;
  box-shadow: 0 0 4px 4px #ff99ff;
  outline: 2px solid #ffaaff;
  text-shadow:
    -1px -1px 4px black,
    -1px +1px 4px black,
    +1px -1px 4px black,
    +1px +1px 4px black;
}

nav:deep(.router-link-active) {
  color: white;
  text-decoration: underline white 4px;
}

nav:deep(.router-link-expanded) {
  background: #b782e3;
  border-radius: 4px 4px 0 0;
  color: white;
}

.router-link-group {
  z-index: 1;
  position: absolute;
  margin: 0;
  padding: 0.75em 0 1em 0;
  background-color: #361a4d;
  border-style: solid;
  border-color: #b782e3;
  border-width: 0.25em 4px 4px 4px;
  border-radius: 0 0 6px 6px;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 0.25em;
}

.router-link-group:deep(li) {
  padding: 0;
}

.router-link-group:deep(.router-link) {
  padding: 0;
  margin: 0.125em;
}
</style>
