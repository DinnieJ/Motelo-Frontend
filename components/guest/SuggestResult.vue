<template>
  <section>
    <table>
      <tbody>
        <tr>
          <td width="50">Bạn là</td>
          <td>
            <b class="text-h6"> Tân sinh viên </b>
          </td>
        </tr>
        <tr>
          <td width="50">đang tìm</td>
          <td>
            <b>
              <v-icon>{{ `mdi-${roomType.icon}` }}</v-icon>
              <span class="text-h6">
                {{ roomType.text }}
              </span>
            </b>
          </td>
        </tr>
        <tr>
          <td width="50">cho</td>
          <td>
            <b>
              <v-icon>{{ `mdi-${gender.icon}` }}</v-icon>
              <span class="text-h6">
                {{ gender.text }}
              </span>
            </b>
          </td>
        </tr>
        <tr>
          <td width="50">sức chứa</td>
          <td>
            <b class="text-h6">2 - 3 người</b>
          </td>
        </tr>
        <tr>
          <td width="50">rộng</td>
          <td>
            <b class="text-h6">Vừa (khoảng 18 - 20 m²)</b>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      với các tiện nghi
      <br />

      <b v-for="ameenitie in ameenities" :key="ameenitie.code" class="mr-2">
        <v-icon>{{ `mdi-${ameenitie.icon}` }}</v-icon>
        <span> {{ ameenitie.text }} </span>,
      </b>
    </p>
    <nuxt-link class="mt-5" to="/suggest"> Thay đổi gợi ý </nuxt-link>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TextIcon } from '@/constants/app.interface'
import { AMEENITIES, GENDER, ROOM_TYPES } from '@/constants/app.constant'

@Component<SuggestResult>({
  name: 'SuggestResult',
  // eslint-disable-next-line no-undef
})
export default class SuggestResult extends Vue {
  private ameenities: TextIcon[] = AMEENITIES
  private gender: TextIcon = GENDER[0]
  private roomType: TextIcon = ROOM_TYPES[0]
}
</script>
