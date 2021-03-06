import { v4 as uuidv4 } from 'uuid';

function generateOtp(captchaTxnId, captchaValue, uid) {
    const uri = "https://stage1.uidai.gov.in/unifiedAppAuthService/api/v2/generate/aadhaar/otp"
    const txnId = uuidv4()
    const finalTxn = "MYAADHAAR:" + txnId
    const body = {
        uidNumber: uid,
        captchaTxnId: captchaTxnId,
        captchaValue: captchaValue,
        transactionId: finalTxn
    }
    console.log(body);
    const xhr = new XMLHttpRequest()
    xhr.open('POST', uri, true);
    xhr.setRequestHeader("x-request-id", txnId)
    xhr.setRequestHeader("appid", "MYAADHAAR")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("Accept-Language", "en_in")
    xhr.send(JSON.stringify(body));
    xhr.onreadystatechange = function () {
        console.log(this.responseText);
        setTxnId(this.responseText, txnId)
    }
}

function setTxnId(data) {
    data = JSON.parse(data)
    document.getElementById("otptxnId").value = data.txnId
}

export default generateOtp
