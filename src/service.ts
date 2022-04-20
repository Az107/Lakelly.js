import service from "os-service";
import bot from "./index";


service.add("bot");

service.run(async function () {
    await bot();
})