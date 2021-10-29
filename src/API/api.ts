
import { API } from "aws-amplify";

export async function getMFIData(mfi) {
    // get the MFI info and welcome message then save the MFI data on the local storage
    return new Promise(function (responseValue, error) {
        API.get("auth", "/api/mfi", {
            headers: { "Content-Type": "application/json" },
            queryStringParameters: { name: mfi ? mfi : "roi" },
        }).then((response) => {
            localStorage.removeItem("mfiData");
            if (response) {
                localStorage.setItem("mfiData", JSON.stringify(response));
                responseValue(response)
            } else {
                error(false)
            }
        });
    })
}




