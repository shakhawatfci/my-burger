import axios from "./axios";

export async function getDemands(pageNumber = 1) {
    const api = await axios.get(`demand-list?page=${pageNumber}`);
    return await api.data;
}