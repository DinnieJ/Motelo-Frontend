<template>
  <div class="owner">
    <div>
      <h1>
        <v-icon class="mb-3 ml-3" size="32" color="primary" dark left>
          mdi-book-account
        </v-icon>
        <span>Chủ phòng</span>
      </h1>
      <v-divider />
    </div>
    <v-layout class="pl-3 mt-4" d-flex align-center align-content-center>
      <v-icon left large> mdi-account-circle </v-icon>
      <p class="ml-3 mb-0">{{ owner.name }}</p>
    </v-layout>
    <div v-for="contact in contacts" :key="contact.type">
      <div v-if="owner[contact.name].length">
        <v-layout class="pl-3 mt-4" d-flex align-center align-content-center v-for="item in owner[contact.name]" :key="item">
          <v-icon left large> mdi-{{ contact.icon }} </v-icon>
          <a
            v-if="contact.link"
            :href="preLink(contact.type) + item"
            target="_blank"
            rel="noopener noreferrer"
            class="ml-3 mb-0"
          >
            <span v-if="contact.type == 3">Zalo: </span>{{ item }}</a>
          <div v-else class="ml-3">{{ item }}</div>
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
