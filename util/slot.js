export function slotScope(vm, slotName, slotProps, otherwise) {
    return vm.$scopedSlots[slotName] !== undefined
        ? vm.$scopedSlots[slotName](slotProps)
        : otherwise
}