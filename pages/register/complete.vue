<template>
    <v-layout d-flex column justify-center align-center class="login__layout">
        <div class="mb-6">
            <v-layout class="d-flex flex-column justify-content-center white rounded-xl pa-12">
                <h1 class="pa-12 text-primary">Đăng kí thành công</h1>
                <v-btn 
                    color="primary" 
                    to="/login">
                    <v-icon left>mdi-arrow-left</v-icon>
                    Quay lại đăng nhập
                </v-btn>
            </v-layout>
        </div>
    </v-layout>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
@Component<RegisterComplete>({
    name: 'RegisterComplete',
    layout: 'empty'
})
export default class RegisterComplete extends Vue{
    
}
</script>