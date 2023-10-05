import axios from "axios";
import { HOST } from ".";

const COLLECTION_ROUTE = HOST + "/collection";

//{{host}}/collection/all?offset=0&limit=10&order_by=id&order=desc
function get(
    offset = 0,
    limit = 48,
    order_by = "id",
    order = "desc"
){
    return axios.get(
        COLLECTION_ROUTE+"/all?offset="+offset+"&limit="+(limit+1)+"&order_by="+order_by+"&order="+order
    )
}

const apiCollections = {
    get
}

export default apiCollections;