<template>
  <v-text-field
    dense
    solo
    hide-details
    placeholder="Search"
    rounded
    append-icon="mdi-magnify"
    class="my-3"
    clearable
    color="primary"
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// eslint-disable-next-line no-use-before-define
@Component<SearchAddress>({
  name: 'SearchAddress',
  // eslint-disable-next-line no-undef
})
export default class SearchAddress extends Vue {
}
</script>
