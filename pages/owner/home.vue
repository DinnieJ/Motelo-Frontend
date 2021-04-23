<template>
  <v-container pl-15 pr-15>
    <section class="white pa-1 mb-5 rounded">
      <v-layout class="mb-3" justify-space-between>
        <h1 class="primary--text home__header pl-5 pt-3">Thông tin cá nhân</h1>

        <v-btn rounded color="primary" small class="mt-2 mr-2" to="/owner/profile/edit">
          <v-icon left>mdi-tools</v-icon>
          Sửa thông tin 
        </v-btn>
        <v-btn rounded color="secondary" small class="mt-2 mr-2" to="/change-password">
          <v-icon left>mdi-key</v-icon>
          Đổi mật khẩu
        </v-btn>
      </v-layout>

      <v-row>
        <v-col cols="12" sm="6">
          <v-img
            :lazy-src="loadingImg"
            contain
            max-height="200px"
            :src="user.image ? user.image.image_url : '/imgs/default-profile.jpg'"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          class="flex-column justify-content-center align-center pa-8"
        >
          <div>
            <v-layout align-center class="mb-3">
              <v-icon size="24" left>mdi-account</v-icon>
              <span>{{ user.name }}</span>
            </v-layout>
            <v-layout align-center class="mb-3">
              <v-icon size="24" left>mdi-cake</v-icon>
              <span>{{ user.date_of_birth }}</span>
            </v-layout>
            <div>
              <v-layout
                v-for="contact in user.contacts"
                :key="contact.id"
                align-center
                class="mb-3"
              >
                <v-icon
                  left
                  max-width="24"
                  max-height="24"
                >mdi-{{ getContactIcon(contact.contact_type_id) }}</v-icon>
                <span>{{ contact.content }}</span>
              </v-layout>
            </div>
          </div>
        </v-col>
      </v-row>
    </section>

    <section class="white pa-1 mt-1 rounded">
      <v-layout class="mb-3" justify-space-between>
        <h1 class="primary--text text-left pl-5 pt-3 home__header">Nhà trọ của bạn</h1>

        <v-btn rounded small color="primary" class="mt-2 mr-2" to="/owner/inn/edit">
          <v-icon left>mdi-tools</v-icon>
          Sửa thông tin 
        </v-btn>
      </v-layout>

      <section class="white pa-1 rounded">
        <v-row class="pa-1">
          <v-col cols="12" md="6">
            <images-slide :imgs="inn.imgs" />
          </v-col>
          <v-col cols="12" md="6">
            <small-map :center="inn.position"/>
          </v-col>
        </v-row>
      </section>

      <basic-section
        :electric="inn.electric_price"
        :water="inn.water_price"
        :wifi="inn.wifi_price"
        :inn_name="inn.name"
        :address="inn.address"
        forInn
      />

      <amenitie-section :amenities="inn.amenities" />

      <safety-section :security="inn.security" :open_time="inn.open_time" />
    </section>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { Getter } from '@/constants/app.vuex'
import { Contacts, SECURITY, AMEENITIES, LOADING_IMG } from '@/constants/app.constant'
import InnRepository from '@/repositories/InnRepository'

import SmallMap from '@/components/map/SmallMap.vue'

import ImagesSlide from '@/components/common/ImagesSlide.vue'
import BasicSection from '@/components/common/BasicSection.vue'
import AmenitieSection from '@/components/common/AmenitieSection.vue'
import SafetySection from '@/components/common/SafetySection.vue'

// eslint-disable-next-line no-use-before-define
@Component<OwnerHome>({
  name: 'OwnerHome',
  // eslint-disable-next-line no-undef
  components: {
    ImagesSlide,
    SmallMap,
    BasicSection,
    AmenitieSection,
    SafetySection,
  },
  middleware: ['authenticated', 'isOwner', 'hasInn'],
  computed: {
    ...mapGetters({
      user: Getter.USER,
    }),
  },
  async fetch() {
    await this.getInnProfile()
  },
})
export default class OwnerHome extends Vue {
  private inn: any = {
    imgs: [],
    open_time: {
      open: '',
      close: '',
    },
    position: { lat: 0, lng: 0 }
  }

  private loadingImg: string = LOADING_IMG

  public getContactIcon(type: any): string {
    const contactDTO = Contacts.find((item) => item.type == type)

    if (contactDTO) {
      return contactDTO.icon
    }

    return ''
  }

  public async getInnProfile() {
    const context: any = this
    await InnRepository.getInnDetailByOwner().then(
      (response) => {
        const inn = response.data

        let amenities: number[] = []
        let security: number[] = []
        for (let amenity of inn.features) {
          if (amenity <= 13) amenities.push(amenity)
          else if (amenity <= 16) {
            security.push(amenity)
          }
        }
        inn.amenities = AMEENITIES.filter((amenity) => {
          const found = amenities.find((item: number) => item === amenity.id)
          if (found) {
            return true
          }
          return false
        })
        inn.security = SECURITY.filter((amenity) => {
          const found = security.find((item: number) => item === amenity.id)
          if (found) {
            return true
          }
          return false
        })
        inn.open_time = {
          open: inn.open_time,
          close: inn.close_time,
        }
        inn.position = inn.location;
        inn.imgs = inn.images.map((item: any) => item.image_url)
        this.inn = inn
      }
    )
  }
}
</script>
