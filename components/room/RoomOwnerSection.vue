<template>
  <div class="owner">
    <div>
      <v-layout>
        <v-icon class="mx-3" size="32" color="primary" dark>
          mdi-book-account
        </v-icon>
        <h1 class="room__title">Chủ phòng</h1>
      </v-layout>
      <v-divider />
    </div>
    <v-layout class="mb-4">
      <v-img src="/imgs/logo-name.png" max-width="32" max-height="32"></v-img>
      <p class="ml-6">{{ owner.name }}</p>
    </v-layout>
    <div v-for="contact in contacts" :key="contact.type">
      <div v-if="owner[contact.name].length">
        <v-layout class="mb-4" v-for="item in owner[contact.name]" :key="item">
          <v-img :src="contact.icon" max-width="32" max-height="32"></v-img>
          <a
            v-if="contact.link"
            class="ml-6"
            :href="preLink(contact.type) + item"
            target="_blank"
            rel="noopener noreferrer"
            >{{ item }}</a
          >
          <div v-else class="ml-6">{{ item }}</div>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Contacts, Contact } from '@/constants/app.constant'
import { ContactDTO } from '~/constants/app.interface'

@Component<RoomOwnerSection>({
  name: 'RoomOwnerSection',
  // eslint-disable-next-line no-undef
})
export default class RoomOwnerSection extends Vue {
  @Prop({ type: Object }) readonly owner!: Object
  private get contacts(): ContactDTO[] {
    return Contacts
  }

  private preLink(type: number): string {
    let pre: string = ''
    switch (type) {
      case Contact.EMAIL:
        pre = 'mailto:'
        break
      case Contact.ZALO:
        pre = 'https://zalo.me/'
        break
    }
    return pre
  }
}
</script>
