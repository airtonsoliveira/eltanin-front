export default function ({ redirect, store }) {
    const loggedIn = store.state.loggedIn
    
    if(!loggedIn) {
        return redirect('/')
    }
}