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

const apiItems = {
    get
}

export default apiItems;