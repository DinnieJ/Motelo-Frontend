<template>
  <v-container fluid tag="section">
    <v-data-iterator
      :items="items"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template #header>
        <v-toolbar height="100%" dark color="primary darken-3" class="mb-1">
          <div>
            <v-layout align-center class="mb-1">
              <h1 class="mr-2">Motelo cho Admin</h1>
              <v-btn small depressed color="secondary" @click="clickLogout">
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
                v-model="search"
                class="mr-2"
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

      <template #default="props">
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
                  <v-btn
                    fab
                    x-small
                    color="warning"
                    @click="clickDelete(item.id)"
                  >
                    <v-icon small> mdi-trash-can-outline </v-icon>
                  </v-btn>
                </div>
              </v-layout>

              <v-divider></v-divider>

              <v-list v-if="props.isExpanded(item)" dense>
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
    </v-data-iterator>
    <v-dialog
      v-model="openDialog"
      max-width="1184px"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card class="pa-2" width="100%">
        <validation-observer ref="formObserver" v-slot="{ invalid }">
          <v-card-title>{{ dialogTitle }}</v-card-title>
          <v-row>
            <!-- Basic infor -->
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="name"
                :rules="rules.name"
              >
                <v-text-field
                  v-model="formData.name"
                  label="Tên"
                  name="name"
                  outlined
                  class="required"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="email"
                :rules="rules.email"
              >
                <v-text-field
                  v-model="formData.email"
                  label="Email"
                  name="email"
                  outlined
                  :disabled="editId > -1"
                  class="required"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="phone_number"
                :rules="rules.phone_number"
              >
                <v-text-field
                  v-model="formData.phone_number"
                  label="Số điện thoại"
                  name="phone"
                  outlined
                  class="required"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="address"
                :rules="rules.address"
              >
                <v-text-field
                  v-model="formData.address"
                  label="Địa chỉ"
                  name="address"
                  outlined
                  class="required"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
              <v-menu
                v-model="dateDialog"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
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
              <validation-provider
                v-slot="{ errors }"
                name="phone_number"
                :rules="rules.phone_number"
              >
                <v-text-field
                  v-model="formData.identity_number"
                  label="Số CMTND"
                  name="identity"
                  outlined
                  class="required"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-layout justify-start class="mt-4">
            <v-btn
              class="mr-3"
              color="primary"
              v-if="editId > -1"
              @click="submitEdit"
              :disabled="invalid"
            >
              Sửa
            </v-btn>
            <v-btn
              class="mr-3"
              color="primary"
              v-else
              @click="submitCreate"
              :disabled="invalid"
            >
              Tạo mới
            </v-btn>

            <v-btn @click="clickCancel"> Trở lại </v-btn>
          </v-layout>
        </validation-observer>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Snackbar from '@/components/common/Snackbar.vue'
import { LOADING_IMG } from '@/constants/app.constant'
import CollaboratorRepository from '@/repositories/CollaboratorRepository'
import { DispatchAction } from '@/constants/app.vuex'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'Bạn không được để trống trường này',
})

extend('email', {
  ...email,
  message: 'Vui lòng nhập đúng email của bạn',
})

// eslint-disable-next-line no-use-before-define
@Component<AdminHome>({
  name: 'AdminHome',
  layout: 'empty',
  middleware: ['checkAuthen', 'isAdmin'],
  components: {
    Snackbar,
    ValidationObserver,
    ValidationProvider,
  },
  created() {
    this.getAllCollaborator()
  },
})
export default class AdminHome extends Vue {
  private loadingImg = LOADING_IMG
  private search = ''
  private sortDesc = true
  private page = 1
  private itemsPerPage = 8
  private sortBy = 'created_at'
  private editId = -1
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
    name: '',
    email: '',
    phone_number: '',
    address: '',
    date_of_birth: '',
    identity_number: '',
  }

  private rules: any = {
    name: { required: true },
    email: { required: true, email: true },
    phone_number: { required: true },
    address: { required: true },
    date_of_birth: { required: true },
    identity_number: { required: true },
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
      name: '',
      email: '',
      phone_number: '',
      address: '',
      date_of_birth: new Date().toISOString().substr(0, 10),
      identity_number: '',
    }
    this.editId = -1
    this.openDialog = true
  }

  clickCancel() {
    this.editId = -1
    this.openDialog = false
  }

  public async submitCreate() {
    const formData = { password: "12345678", ...this.formData }
    await CollaboratorRepository.createNewCollaborator(formData)
      .then(() => {
        const newCollaborator = {
          ...formData,
          created_at: new Date().toLocaleString(),
        }
        this.items.unshift(newCollaborator)
        this.clickCancel()
      })
      .catch((err) => {})
  }

  public async submitEdit() {
    await CollaboratorRepository.editCollaborator(this.formData, this.editId)
      .then(() => {
        this.clickCancel()
      })
      .catch((err) => {})
  }

  public async clickDelete(id: any) {
    await CollaboratorRepository.deleteCollaborator(id)
      .then(() => {
        this.items = this.items.filter((item) => item.id != id)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  nextPage() {
    if (this.page + 1 <= this.numberOfPages) this.page += 1
  }

  formerPage() {
    if (this.page - 1 >= 1) this.page -= 1
  }

  clickEdit(item: any) {
    this.dialogTitle = 'Sửa đổi Cộng tác viên'
    Object.keys(this.formData).forEach((key) => {
      this.formData[key] = item[key]
    })
    this.editId = item.id
    this.openDialog = true
  }

  clickUpload(e: Event) {
    e.preventDefault()
    const input = this.$refs.images as any
    input.click()
  }

  onFileChange(e: any) {
    const vm: any = this
    const selectedFiles = e.target.files
    this.image = selectedFiles[0]

    const reader = new FileReader()
    reader.onload = (e) => {
      vm.$refs.image.src = reader.result
    }

    reader.readAsDataURL(this.image)
  }

  public async clickLogout(e: Event) {
    const logout = await this.$store.dispatch(DispatchAction.CLEAR_AUTH)
    this.$router.push('/admin/login')
  }

  public async getAllCollaborator() {
    await CollaboratorRepository.getAllCollaborator().then((response) => {
      const dataResponse = response.data[0]
      this.items = dataResponse.data.map((item) => ({
        ...item,
        created_at: new Date(item.created_at).toLocaleString(),
      }))
    })
  }
}
</script>
