
export default({
    namespaced: true,
    state:()=>({
        isCollapse: false,
        tabsList:[
            {
                path:'/homeview',
                name:'homeview',
                label:'首页',
                // icon:'home'
            }
        ],
        // 高亮
        currentMenu:null
    }),
    mutations:{
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val){
                if(val.name !== 'home'){
                    state.currentMenu=val
                    const result = state.tabsList.findIndex(item=>item.name===val.name)
                    if(result === -1){
                        state.tabsList.push(val)
                    }
                }else{
                    state.currentMenu =null
                }
        },
        closeTag(state,val){
            const result = state.tabsList.findIndex(item=>item.label===val.name)
            state.tabsList.splice(result,1)
        }
    }
    
})