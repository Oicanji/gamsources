import axios from "axios";
import { HOST } from ".";

const ITEM_ROUTE = HOST + "/item";

function get(
    offset = 0,
    limit = 48,
    order_by = "id",
    order = "desc"
){
    return axios.get(
        ITEM_ROUTE+"/all?offset="+offset+"&limit="+(limit+1)+"&order_by="+order_by+"&order="+order
    )
}

function deleteItem(
    id,
    auth_token
){
    return axios.delete(
        ITEM_ROUTE+"/delete?id="+id, {
            headers: {
                Authorization: "Bearer " + auth_token
            }
        }
    )
}

const apiItems = {
    get,
    delete: deleteItem
}

export default apiItems;