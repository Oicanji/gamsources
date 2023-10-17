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

function getMe(
    offset = 0,
    limit = 50,
    auth_token
){
    console.log(auth_token)
    return axios.get(
        COLLECTION_ROUTE+"/me?offset="+offset+"&limit="+(limit+1), {
            headers: {
                Authorization: "Bearer " + auth_token
            }
        }
    )
}

function getById(
    id
){
    return axios.get(
        COLLECTION_ROUTE+"/?id="+id
    )
}

function add(
    auth_token,
){
    console.log(auth_token)
    return axios.post(
        COLLECTION_ROUTE+"/add", null, {
            headers: {
                Authorization: "Bearer " + auth_token
            }
        }
    )
}

function update(
    id,
    name,
    contains,
    auth_token,
){
    console.log(id, name, contains, auth_token)
    const date = {
        id: id
    }
    if(name != null) date.name = name
    if(contains != null) date.contains = contains

    return axios.put(
        COLLECTION_ROUTE+"/update",
        date,
        {
            headers: {
                Authorization: "Bearer " + auth_token
            }
        }
    )
}

function remove(
    id,
    auth_token,
){
    return axios.delete(
        COLLECTION_ROUTE+"/delete?id="+id,
        {
            headers: {
                Authorization: "Bearer " + auth_token
            }
        }
    )
}

const apiCollections = {
    get,
    me: getMe,
    getById,
    add,
    update,
    remove,
}

export default apiCollections;