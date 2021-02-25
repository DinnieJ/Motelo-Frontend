
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ROLE } from '@/constants/app.constant'

// eslint-disable-next-line no-use-before-define
@Component<OwnerPage>({
  name: 'OwnerPage',
  asyncData({redirect}) {
    redirect('/owner/home')
  },
})
export default class OwnerPage extends Vue {
}
</script>
