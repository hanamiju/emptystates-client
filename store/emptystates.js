export const state = () => ({
    screenshotList: [],
    selectedScreenshot: null,
    app: null,
    emptystate: null
})

export const mutations = {
    addScreenshot(state, screenshot) {
        state.screenshotList.push(screenshot)
    },
    selectScreenshot(state, screenshot) {
        state.selectedScreenshot = screenshot
    },
    setEmptyState(state, emptystate) {
        state.emptystate = emptystate
    },
    setApp(state, app) {
        state.app = app
    },
    emptyList(state) {
        state.screenshotList = []
    }
}

export const getters = {
    screenshots: state => {
        return state.screenshotList
    },
    selectedScreenshot: state => {
        return state.selectedScreenshot
    },
    app: state => {
        return state.app
    },
    emptystate: state => {
        return state.emptystate
    }
}
