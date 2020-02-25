import axios from 'axios';
import {EXCHANGE} from './Config.js';

async function getLatestExchange(base) {
    try {
        const result = await axios({
            method: 'get',
            url: `${EXCHANGE}/latest?base=${base}`,
        });
        if (result.status === 200) {
            return result
        }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

async function getDayExchange(base, day) {
    try {
        const result = await axios({
            method: 'get',
            url: `${EXCHANGE}/${day}`,
        });
        if (result.status === 200) {
            return result
        }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

async function getCompareExchange(base, baseCmp) {
    try {
        const result = await axios({
            method: 'get',
            url: `${EXCHANGE}/latest?base=${base}&symbols=${baseCmp}`,
        });
        if (result.status === 200) {
            return result
        }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export { getLatestExchange, getDayExchange, getCompareExchange}

