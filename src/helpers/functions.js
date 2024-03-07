import axios from "axios";
import axiosRetry from 'axios-retry';
import {API_URL, MD_PASSWORD} from "./constants";
import md5 from "md5";

const client = axios.create();

axiosRetry(client,
    {
        retries: 3,
        retryDelay: () => 1000,
        retryCondition: () => true,
    });
const fetchRequest = async (type, params) => {
    const result = [];
    await client.post(API_URL, {
        "action": type,
        "params": params
    }, {
        headers: {
            'X-Auth': md5(MD_PASSWORD)
        },
    }).then(({data}) => {
        result.push(...data.result)
    }).catch(({response}) => {
        console.log(response.status)
    })
    return result
}

const getIDs = async (page, limit, filters) => {
    const offset = (page - 1) * limit + 1;
    const params = {};
    if (filters) {
        if (filters.price) params.price = +filters.price
        if (filters.product) params.product = filters.product
        if (filters.brand) params.brand = filters.brand
        return await fetchRequest("filter", params)
    } else {
        params.offset = offset
        params.limit = limit
    }
    return await fetchRequest("get_ids", params)
}

const filterUniqueIDs = (data) => {
    const uniqueIDs = [];
    const seenIDs = new Set();

    for (const item of data) {
        const id = item.id;
        if (!seenIDs.has(id)) {
            seenIDs.add(id);
            uniqueIDs.push(item);
        }
    }
    return uniqueIDs;
};

export const getProducts = async (page, limit, filters = null) => {
    const IDs = await getIDs(page, limit, filters)
    const params = {
        "ids": [...IDs]
    }
    const products = await fetchRequest("get_items", params)
    return filterUniqueIDs(products)
}
