import { HttpUtils } from '../core/http';

HttpUtils.Get("/home/index").then((res) => {
    console.log(res.HttpStatus);
}).catch((reason) => {
    console.log(reason);
});
