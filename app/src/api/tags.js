import axios from "axios";
import { HOST } from ".";

const TAG_ROUTE = HOST + "/tag";

function get(
    offset = 0,
    limit = 100,
){
    return axios.get(
        TAG_ROUTE+"/all?offset="+offset+"&limit="+(limit+1)
    )
}

function addTags(
    values,
    auth_token
){
    const data = {
        name: values.name
    }
    if (values.color != undefined){
        data["color"] = values.color
    }
    return axios.post(
        TAG_ROUTE+"/add", data, {
            headers: {
                Authorization: "Bearer " + auth_token
            }
        }
    )
}


function deleteItem(
    id,
    auth_token
){
    return axios.delete(
        TAG_ROUTE+"/delete?id="+id, {
            headers: {
                Authorization: "Bearer " + auth_token
            }
        }
    )
}

const apiTag = {
    get,
    add: addTags,
    delete: deleteItem
}

export default apiTag;