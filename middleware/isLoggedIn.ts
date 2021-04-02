import { ROLE } from "~/constants/app.constant";


export default ({ redirect, store }) => {
    if(store.state.auth.token) {
        switch (store.state.auth.role) {
            case ROLE.TENANT:
                redirect('/')
                break
            case ROLE.OWNER:
                redirect('/owner/home')
                break
            case ROLE.COLLABORATOR:
                redirect('/map')
                break
        }
    }
}