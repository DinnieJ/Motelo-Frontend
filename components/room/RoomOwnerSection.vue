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
    <div class="mt-2">
      <v-layout class="mb-4">
        <v-img src="/imgs/logo-name.png" max-width="32" max-height="32"></v-img>
        <p class="ml-6">Dao Tien Nam</p>
      </v-layout>
      <v-layout class="mb-4">
        <v-img
          src="/imgs/logo-phone.png"
          max-width="32"
          max-height="32"
        ></v-img>
        <p class="ml-6">0912839213</p>
      </v-layout>
      <v-layout class="mb-4">
        <v-img
          src="/imgs/logo-facebook.png"
          max-width="32"
          max-height="32"
        ></v-img>
        <a
          class="ml-6"
          href="https://www.facebook.com/nguyenvana/"
          target="_blank"
          rel="noopener noreferrer"
          >https://www.facebook.com/nguyenvana/</a
        >
      </v-layout>
      <v-layout class="mb-4">
        <v-img src="/imgs/logo-zalo.jpg" max-width="32" max-height="32"></v-img>
        <a
          class="ml-6"
          href="https://zalo.me/0912839213"
          target="_blank"
          rel="noopener noreferrer"
          >https://zalo.me/0912839213</a
        >
      </v-layout>
    </div>
  </div>
</template>
