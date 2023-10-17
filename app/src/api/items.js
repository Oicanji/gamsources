import axios from "axios";
import { HOST } from ".";
import { dataURItoBlob } from "../utils/image";

const ITEM_ROUTE = HOST + "/item";

function get(
    offset = 0,
    limit = 48,
    order_by = "id",
    order = "desc"
){
    return axios.get(
        ITEM_ROUTE+"/all?offset="+offset+"&limit="+(limit+1)+"&order_by="+order_by+"&order="+order+"&show_ia=1&show_sensitive=1"
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

function addItem(
    type,
    collection_id,

    ref,
    file,

    name,

    source,
    attr,
    extra,

    credits_id,

    is_ia,
    sensitive_content,

    auth_token,
    fileData = null
){
    var formData = new FormData();

    formData.append('type', type);
    formData.append('collection_id', collection_id);

    if (ref) {
        formData.append('ref', ref);
    }

    if (file) {
        console.log(file);
        const fileBlob = dataURItoBlob(file);
        console.log(fileData);
        var fileExtensions = fileData.name.split('.').pop();
        formData.append('file', fileBlob, 'filename.'+fileExtensions); // 'filename.png' is an example, you can set the desired filename
    }

    if (name) {
        formData.append('name', name);
    }

    if (source) {
        formData.append('source', source);
    }

    if (attr) {
        formData.append('attr', attr);
    }

    if (extra) {
        formData.append('extra', extra);
    }

    if (credits_id) {
        formData.append('credits_id', credits_id);
    }

    formData.append('is_ia', is_ia);
    formData.append('sensitive_content', sensitive_content);

    return axios.post(
        ITEM_ROUTE+"/add", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Bearer " + auth_token
            }
        }
    )
}

function updateItem(item){
    var formData = new FormData();

    formData.append('id', item.id);
    formData.append('type', item.type);
    formData.append('collection_id', item.collection_id);
    
    formData.append('ref', item.ref);
    formData.append('name', item.name);

    formData.append('source', item.source);
    formData.append('attr', item.attr);
    formData.append('extra', item.extra);

    //formData.append('credits_id', item.credits_id);

    formData.append('is_ia', item.is_ia);
    formData.append('sensitive_content', item.sensitive_content);

    return axios.put(
        ITEM_ROUTE+"/update", formData, {
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + auth_token
        }
    )
}

const apiItems = {
    add: addItem,
    get,
    delete: deleteItem
}

export default apiItems;