<template>
  <v-container>
    <section class="white pa-1 rounded">
      <v-layout class="mb-3" justify-space-between>
        <h1 class="primary--text text-left home__header">Cá nhân</h1>

        <v-btn small rounded outlined color="primary"> Sửa </v-btn>
      </v-layout>

      <v-row>
        <v-col cols="12" sm="6">
          <v-img
            :lazy-src="loadingImg"
            contain
            max-height="200px"
            src="/imgs/undraw_Mention_re_k5xc.svg"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          class="flex-column justify-content-center align-center pa-8"
        >
          <div>
            <v-layout align-center class="mb-3">
              <v-icon size="24" class="mr-4">mdi-account</v-icon>
              <span>{{ user.name }}</span>
            </v-layout>
            <v-layout align-center class="mb-3">
              <v-icon size="24" class="mr-4">mdi-cake</v-icon>
              <span>{{ user.date_of_birth }}</span>
            </v-layout>
            <div>
              <v-layout
                v-for="contact in user.contacts"
                :key="contact.id"
                align-center
                class="mb-3"
              >
                <v-img
                  contain
                  max-width="24px"
                  max-height="24"
                  :lazy-src="loadingImg"
                  :src="getContactImg(contact.contact_type_id)"
                  class="mr-4"
                />
                <span>{{ contact.content }}</span>
              </v-layout>
            </div>
          </div>
        </v-col>
      </v-row>
    </section>

    <section class="white pa-1 mt-1 rounded">
      <v-layout class="mb-3" justify-space-between>
        <h1 class="primary--text text-left home__header">Nhà trọ</h1>

        <v-btn small rounded outlined color="primary"> Sửa </v-btn>
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
  }

  private loadingImg: string = LOADING_IMG

  public getContactImg(type: any): string {
    const contactDTO = Contacts.find((item) => item.type == type)

    if (contactDTO) {
      return contactDTO.icon
    }

    return ''
  }

  public async getInnProfile() {
    const context: any = this
    await InnRepository.getInnDetailByOwner(context.user.id).then(
      (response) => {
        const inn = response.data
        // features
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
        this.inn = inn
      }
    )
  }
}
</script>
