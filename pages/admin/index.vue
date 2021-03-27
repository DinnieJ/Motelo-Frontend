<template>
  <v-container fluid tag="section">
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar height="100%" dark color="primary darken-3" class="mb-1">
          <div>
            <v-layout align-center class="mb-1">
              <h1 class="mr-2">Motelo cho Admin</h1>
              <v-btn small depressed color="secondary">
                Đăng xuất
              </v-btn>
            </v-layout>
            <v-layout align-center>
              <v-btn
                class="mr-2"
                large
                depressed
                color="primary"
                @click="clickCreate"
              >
                Tạo mới
              </v-btn>
              <v-text-field
                class="mr-2"
                v-model="search"
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Tìm theo tên"
              ></v-text-field>
              <template v-if="$vuetify.breakpoint.mdAndUp">
                <v-select
                  v-model="sortBy"
                  flat
                  solo-inverted
                  hide-details
                  :items="headers"
                  prepend-inner-icon="mdi-magnify"
                  label="Sắp xếp theo"
                  class="mr-3 justify-self-end"
                ></v-select>
                <v-btn-toggle v-model="sortDesc" mandatory>
                  <v-btn large depressed color="primary" :value="false">
                    <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
                  <v-btn large depressed color="primary" :value="true">
                    <v-icon>mdi-arrow-down</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </template>
            </v-layout>
          </div>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row class="mt-2">
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-img
                :lazy-src="loadingImg"
                :src="item.img"
                width="100%"
                max-height="100px"
                contain
              ></v-img>

              <v-card-title class="subheading font-weight-bold mt-2">
                {{ item.name }}
              </v-card-title>

              <v-layout class="px-2" align-center justify-space-between>
                <v-switch
                  :input-value="props.isExpanded(item)"
                  :label="
                    props.isExpanded(item) ? 'Hiện chi tiết' : 'Ẩn chi tiết'
                  "
                  @change="(v) => props.expand(item, v)"
                ></v-switch>
                <div>
                  <v-btn
                    fab
                    x-small
                    color="info"
                    class="mr-3"
                    @click="clickEdit(item)"
                  >
                    <v-icon small> mdi-cog </v-icon>
                  </v-btn>
                  <v-btn fab x-small color="warning">
                    <v-icon small> mdi-trash-can-outline </v-icon>
                  </v-btn>
                </div>
              </v-layout>

              <v-divider></v-divider>

              <v-list dense v-if="props.isExpanded(item)">
                <v-list-item v-for="(key, index) in headers" :key="index">
                  <p :class="{ 'secondary--text': sortBy === key.value }">
                    <i>{{ key.text }}</i>
                    : {{ item[key.value] }}
                  </p>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-layout class="mt-2" align-center justify-end>
          <span class="mr-4 primary--text">
            Trang {{ page }} trên {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            x-small
            color="primary"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            x-small
            color="primary"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
        </v-layout>
      </template>
    </v-data-iterator>
    <v-dialog
      max-width="1184px"
      v-model="openDialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card class="pa-2" width="100%">
        <v-card-title>{{ dialogTitle }}</v-card-title>
        <v-row>
          <!-- Basic infor -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.username"
              label="Tên"
              name="username"
              outlined
              class="required"
            ></v-text-field>
            <v-text-field
              v-model="formData.email"
              label="Email"
              name="email"
              outlined
              class="required"
            ></v-text-field>
            <v-text-field
              v-model="formData.phone_number"
              label="Số điện thoại"
              name="phone"
              outlined
              class="required"
            ></v-text-field>
            <v-text-field
              v-model="formData.address"
              label="Địa chỉ"
              name="address"
              outlined
              class="required"
            ></v-text-field>
            <v-menu
              v-model="dateDialog"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formData.date_of_birth"
                  label="Ngày sinh"
                  outlined
                  color="primary"
                  readonly
                  class="required"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formData.date_of_birth"
                @input="dateDialog = false"
              ></v-date-picker>
            </v-menu>
            <v-text-field
              v-model="formData.identity_number"
              label="Số CMTND"
              name="identity"
              outlined
              class="required"
            ></v-text-field>
          </v-col>
          <!-- Image upload -->
          <v-col cols="12" md="6">
            <input
              type="file"
              accept="image/*"
              ref="images"
              class="d-none"
              @change="onFileChange"
            />
            <img width="100%" height="auto" ref="image" />
            <v-layout justify-center>
              <v-btn outlined color="primary" @click="clickUpload">
                <v-icon left>mdi-upload</v-icon>
                Tải lên ảnh đại diện
              </v-btn>
            </v-layout>
          </v-col>
        </v-row>
        <v-layout justify-start class="mt-4">
          <v-btn class="mr-3" color="primary" @click="clickCancel">
            Hoàn thành
          </v-btn>
          <v-btn @click="clickCancel"> Trở lại </v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Snackbar from '@/components/common/Snackbar.vue'
import { LOADING_IMG } from '@/constants/app.constant'

// eslint-disable-next-line no-use-before-define
@Component<AdminHome>({
  name: 'AdminHome',
  layout: 'empty',
  components: {
    Snackbar,
  },
  fetch() {
    this.getAllCollaborator()
  },
})
export default class AdminHome extends Vue {
  private loadingImg = LOADING_IMG
  private search = ''
  private sortDesc = false
  private page = 1
  private itemsPerPage = 8
  private sortBy = 'email'
  private headers = [
    {
      text: 'Email',
      value: 'email',
    },
    {
      text: 'Số điện thoại',
      value: 'phone_number',
    },
    {
      text: 'Địa chỉ',
      value: 'address',
    },
    {
      text: 'Ngày sinh',
      value: 'date_of_birth',
    },
    {
      text: 'Số CMTND',
      value: 'identity_number',
    },
    {
      text: 'Ngày tạo tài khoản',
      value: 'created_at',
    },
  ]
  private openDialog: boolean = false
  private formData: any = {
    id: -1,
    username: '',
    email: '',
    phone_number: '',
    address: '',
    date_of_birth: '',
    identity_number: '',
  }
  private image: any = null
  private dialogTitle: string = ''
  private dateDialog = false

  private items: any[] = []
  get numberOfPages() {
    return Math.ceil(this.items.length / this.itemsPerPage)
  }

  clickCreate() {
    this.dialogTitle = 'Tạo mới Cộng tác viên'
    this.formData = {
      id: -1,
      name: '',
      email: '',
      phone_number: '',
      address: '',
      date_of_birth: '',
      identity_number: '',
    }
    this.openDialog = true
  }

  clickCancel() {
    this.openDialog = false
  }

  nextPage() {
    if (this.page + 1 <= this.numberOfPages) this.page += 1
  }
  formerPage() {
    if (this.page - 1 >= 1) this.page -= 1
  }

  clickEdit(item: any) {
    this.dialogTitle = 'Sửa đổi Cộng tác viên'
    Object.keys(this.formData).forEach(key => {
      this.formData[key] = item[key]
    });
    this.openDialog = true
  }

  clickUpload(e: Event) {
    e.preventDefault()
    const input = this.$refs.images as any
    input.click()
  }

  onFileChange(e: any) {
    let vm: any = this
    var selectedFiles = e.target.files
    this.image = selectedFiles[0]

    let reader = new FileReader()
    reader.onload = (e) => {
      vm.$refs.image.src = reader.result
    }

    reader.readAsDataURL(this.image)
  }

  public getAllCollaborator() {
    let items: any[] = []
    for (let i = 0; i < 12; i++) {
      items.push({
        id: i,
        name: `Nguyen Tran Quoc X${i}`,
        email: `nguyentranquocx${i}@fpt.edu.vn`,
        phone_number: '12345678',
        address: `Sô ${i}, đường A, phường B, quận C, thành phố D`,
        date_of_birth: `${i}/2/2000`,
        identity_number: '1234567',
        enabled: 1,
        created_at: `${i}/3/2021`,
        updated_at: `${i}/3/2021`,
        img: '/imgs/error.png',
      })
    }
    this.items = items
  }
}
</script>
