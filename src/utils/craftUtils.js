const getInventoryItemIndex = (inventory, itemName) => {
    return inventory.indexOf(
        inventory.find((plyrItem)=>{return plyrItem.name === itemName})
    )
}

const addItemToPlayer = (player, item) => {
    // Withdraw Item Cost
    const removeItemIndex = getInventoryItemIndex(player.inventory, item.remove.name);
    let updatedRemoved = {...player.inventory[removeItemIndex]};
    updatedRemoved.count -= item.remove.count;
    player.inventory = player.inventory
        .slice(0, removeItemIndex)
        .concat([updatedRemoved])
        .concat(player.inventory.slice(removeItemIndex + 1));
    // Add to count if item in Inventory
    const addItemIndex = getInventoryItemIndex(player.inventory, item.name);
    if (addItemIndex !== -1) {
        let updatedItem = {...player.inventory[addItemIndex]};
        updatedItem.count++;
        player.inventory = player.inventory
            .slice(0, addItemIndex)
            .concat([updatedItem])
            .concat(player.inventory.slice(addItemIndex + 1))
    }
    // Add new item if not in Inventory
    if (addItemIndex === -1) {
        let newItem = {name: item.name, count: 1};
        player.inventory = player.inventory.concat([newItem]);
    }
    return player;
};

export {addItemToPlayer};