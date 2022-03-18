
module.exports = function validItem(itemOrder) {

    if (
        itemOrder.order_id != undefined && 
        itemOrder.product_id != undefined && 
        itemOrder.description_product != undefined && 
        itemOrder.street != undefined &&
        itemOrder.module != undefined && 
        itemOrder.height != undefined &&
        itemOrder.position != undefined && 
        itemOrder.quantity_lack != undefined &&
        itemOrder.quantity_total != undefined && 
        itemOrder.unity != undefined &&
        itemOrder.ean != undefined && 
        itemOrder.color_tag != undefined && 
        itemOrder.code_tag != undefined &&
        itemOrder.price != undefined
    ) { 
        if (
            !isNaN(itemOrder.order_id) &&
            itemOrder.product_id.trim() != "" && 
            itemOrder.description_product.trim() != "" && 
            itemOrder.street.trim() != "" &&
            itemOrder.module.trim() != "" && 
            itemOrder.height.trim() != "" &&
            itemOrder.position.trim() != "" && 
            !isNaN(itemOrder.quantity_lack) &&
            !isNaN(itemOrder.quantity_total) &&
            itemOrder.unity.trim() != "" &&
            itemOrder.ean.trim() != "" && 
            itemOrder.color_tag.trim() != "" && 
            itemOrder.code_tag.trim() != "" &&
            !isNaN(itemOrder.price)
        ) {
            return {
                itemOrder: itemOrder,
                status: true,
                info: "Produtos Válidos"
            }
        } else {
            console.log("Price "+ isNaN(itemOrder.price) + " " +  isNaN(itemOrder.quantity_total))
            return {
                itemOrder: {},
                status: false,
                info: "Campo vazio!"
            }
        }
    } else {
        return {
            itemOrder: {},
            status: false,
            info: "Campo Inválido!"
        }
    }
}
// {
    // order_id, 
    // product_id, 
    // description_product, 
    // street, 
    // module, 
    // height,
    // position, 
    // quantity_lack,
    // quantity_total,
    // unity,
    // ean, 
    // last_etiquette,
    // color_tag,
    // code_tag,
    // price,
    // timer_start,
    // timer_end,
    // chrnometer
// }