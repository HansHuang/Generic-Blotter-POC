

async function executeMenus() {
    for (const menu of menus) {
        const data = await menu.run()
        console.log(menu.title, data)
    }
}

executeMenus()