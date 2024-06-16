<template>
  <button
    :id="computedId"
    v-if="!!route.children && !!route.children.length"
    :class="getRouteGroupClass(route)"
    @click="
      () =>
        setSubMenu({
          base: route.path,
          status: !getSubMenu().status,
          items: route.children,
        })
    "
  >
    {{ route.meta?.name || route.name }}
  </button>
  <router-link
    v-else
    :to="route.path"
    :class="'router-link'"
    @click="
      () =>
        setSubMenu({
          status: false,
        })
    "
  >
    {{ route.meta?.name || route.name }}
  </router-link>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { removeSpecialCharacters } from '../../util';

export default {
  props: {
    route: {
      type: Object,
      required: true,
    },
    setSubMenu: {
      type: Function,
      required: true,
    },
    getSubMenu: {
      type: Function,
      required: true,
    },
    getRouteGroupClass: {
      type: Function,
      required: true,
    },
  },
  computed: {
    computedId(): string {
      return `router-link-group-button-${removeSpecialCharacters(this.route.path)}`;
    },
  },
};
</script>
