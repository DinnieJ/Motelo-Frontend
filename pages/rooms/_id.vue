<template>
  <v-container>
    <room-detail-container
      :room="room"
      :favorite.sync="favorite"
      :clickFavor="clickFavor"
      :comments.sync="comments"
      :addComment="addComment"
      :editComment="editComment"
      :deleteComment="deleteComment"

      :verify.sync="verify"
      :clickVerify="clickVerify"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RoomDetailContainer from '@/components/room/RoomDetailContainer.vue'
import RoomRepository from '@/repositories/RoomRepository'
import { RoomDetailDTO, CommentDTO } from '@/constants/app.interface'

// eslint-disable-next-line no-use-before-define
@Component<DetailRoom>({
  name: 'DetailRoom',
  components: {
    RoomDetailContainer,
  },
  async created() {
    try {
      this.id = parseInt(this.$route.params.id)
    } catch (e) {
      this.id = -1
    }

    await this.getRoomDetail()
  },
})
export default class DetailRoom extends Vue {
  private room: RoomDetailDTO = new RoomDetailDTO()
  private id: number = -1
  private favorite: boolean = false
  private verify: boolean = false
  private comments: CommentDTO[] = []
  $notify: any

  public async getRoomDetail() {
    const id: string = this.$route.params.id
    await RoomRepository.getRoomDetail(id).then((repos) => {
      this.room = new RoomDetailDTO(repos.data)
      this.id = this.room.id
      this.favorite = this.room.favorite
      this.comments = this.room.comments
      this.verify = this.room.verify
    }).catch(err => {
      if(err.response.status == 404) {
        return this.$nuxt.error({statusCode: 404})
      }
    })
  }

  public async clickFavor(event: Event) {
    event.preventDefault()
    if (this.favorite) {
      await this.unfavorRoom()
    } else {
      await this.favorRoom()
    }
  }

  public async clickVerify(event: Event) {
    event.preventDefault()
    if (!this.verify) {
      this.verifyRoom();
    }
  }

  public async addComment(comment: string) {
    await RoomRepository.addComment(this.id, comment)
      .then((repos) => {
        this.comments.unshift({
          id: repos.data.comment.id,
          account_id: repos.data.comment.tenant_id,
          name: repos.data.comment.tenant_name,
          context: comment,
          time_context: repos.data.comment.time_context
        })
        this.$notify.showMessage({
          message: `Bạn đã thêm nhận xét cho "${this.room.title}"`,
          color: 'success',
        })
      })
      .catch((error) => {
        console.log('add error = ', error)
      })
  }

  public async editComment({id, comment} : { id: number; comment: string }) {
    await RoomRepository.editComment(id, comment)
      .then((repos) => {
        let editedComment = this.comments.findIndex((cmt) => cmt.id === id)
        this.comments[editedComment].context = repos.data.comment.comment
        this.comments[editedComment].time_context = repos.data.comment.time_context
        console.log(repos.data);
        this.$notify.showMessage({
          message: 'Bạn đã sửa bình luận thành công',
          color: 'success',
        })
      })
      .catch((error) => {
        console.log('edit error = ', error)
      })
  }

  public async deleteComment(id: number) {
    await RoomRepository.deleteComment(id)
      .then(() => {
        let deletedComment = this.comments.findIndex((cmt) => cmt.id === id)
        this.comments.splice(deletedComment, 1)
        this.$notify.showMessage({
          message: 'Bạn đã xóa bình luận thành công',
          color: 'success',
        })
      })
      .catch((error) => {
        console.log('delete error = ', error)
      })
  }

  public async favorRoom() {
    this.favorite = false
    await RoomRepository.favorRoom(this.id).then((repos) => {
      this.favorite = true
      this.$notify.showMessage({
        message: `Bạn đã thêm ${this.room.title} vào danh sách yêu thích`,
        color: 'success',
      })
    })
  }

  public async unfavorRoom() {
    this.favorite = false
    await RoomRepository.unfavorRoom(this.id).then((repos) => {
      this.favorite = false
      this.$notify.showMessage({
        message: `Bạn đã bỏ ${this.room.title} vào danh sách yêu thích`,
        color: 'warning',
      })
    })
  }

  public async verifyRoom() {
    await RoomRepository.verifyRoom(this.room.id)
      .then((repos) => {
        this.verify = true
        this.$notify.showMessage({
          message: `Bạn đã kiểm chứng "${this.room.title}"`,
          color: 'success',
        })
      })
  }
}
</script>
